import type { NextAuthConfig } from "next-auth"

import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { D1Adapter } from "@auth/d1-adapter"
import { db } from "@/lib/db"

const authConfig = {
  session: {
    strategy: "database",
    maxAge: 60 * 60 * 24, // 1 day
  },
  providers: [
    Google,
    // Google
    // ({
    //   profile(profile) {
    //     return {
    //       // Return the default fields
    //       id: profile.sub,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //       // Add a new one
    //       role: "user",
    //       userVerified: 0
    //     };
    //   },
    // }),
  ],
  adapter: D1Adapter(db),
  trustHost: true,
  pages: {
    signIn: '/login',
    error: "/login",
  }
} as NextAuthConfig;

export default authConfig;