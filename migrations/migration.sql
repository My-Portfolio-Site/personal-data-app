
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
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES "users" (id) ON DELETE CASCADE
);
CREATE INDEX idx_accounts_userId ON "accounts" (userId);
CREATE INDEX idx_accounts_provider_providerAccountId ON "accounts" (provider, providerAccountId);
CREATE INDEX idx_accounts_id ON "accounts" (id);



CREATE TABLE IF NOT EXISTS "sessions" (
    "id" text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL DEFAULT NULL,
    "expires" datetime NOT NULL DEFAULT NULL, 
    PRIMARY KEY (sessionToken),
    FOREIGN KEY (userId) REFERENCES "users" (id) ON DELETE CASCADE
);
CREATE INDEX idx_sessions_userId ON "sessions" (userId);
CREATE INDEX idx_sessions_id ON "sessions" (id);


CREATE TABLE IF NOT EXISTS "users" (
    "id" text NOT NULL,
    "name" text DEFAULT NULL,
    "email" text DEFAULT NULL,
    "emailVerified" datetime DEFAULT NULL,
    "image" text DEFAULT NULL, 
    "role" text DEFAULT 'user',
    "userVerified" INTEGER DEFAULT 0,
    PRIMARY KEY (id)
);
CREATE INDEX idx_users_email ON "users" (email);
CREATE INDEX idx_users_id ON "users" (id);


CREATE TABLE IF NOT EXISTS "verification_tokens" (
    "identifier" text NOT NULL,
    "token" text NOT NULL DEFAULT NULL,
    "expires" datetime NOT NULL DEFAULT NULL, 
    PRIMARY KEY (token)
);
CREATE INDEX idx_verification_tokens_identifier ON "verification_tokens" (identifier);
CREATE INDEX idx_verification_tokens_token ON "verification_tokens" (token);

CREATE TABLE IF NOT EXISTS "invites" (
    "id" text NOT NULL,
    "email" text NOT NULL,
    "role" text NOT NULL DEFAULT 'user',
    "invitedBy" text NOT NULL,
    "expires" datetime NOT NULL DEFAULT NULL,
    "status" text NOT NULL DEFAULT 'pending',
    "updatedAt" datetime DEFAULT NULL,
    "createdAt" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
CREATE INDEX idx_invites_id ON "invites" (id);
CREATE INDEX idx_invites_email ON "invites" (email);

CREATE TABLE "experiences" (
    "id" text NOT NULL,
    "userId" text NOT NULL,
    "company" text NOT NULL,
    "location" text NOT NULL, 
    "position" text NOT NULL,
    "startDate" date NOT NULL,
    "endDate" date NULL,
    "description" text NOT NULL,
    "achievements" text NULL,
    "technologies" text NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES "users" (id) ON DELETE CASCADE
  );

CREATE INDEX idx_experiences_userId ON "experiences" (userId);
CREATE INDEX idx_experiences_id ON "experiences" (id);
CREATE INDEX idx_experiences_userId_id ON "experiences" (userId, id);



CREATE TABLE IF NOT EXISTS "profiles" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT DEFAULT NULL,
  "location" TEXT NOT NULL,
  "website" TEXT DEFAULT NULL,
  "linkedin" TEXT DEFAULT NULL,
  "github" TEXT DEFAULT NULL,
  "avatar" TEXT DEFAULT NULL,
  "summary" TEXT NOT NULL
  PRIMARY KEY ("id"),
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE
);

CREATE INDEX idx_profiles_userId ON "profiles" ("userId");
CREATE INDEX idx_profiles_id ON "profiles" ("id");
CREATE INDEX idx_profiles_userId_id ON "profiles" ("userId", "id");


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

CREATE INDEX idx_educations_userId ON "educations" ("userId");
CREATE INDEX idx_educations_id ON "educations" ("id");
CREATE INDEX idx_educations_userId_id ON "educations" ("userId", "id");

DROP TABLE IF EXISTS "chat_history";
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

CREATE INDEX idx_chat_history_id ON "chat_history" ("id");
CREATE INDEX idx_chat_history_userId ON "chat_history" ("userId");
CREATE INDEX idx_chat_history_userId_id ON "chat_history" ("userId", "id");


DROP TABLE IF EXISTS "skills";
CREATE TABLE IF NOT EXISTS "skills" (
    "id" text NOT NULL,
    "userId" text NOT NULL,
    "name" text NOT NULL,
    "level" text,
    "category" text NOT NULL,
    "description" text,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES "users" (id) ON DELETE CASCADE
);

CREATE INDEX idx_skills_userId ON "skills" (userId);
CREATE INDEX idx_skills_id ON "skills" (id);
CREATE INDEX idx_skills_userId_id ON "skills" (userId, id);



DROP TABLE IF EXISTS "projects";

CREATE TABLE IF NOT EXISTS "projects" (
    "id" text NOT NULL,
    "userId" text NOT NULL,
    "title" text NOT NULL,
    "description" text NOT NULL,
    "features" text,
    "technologies" text,
    "company" text,
    "year" text NOT NULL,
    "duration" text,
    "liveUrl" text,
    "githubUrl" text,
    "status" text NOT NULL,
    "role" text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES "users" (id) ON DELETE CASCADE
);

CREATE INDEX idx_projects_userId ON "projects" (userId);
CREATE INDEX idx_projects_id ON "projects" (id);
CREATE INDEX idx_projects_userId_id ON "projects" (userId, id);


DROP TABLE IF EXISTS "references";
CREATE TABLE IF NOT EXISTS "references" (
    "id" text NOT NULL,
    "userId" text NOT NULL,
    "name" text NOT NULL,
    "designation" text NOT NULL,
    "company" text NOT NULL,
    "relationship" text NOT NULL,
    "email" text NOT NULL,
    "phone" text,
    "linkedin" text,
    "workingPeriod" text NOT NULL,
    "canContact" INTEGER NOT NULL DEFAULT 0,
    "testimonial" text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES "users" (id) ON DELETE CASCADE
);

CREATE INDEX idx_references_userId ON "references" (userId);
CREATE INDEX idx_references_id ON "references" (id);
CREATE INDEX idx_references_userId_id ON "references" (userId, id);


DROP TABLE IF EXISTS "certifications";
CREATE TABLE IF NOT EXISTS "certifications" (
    "id" text NOT NULL,
    "userId" text NOT NULL,
    "title" text NOT NULL,
    "issuer" text NOT NULL,
    "issueDate" date NOT NULL,
    "expiryDate" date,
    "credentialId" text,
    "credentialUrl" text,
    "status" text CHECK (status IN ('Active', 'Expired')) NOT NULL,
    "description" text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES "users" (id) ON DELETE CASCADE
);

CREATE INDEX idx_certifications_userId ON "certifications" (userId);
CREATE INDEX idx_certifications_id ON "certifications" (id);
CREATE INDEX idx_certifications_userId_id ON "certifications" (userId, id);
