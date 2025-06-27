import { z } from "zod/v4";
import { id } from "zod/v4/locales";

export const ExperienceSchema = z.object({
  id: z.string().nonempty(),
  userId: z.string().nonempty(),
  company: z.string(),
  location: z.string(),
  position: z.string(),
  startDate: z.iso.date(),
  endDate: z.iso.date().nullable(),
  achievements: z.array(z.string()),
  technologies: z.array(z.string()),
  description: z.string().nullable(),
});

// export const createExperienceSchema = z.object({
//   company: z.string(),
//   location: z.string(),
//   position: z.string(),
//   startDate: z.iso.date(),
//   endDate: z.iso.date().nullable(),
//   achievements: z.array(z.string()),
//   technologies: z.array(z.string()),
//   description: z.string().nullable(),
// })

export const ExperienceFormSchema = z.object({
  // id: z.string().optional(),
  company: z.string(),
  location: z.string(),
  position: z.string(),
  startDate: z.iso.date(),
  endDate: z.iso.date().nullable(),
  achievements: z.array(z.string()),
  technologies: z.array(z.string()),
  description: z.string().nullable(),
})

// export const createExperienceFormSchema = z.object({
//   company: z.string(),
//   location: z.string(),
//   position: z.string(),
//   startDate: z.string(), // ISO date string
//   endDate: z.string().nullable(), // Nullable for ongoing positions
//   achievements: z.string(),
//   technologies: z.string(),
//   description: z.string().nullable(),
// })


export const updateExperienceSchema = z.object({
  id: z.string().nonempty(),
  userId: z.string().nonempty(),
  company: z.string().nullable().default(null),
  location: z.string().nullable().default(null),
  position: z.string().nullable().default(null),
  startDate: z.iso.date().nullable().default(null),
  endDate: z.iso.date().nullable().default(null),
  achievements: z.array(z.string()).nullable().default(null),
  technologies: z.array(z.string()).nullable().default(null),
  description: z.string().nullable().default(null),
});

// Schema for deleting a Experience (requires only the ID)
export const deleteExperienceSchema = z.object({
  id: z.string().nonempty(),
});

// Type inference for TypeScript
export type Experience = z.infer<typeof ExperienceSchema>;
// export type CreateExperience = z.infer<typeof createExperienceSchema>;
export type UpdateExperience = z.infer<typeof updateExperienceSchema>;
export type DeleteExperience = z.infer<typeof deleteExperienceSchema>;
// export type CreateExperienceForm = z.infer<typeof createExperienceFormSchema>;
export type ExperienceFormData = z.infer<typeof ExperienceFormSchema>;