import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/mongodb";
import { User } from "./models/UserModel";
import { compare } from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined
        const password = credentials.password as string | undefined

        if(!email || !password) {
          throw new CredentialsSignin("Please Provide a all the required credentials")
        }

        await connectDB()

        const user = await User.findOne({email}).select("+password")

        if(!user) {
          throw new CredentialsSignin("Invalid username or password")
        }

        if(!user.password) {
          throw new Error("Invalid username or password")
        }

        const isMatched = await compare(password, user.password)

        if(!isMatched) {
          throw new Error("Password did not match")
        }

        const userData = {
          username: user.username,
          email: user.email,
          id: user._id
        }

        return userData
      }
    }),
  ],

  pages: {
    signIn: "/auth/signin"
  },

  callbacks: {
    async session({session, token}) {
      if(token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({token, user}) {
      if(user) {
        token.id = user.id
      }
      return token
    },

    signIn: async ({ user, account }) => {
      try {
        const { email, name, image } = user;
    
        // Only for OAuth providers (Google in this case)
        if (account?.provider === "google") {
          await connectDB();
          const existingUser = await User.findOne({ email });
    
          if (!existingUser) {
            await User.create({
              email,
              username: name,
              image,
              authProviderId: account.id, // Use account.id for OAuth user ID
            });
          }
        }
        return true; // Allow sign-in for both OAuth and credentials
      } catch (error) {
        throw new Error("Error while creating user");
      }
    },
    


  }
});
