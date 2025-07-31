import 'server-only'

import { auth } from '@/lib/auth'
import { User } from '@/schemas/user';
import { cache } from 'react'

export const verifySession = cache(async () => {
  const currentUserSession = await auth();
  return currentUserSession?.user? true : false;
})

export const getUser = cache(async () => {
  const currentUserSession = await auth();
  if (!currentUserSession?.user) {
    return null;
  }
  return currentUserSession.user as User;
})

export const getCurrentUserId = cache(async () => {
  const currentUserSession = await auth();
  if (!currentUserSession?.user?.id) {
    return null;
  }
  return currentUserSession.user.id;
})