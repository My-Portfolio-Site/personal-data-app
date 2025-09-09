import { z } from "zod/v4";

export const referenceSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  name: z.string().nonempty({ error: 'Reference Name required.' }).max(50, { message: 'Reference Name must be at most 50 characters.' }),
  designation: z.string().nonempty({ error: 'Reference Designation required.' }).max(50, { message: 'Reference Designation must be at most 50 characters.' }),
  company: z.string().nonempty({ error: 'Reference Company required.' }).max(100, { message: 'Reference Company must be at most 100 characters.' }),
  relationship: z.string().nonempty({ error: 'Reference Relationship required.' }).max(50, { message: 'Reference Relationship must be at most 50 characters.' }),
  email: z.email({ message: 'Invalid email address.' }),
  phone: z.string().max(20, { message: 'Phone number must be at most 20 characters.' }).optional(),
  linkedin: z.union([z.url().trim(), z.string().max(0)]).optional(),
  workingPeriod: z.string().nonempty({ error: 'Working Period required.' }),
  testimonial: z.string().nonempty({ error: 'Testimonial required.' }),
  canContact: z.boolean().default(false),
});


export type ReferenceSchemaType = z.infer<typeof referenceSchema>;
export type ReferenceSchemaErrorType = z.inferFlattenedErrors<typeof referenceSchema>;


export type ReferenceActionState = {
  data?: ReferenceSchemaType
  errors: ReferenceSchemaErrorType
  message: FormValidationMessage | null
}
