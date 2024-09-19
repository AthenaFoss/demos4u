
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register } from "@/actions/user"
import { signIn } from "@/auth"
import { getSession } from "@/lib/getSession"
import { redirect } from "next/navigation"

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

export async function SignUpForm() {
  const session = await getSession()
  if(session?.user) redirect('/dashboard')
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign up</h1>
          <p className="text-balance text-center text-muted-foreground">
            Enter your detail below to register.
          </p>
        </div>
        <form action={register} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Jhon doe"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              
            <Input name="password" id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
          <form action={
            async () => {
              'use server';
              await signIn("google")
            }
          }>
          <Button type="submit" variant="outline" className="w-full">
            Sign up with Google
          </Button>
          </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
