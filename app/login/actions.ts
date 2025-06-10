'use server'
import { signIn } from '@/lib/auth'

const handleSignIn = async (provider: string) => {
  await signIn(provider, { redirectTo: '/' })
}

export { handleSignIn }