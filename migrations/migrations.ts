// import type { D1Database } from "./index.js"

export const upSQLStatements = [
  `CREATE TABLE IF NOT EXISTS "accounts" (
    "id" text NOT NULL,
    "userId" text NOT NULL DEFAULT NULL,
    "type" text NOT NULL DEFAULT NULL,
    "provider" text NOT NULL DEFAULT NULL,
    "providerAccountId" text NOT NULL DEFAULT NULL,
    "refresh_token" text DEFAULT NULL,
    "access_token" text DEFAULT NULL,
    "expires_at" number DEFAULT NULL,
    "token_type" text DEFAULT NULL,
    "scope" text DEFAULT NULL,
    "id_token" text DEFAULT NULL,
    "session_state" text DEFAULT NULL,
    "oauth_token_secret" text DEFAULT NULL,
    "oauth_token" text DEFAULT NULL,
    PRIMARY KEY (id)
);`,
  `CREATE TABLE IF NOT EXISTS "sessions" (
    "id" text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL DEFAULT NULL,
    "expires" datetime NOT NULL DEFAULT NULL, 
    PRIMARY KEY (sessionToken)
);`,
  `CREATE TABLE IF NOT EXISTS "users" (
    "id" text NOT NULL,
    "name" text DEFAULT NULL,
    "email" text DEFAULT NULL,
    "emailVerified" datetime DEFAULT NULL,
    "image" text DEFAULT NULL, 
    "role" text DEFAULT 'user',
    "userVerified" INTEGER DEFAULT 0,
    PRIMARY KEY (id)
);`,
  `CREATE TABLE IF NOT EXISTS "verification_tokens" (
    "identifier" text NOT NULL,
    "token" text NOT NULL DEFAULT NULL,
    "expires" datetime NOT NULL DEFAULT NULL, 
    PRIMARY KEY (token)
);`,
  `CREATE TABLE IF NOT EXISTS "invites" (
    "id" text NOT NULL,
    "email" text NOT NULL,
    "role" text NOT NULL DEFAULT 'user',
    "invitedBy" text NOT NULL,
    "expires" datetime NOT NULL DEFAULT NULL,
    "status" text NOT NULL DEFAULT 'pending',
    "updatedAt" datetime DEFAULT NULL,
    "createdAt" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);`,
  `CREATE TABLE "experiences" (
    "id" text NOT NULL,
    "userId" text NOT NULL,
    "company" text NOT NULL,
    "location" text NOT NULL, 
    "position" text NOT NULL,
    "startDate" date NOT NULL,
    "endDate" date DEFAULT NULL,
    "description" text DEFAULT NULL,
    "achievements" text NOT NULL,
    "technologies" text NOT NULL,
    FOREIGN KEY (userId) REFERENCES "users" (id) ON DELETE CASCADE
  );`
]

// FOREIGN KEY (invitedBy) REFERENCES "users" (id) ON DELETE CASCADE

export const downSQLStatements = [
  `DROP TABLE IF EXISTS "accounts";`,
  `DROP TABLE IF EXISTS "sessions";`,
  `DROP TABLE IF EXISTS "users";`,
  `DROP TABLE IF EXISTS "verification_tokens";`,
  `DROP TABLE IF EXISTS "invites";`,
  `DROP TABLE IF EXISTS "experiences";`
]

async function up(db: D1Database) {
  upSQLStatements.forEach(async (sql) => {
    try {
      await db.prepare(sql).run()
    } catch (e: any) {
      console.error(e.cause?.message, e.message)
    }
  })
}

async function down(db: D1Database) {
  downSQLStatements.forEach(async (sql) => {
    try {
      await db.prepare(sql).run()
    } catch (e: any) {
      console.error(e.cause?.message, e.message)
    }
  })
}

export { up, down }