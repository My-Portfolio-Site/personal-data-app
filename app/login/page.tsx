import { Metadata } from "next";
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { GoogleLoginButton } from "@/app/login/_components/google-login-button";
import AuthError from '@/app/login/_components/auth-error'

export const metadata: Metadata = {
  title: 'Login',
  description: 'App and API for personal data management',
}

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect('/');
  }
  

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="bg-muted py-8 px-5 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <GoogleLoginButton />
        <p className="text-center mt-4 text-sm text-muted-foreground">Only invited users can login.</p>
        <AuthError/>
      </div>
    </div>
  );
}