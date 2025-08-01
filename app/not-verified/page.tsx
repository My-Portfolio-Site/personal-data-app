import { Metadata } from "next";

import UserNotVerified from '@/components/user-not-verified'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { User } from "@/schemas/user";

export const metadata: Metadata = {
  title: 'User Not Verified | Personal Data App',
  description: 'App and API for personal data management',
}

import { PageHeader, PageContent } from "@/components/page-formatter";

export default async function UserNotVerifiedPage() {
  const session = await auth();
  const currentUser = session?.user as User
  if (currentUser.userVerified) {
    redirect('/');
  }

  return (
    <section>
      <PageHeader title="User Not Verified" />
      <PageContent>
        <UserNotVerified />
      </PageContent>
    </section>
  );
}