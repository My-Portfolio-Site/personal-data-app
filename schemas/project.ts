import { z } from "zod/v4";

export const projectSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  title: z.string().nonempty({ error: 'Project Title required.' }).max(100, { message: 'Project Title must be at most 100 characters.' }),
  description: z.string().nonempty({ error: 'Project Description required.' }),
  features: z.string().optional(),
  technologies: z.string().optional(),
  company: z.string().optional(),
  year: z.string().nonempty({ error: 'Year value required.' }),
  duration: z.string().optional(),
  liveUrl: z.union([z.url().trim(), z.string().max(0)]).optional(),
  githubUrl: z.union([z.url().trim(), z.string().max(0)]).optional(),
  status: z.enum(["Completed", "In Progress", "On Hold"], { error: 'Status value required.' }),
  role: z.string().nonempty({ error: 'Project Role required.' }).max(100, { message: 'Project Role must be at most 100 characters.' }),
});

export type ProjectSchemaType = z.infer<typeof projectSchema>;
export type ProjectSchemaErrorType = z.inferFlattenedErrors<typeof projectSchema>;


export type ProjectActionState = {
  data?: ProjectSchemaType
  errors: ProjectSchemaErrorType
  message: FormValidationMessage | null
}
