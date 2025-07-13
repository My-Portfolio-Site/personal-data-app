import {z} from "zod/v4";

export const ProfileSchema = z.object({
  id: z.string().nonempty(),
  userId: z.string().nonempty(),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  email: z.email(),
  phone: z.string(),
  location: z.string(),
  website: z.string(),
  linkedin: z.string(),
  github: z.string(),
  avatar: z.string(),
  summary: z.string(),
  yearsOfExperience: z.number().min(0).multipleOf(0.1).default(0.0),
  projectsDone: z.number().min(0).default(0),
  totalSkills: z.number().min(0).default(0),
  certificationCompleted: z.number().min(0).default(0),
});

export const ProfileUpdateSchema = z.object({
  id: z.string().nonempty(),
  userId: z.string().nonempty(),
  firstName: z.string().nullable().default(null),
  lastName: z.string().nullable().default(null),
  title: z.string().nullable().default(null),
  email: z.email().nullable().default(null),
  phone: z.string().nullable().default(null),
  location: z.string().nullable().default(null),
  website: z.string().nullable().default(null),
  linkedin: z.string().nullable().default(null),
  github: z.string().nullable().default(null),
  avatar: z.string().nullable().default(null),
  summary: z.string().nullable().default(null),
})

export const ProfileCreateSchema = z.object({
  email: z.email(),
  avatar: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  phone: z.string(),
  location: z.string(),
  website: z.string(),
  linkedin: z.string(),
  github: z.string(),
  summary: z.string(),
})

export const ProfileStatsUpdateSchema = z.object({
  yearsOfExperience: z.number().min(0).multipleOf(0.1).optional(),
  projectsDone: z.number().min(0).optional(),
  totalSkills: z.number().min(0).optional(),
  certificationCompleted: z.number().min(0).optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type ProfileCreateData = z.infer<typeof ProfileCreateSchema>;
export type ProfileUpdateData = z.infer<typeof ProfileUpdateSchema>;
export type ProfileStatsUpdateData = z.infer<typeof ProfileStatsUpdateSchema>;