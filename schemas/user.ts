import { z } from "zod/v4";

// Schema for a user
export const userSchema = z.object({
  id: z.string().nonempty(),
  name: z.string(),
  email: z.email(),
  emailVerified: z.date(),
  image: z.url(),
  role: z.enum(["user", "admin"]),
  userVerified: z.boolean(),
});


export const currentUserSchema = z.object({
  id: z.string().nonempty(),
  name: z.string(),
  email: z.email(),
  image: z.url(),
  role: z.enum(["user", "admin"]),
  initials: z.string(),
})

// Schema for adding a new user
export const addUserSchema = z.object({
  name: z.string().nonempty(),
  email: z.email().nonempty(),
  emailVerified: z.date().optional().transform((val) => val ?? null),
  image: z.url().optional().transform((val) => val ?? null),
  role: z.enum(["user", "admin"]).optional().default("user"),
  userVerified: z.boolean().optional().default(false),
});

// Schema for deleting a user (requires only the ID)
export const deleteUserSchema = z.object({
  id: z.string().nonempty(),
});

// Schema for getting a user (requires only the ID)
export const getUserSchema = z.object({
  id: z.string().nonempty(),
});

// Schema for updating a user
export const updateUserSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().optional().transform((val) => val ?? null),
  emailVerified: z.date().optional().transform((val) => val ?? null),
  image: z.url().optional().transform((val) => val ?? null),
  role: z.enum(["user", "admin"]).optional().transform((val) => val ?? null),
  userVerified: z.boolean().optional().transform((val) => val ?? null),
});


// Exporting types for use in other parts of the application
export type User = z.infer<typeof userSchema>;
export type AddUser = z.infer<typeof addUserSchema>;
export type DeleteUser = z.infer<typeof deleteUserSchema>;
export type GetUser = z.infer<typeof getUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

export type CurrentUser = z.infer<typeof currentUserSchema>;