PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE IF NOT EXISTS "accounts" (
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
);
CREATE TABLE IF NOT EXISTS "sessions" (
    "id" text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL DEFAULT NULL,
    "expires" datetime NOT NULL DEFAULT NULL, 
    PRIMARY KEY (sessionToken)
);
CREATE TABLE IF NOT EXISTS "verification_tokens" (
    "identifier" text NOT NULL,
    "token" text NOT NULL DEFAULT NULL,
    "expires" datetime NOT NULL DEFAULT NULL, 
    PRIMARY KEY (token)
);
CREATE TABLE IF NOT EXISTS "invites" (    "id" text NOT NULL,    "email" text NOT NULL,    "role" text NOT NULL DEFAULT 'user',    "invitedBy" text NOT NULL,    "expires" datetime NOT NULL DEFAULT NULL,    "status" text NOT NULL DEFAULT 'pending',    "updatedAt" datetime DEFAULT NULL,    "createdAt" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,    PRIMARY KEY (id)    );
CREATE TABLE IF NOT EXISTS "experiences" (    "id" text NOT NULL,    "userId" text NOT NULL,    "company" text NOT NULL,    "location" text NOT NULL,     "position" text NOT NULL,    "startDate" date NOT NULL,    "endDate" date DEFAULT NULL,    "description" text DEFAULT NULL,    "achievements" text NOT NULL,    "technologies" text NOT NULL,    FOREIGN KEY (userId) REFERENCES "users" (id) ON DELETE CASCADE  );
CREATE TABLE IF NOT EXISTS "profiles" (  "id" TEXT NOT NULL,  "userId" TEXT NOT NULL,  "firstName" TEXT DEFAULT NULL,  "lastName" TEXT DEFAULT NULL,  "title" TEXT DEFAULT NULL,  "email" TEXT DEFAULT NULL,  "phone" TEXT DEFAULT NULL,  "location" TEXT DEFAULT NULL,  "website" TEXT DEFAULT NULL,  "linkedin" TEXT DEFAULT NULL,  "github" TEXT DEFAULT NULL,  "avatar" TEXT DEFAULT NULL,  "summary" TEXT DEFAULT NULL,  "yearsOfExperience" REAL DEFAULT 0.0,  "projectsDone" INTEGER DEFAULT 0,  "totalSkills" INTEGER DEFAULT 0,  "certificationCompleted" INTEGER DEFAULT 0,  PRIMARY KEY ("id"),  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS "users" (
    "id" text NOT NULL DEFAULT '',
    "name" text DEFAULT NULL,
    "email" text DEFAULT NULL,
    "emailVerified" datetime DEFAULT NULL,
    "image" text DEFAULT NULL,
    "role" text DEFAULT 'user',
    "userVerified" INTEGER DEFAULT 0,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS "educations" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "institution" TEXT NOT NULL,
  "degree" TEXT NOT NULL,
  "field" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "startDate" TEXT NOT NULL,
  "endDate" TEXT DEFAULT NULL,
  "gpa" TEXT NOT NULL,
  "honors" TEXT DEFAULT NULL,
  "coursework" TEXT DEFAULT NULL,
  "activities" TEXT DEFAULT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "chat_history" (
    "id" text NOT NULL,
    "userId" text NOT NULL,
    "title" text,
    "summary" text,
    "messages" text,
    "messagesCount" AS (json_array_length(messages, '$')) STORED,
    "updatedAt" datetime DEFAULT CURRENT_TIMESTAMP,
    "createdAt" datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE
);
CREATE INDEX idx_experiences_userId ON experiences(userId);
CREATE INDEX idx_profiles_userId ON "profiles" ("userId");
CREATE INDEX idx_profiles_id ON "profiles" ("id");
CREATE INDEX idx_profiles_userId_id ON "profiles" ("userId", "id");
CREATE INDEX idx_educations_userId ON "educations" ("userId");
CREATE INDEX idx_educations_id ON "educations" ("id");
CREATE INDEX idx_educations_userId_id ON "educations" ("userId", "id");