import { z } from "zod/v4";

export const certificationSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  title: z.string().nonempty({ error: 'Certificate title required.' }).max(50, { message: 'Certificate title must be at most 50 characters.' }),
  issuer: z.string().nonempty({ error: 'Issuer value required.' }),
  issueDate: z.iso.date({ error: 'Enter valid date.' }),
  expiryDate: z.iso.date({ error: 'Enter valid date.' }).optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.union([z.url().trim(), z.string().max(0)]).optional(),
  status: z.enum(["Active", "Expired"], { error: 'Status value required.' }),
  description: z.string().nonempty({ error: 'Certificate description required.' }),
});


export type CertificationSchemaType = z.infer<typeof certificationSchema>;
export type CertificationSchemaErrorType = z.inferFlattenedErrors<typeof certificationSchema>;


export type CertificationActionState = {
  data?: CertificationSchemaType
  errors: CertificationSchemaErrorType
  message: FormValidationMessage | null
}
