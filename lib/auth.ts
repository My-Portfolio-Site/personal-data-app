import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

import { D1Adapter } from "@auth/d1-adapter"
import { context } from "@/lib/context"
import { db } from "@/lib/db"
// import { GetUserManagementByEmail, AddToUserManagement } from '@/lib/user_management/user_management.db';

// const { env } = getCloudflareContext();
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "database",
    maxAge: 60 * 60 * 24, // 1 day
  },
  providers: [
    GitHub,
    Google
    // ({
    //   profile(profile) {
    //     return {
    //       // Return the default fields
    //       id: profile.sub,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //       // Add a new one
    //       // role: "user",
    //       // userVerified: 0
    //     };
    //   },
    // }),
  ],
  adapter: D1Adapter(db),
  callbacks: {
    async session({ session, user }) {
      console.log('session:', session);
      console.log('user:', user);
      return session;
    },
    async signIn({ user, account, profile }) {
      // You can add custom logic here if needed\
      console.log('User:', user);
      console.log('Account:', account);
      console.log('Profile:', profile);

      return true;
    },

  },
  pages: {
    signIn: '/login',
  }
});

