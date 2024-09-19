'use server'

import connectDB from "@/lib/mongodb";
import { User } from "@/models/UserModel";
import { redirect } from "next/navigation";
import { hash } from 'bcryptjs'
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";

const login = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        await signIn('credentials',{
            redirect: false,
            callbackUrl: '/dashboard',
            email,
            password,
        })
    } catch (error) {
        const message = error as CredentialsSignin
        return message.cause
    }

    redirect('/dashboard')
}

const register = async (formData: FormData) => {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if(!username || !email || !password) {
        throw new Error('All fields are required')
    }

    await connectDB()

    // existing user
    const existingUser = await User.findOne({email})
    
    if(existingUser) throw new Error('User already exists')
    
    const hashedPassword = await hash(password, 12)

    await User.create({username, email, password: hashedPassword})
    console.log('User created successfully')

    redirect('/dashboard')
}

export {register, login}