
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
CREATE INDEX idx_accounts_userId ON "accounts" (userId);
CREATE INDEX idx_accounts_provider_providerAccountId ON "accounts" (provider, providerAccountId);
CREATE INDEX idx_accounts_id ON "accounts" (id);



CREATE TABLE IF NOT EXISTS "sessions" (
    "id" text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL DEFAULT NULL,
    "expires" datetime NOT NULL DEFAULT NULL, 
    PRIMARY KEY (sessionToken)
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
    "endDate" date DEFAULT NULL,
    "description" text DEFAULT NULL,
    "achievements" text NOT NULL,
    "technologies" text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES "users" (id) ON DELETE CASCADE
  );

CREATE INDEX idx_experiences_userId ON "experiences" (userId);
CREATE INDEX idx_experiences_id ON "experiences" (id);
CREATE INDEX idx_experiences_userId_id ON "experiences" (userId, id);