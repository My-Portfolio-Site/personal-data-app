import { z } from "zod/v4";

export const experienceSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  company: z.string().nonempty({error: 'Company name required.'}),
  location: z.string().nonempty({error: 'Location value required.'}),
  position: z.string().nonempty({error: 'Position value required.'}),
  startDate: z.iso.date({ error: 'Enter valid date.' }),
  endDate: z.iso.date().optional(),
  achievements: z.string(),
  technologies: z.string(),
  description: z.string().nonempty({error: 'Description value required.'}),
});

export type ExperienceSchemaType = z.infer<typeof experienceSchema>;
export type ExperienceSchemaErrorType = z.inferFlattenedErrors<typeof experienceSchema>;


export type ExperienceActionState = {
  data?: ExperienceSchemaType
  errors: ExperienceSchemaErrorType
  message: FormValidationMessage | null
}
