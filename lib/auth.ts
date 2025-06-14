import NextAuth from "next-auth"

import authConfig from "@/lib/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    async session({ session, user }) {
      // console.log('session:', session);
      // console.log('user:', user);
      return session;
    },
    async signIn({ user, account, profile }) {
      // You can add custom logic here if needed\
      // console.log('User:', user);
      // console.log('Account:', account);
      // console.log('Profile:', profile);

      return true;
    },

  },
  pages: {
    signIn: '/login',
  }
})

