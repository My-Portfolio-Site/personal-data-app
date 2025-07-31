'use server'
import { signIn, signOut } from '@/lib/auth'

const handleSignIn = async (provider: string, callbackUrl?: string) => {
  await signIn(provider)
  return true
}

const handleSignOut = async () => {
  await signOut()
  return true
}


export { handleSignIn, handleSignOut }