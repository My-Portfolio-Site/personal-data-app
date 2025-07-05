import { LoginForm } from "@/app/login/_components/login-form";
import { Metadata } from "next";
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Login',
  description: 'App and API for personal data management',
}


import { cookies } from 'next/headers';

export default async function LoginPage() {
  const session = await auth()
  if (session?.user) {
    redirect('/')
  }

  // Get error from query string (e.g., ?error=some error)
  const cookieStore = await cookies();
  const url = cookieStore.get('next-url')?.value || '';
  let error = '';
  if (typeof window === 'undefined') {
    // On server, parse error from search params
    const searchParams = new URLSearchParams(url.split('?')[1] || '');
    error = searchParams.get('error') || '';
  }

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="bg-muted py-8 px-10 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <LoginForm />
        <p className="text-center mt-4 text-sm text-muted-foreground">Only invited users can login.</p>
      </div>
    </div>
  );
}