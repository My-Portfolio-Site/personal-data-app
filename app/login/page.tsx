import { LoginForm } from "@/app/login/_components/login-form";
import { Metadata } from "next";
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Login',
  description: 'App and API for personal data management',
}

export default async function LoginPage() {

  const session = await auth()

  if (session?.user) {
    redirect('/')
  }

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="bg-muted py-8 px-10 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-5 text-center">Login</h1>
        <LoginForm />
        <p className="text-center mt-4 text-sm text-muted-foreground">Only invited users can login.</p>
      </div>
    </div>
  );
}