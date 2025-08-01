import { Metadata } from "next";

import UserNotVerified from '@/components/user-not-verified'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { User } from "@/schemas/user";

import { ThemeToggle } from '@/components/theme-toggle'
import { LoggedUserOptions } from '@/components/logged-user-options'

export const metadata: Metadata = {
  title: 'User Not Verified | Personal Data App',
  description: 'App and API for personal data management',
}

export default async function UserNotVerifiedPage() {
  const session = await auth();
  const currentUser = session?.user as User
  if (currentUser.userVerified) {
    redirect('/');
  }

  return (
    <div className=''>
      <UserNotVerified />
    </div>
  );
}