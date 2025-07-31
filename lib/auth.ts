import NextAuth from "next-auth"

import authConfig from "@/lib/auth.config";
// import { checkInvitation } from "@/lib/helpers";
import { User } from "@/schemas/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    async session({ session, user }) {
      return session;
    },
    async signIn({ user }) {
      return true;
    },
  },
})

