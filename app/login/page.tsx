import { Metadata } from "next";
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { GoogleLoginButton } from "@/app/login/_components/google-login-button";
import AuthError from '@/app/login/_components/auth-error'

export const metadata: Metadata = {
  title: 'Login | Personal Data App',
  description: 'App and API for personal data management',
}

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect('/');
  }

  return (
    <div className="flex items-center justify-center flex-col bg-background mx-3 mt-30">
      <div className="bg-muted py-8 px-5 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl md:text-2xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
          Welcome to the
        </h1>
        <h1 className="mb-10 text-2xl md:text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
          Personal Data App
        </h1>
        <GoogleLoginButton />
        <p className="text-center mt-4 text-sm text-muted-foreground">Only invited users can login.</p>
        <AuthError />
      </div>
    </div>
  );
}