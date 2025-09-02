import { z } from "zod/v4";

export const skillSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  name: z.string().nonempty({ error: 'Skill name required.' }).max(50, { message: 'Skill name must be at most 50 characters.' }),
  level: z.string().optional(),
  categoryTitle: z.enum(["Programming Languages", "Frameworks & Libraries", "Tools & Technologies", "Core Competencies", "Soft Skills"]),
  category: z.enum(["languages", "frameworks", "tools", "competencies", "soft"]),
  description: z.string().nonempty({ error: 'Description value required.' }),
});


export type SkillSchemaType = z.infer<typeof skillSchema>;
export type SkillSchemaErrorType = z.inferFlattenedErrors<typeof skillSchema>;


export type SkillActionState = {
  data?: SkillSchemaType
  errors: SkillSchemaErrorType
  message: FormValidationMessage | null
}
