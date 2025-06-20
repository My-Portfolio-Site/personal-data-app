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
export const createInviteFormSchema = z.object({
  email: z.email({ error: 'Email id is required' }).nonempty(),
  role: z.enum(["user", "admin"]),
});

export const createInviteSchema = z.object({
  email: z.email({ error: 'Email id is required' }).nonempty(),
  role: z.enum(["user", "admin"]),
  expires: z.coerce.date(),
  invitedBy: z.string().nonempty(),
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
  email: z.email(),
  role: z.enum(["user", "admin"])
});


// Schema for deleting a invite (requires only the ID)
export const deleteInviteSchema = z.object({
  id: z.string().nonempty(),
});

// Exporting types for invites
export type Invite = z.infer<typeof inviteSchema>;
export type CreateInvite = z.infer<typeof createInviteSchema>;
export type CreateInviteForm = z.infer<typeof createInviteFormSchema>;
export type AcceptInvite = z.infer<typeof acceptInviteSchema>;
export type UpdateInvite = z.infer<typeof updateInviteSchema>;
export type DeleteInvite = z.infer<typeof deleteInviteSchema>;