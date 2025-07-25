import { z } from "zod/v4";

export const experienceSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  company: z.string(),
  location: z.string(),
  position: z.string(),
  startDate: z.iso.date(),
  endDate: z.iso.date().nullable(),
  achievements: z.array(z.string()),
  technologies: z.array(z.string()),
  description: z.string().nullable(),
});

export type ExperienceSchemaType = z.infer<typeof experienceSchema>;
export type ExperienceSchemaErrorType = z.inferFlattenedErrors<typeof experienceSchema>;


export type ExperienceActionState = {
  data?: ExperienceSchemaType
  errors: ExperienceSchemaErrorType
  error: string | null
}
