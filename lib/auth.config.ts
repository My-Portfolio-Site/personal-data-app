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
    GitHub,
    Google
  ],
  adapter: D1Adapter(db),
} as NextAuthConfig;

export default authConfig;