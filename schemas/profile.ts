import { z } from "zod/v4";

export const profileSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  email: z.union([z.email({ error: "Not a email id." })]),
  firstName: z.string().nonempty({ error: 'First name is required.' }).trim(),
  lastName: z.string().nonempty({ error: 'Last name is required.' }).trim(),
  title: z.string().nonempty({ error: 'Professional title is required.' }).trim(),
  phone: z.union([z.string().regex(/^\+?\d{1,4}-\d{7,10}$/, { error: 'Invalid phone number.' }), z.string().max(0)]).optional(),
  location: z.string().nonempty({ error: 'Location is required.' }).trim(),
  website: z.union([z.url().trim(), z.string().max(0)]).optional(),
  linkedin: z.union([z.url().trim(), z.string().max(0)]).optional(),
  github: z.union([z.url().trim(), z.string().max(0)]).optional(),
  summary: z.string().nonempty({ error: 'Professional summary is required.' }).trim(),
})

export type ProfileSchemaType = z.infer<typeof profileSchema>;
export type ProfileSchemaErrorType = z.inferFlattenedErrors<typeof profileSchema>;


export type ProfileActionState = {
  data?: ProfileSchemaType
  errors: ProfileSchemaErrorType
  error: string | null
}
