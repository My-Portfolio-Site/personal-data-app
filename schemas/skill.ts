import { z } from "zod/v4";

export const skillSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  company: z.string().nonempty({ error: 'Company name required.' }),
  location: z.string().nonempty({ error: 'Location value required.' }),
  position: z.string().nonempty({ error: 'Position value required.' }),
  startDate: z.iso.date({ error: 'Enter valid date.' }),
  endDate: z.iso.date({ error: 'Enter valid date.' }).optional(),
  achievements: z.string().optional(),
  technologies: z.string().optional(),
  description: z.string().nonempty({ error: 'Description value required.' }),
});

export type SkillSchemaType = z.infer<typeof skillSchema>;
export type SkillSchemaErrorType = z.inferFlattenedErrors<typeof skillSchema>;


export type SkillActionState = {
  data?: SkillSchemaType
  errors: SkillSchemaErrorType
  message: FormValidationMessage | null
}
