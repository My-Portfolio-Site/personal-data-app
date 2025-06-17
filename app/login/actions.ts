'use server'
import { signIn, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'

const handleSignIn = async (provider: string) => {
  await signIn(provider, { redirectTo: '/' })
  return true
}

const handleSignOut = async () => {
  await signOut()
  return true
}


export { handleSignIn, handleSignOut }