import { z } from "zod/v4";

// Schema for an invite
export const inviteSchema = z.object({
  id: z.string().nonempty(),
  email: z.email().nonempty(),
  role: z.enum(["user", "admin"]),
  invitedBy: z.string().nonempty(),
  expires: z.date(),
  status: z.enum(["pending", "accepted", "rejected"]),
  updatedAt: z.date().nullable(),
  createdAt: z.date(),
});

// Schema for adding a new invite
export const addInviteSchema = z.object({
  email: z.email().nonempty(),
  role: z.enum(["user", "admin"]).optional().default("user"),
  invitedBy: z.string().nonempty(),
  expires: z.date().default(() => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).transform((date) => date.toISOString()),
});

// Schema for accepting an invite
export const acceptInviteSchema = z.object({
  id: z.string().nonempty(),
  status: z.enum(["pending", "accepted", "rejected"]).optional(),
  updatedAt: z.date().default(() => new Date()).transform((date) => date.toISOString()),
});


// Schema for updating an invite
export const updateInviteSchema = z.object({
  id: z.string().nonempty(),
  email: z.email().optional(),
  role: z.enum(["user", "admin"]).optional(),
  invitedBy: z.string().optional(),
  expires: z.date().optional(),
  status: z.enum(["pending", "accepted", "rejected"]).optional(),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
});

// Schema for deleting a invite (requires only the ID)
export const deleteInviteSchema = z.object({
  id: z.string().nonempty(),
});

// Exporting types for invites
export type Invite = z.infer<typeof inviteSchema>;
export type AddInvite = z.infer<typeof addInviteSchema>;
export type AcceptInvite = z.infer<typeof acceptInviteSchema>;
export type UpdateInvite = z.infer<typeof updateInviteSchema>;
export type DeleteInvite = z.infer<typeof deleteInviteSchema>;