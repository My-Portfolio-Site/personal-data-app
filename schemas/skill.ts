import { z } from "zod/v4";

export const skillSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  name: z.string().nonempty({ error: 'Skill Title required.' }).max(50, { message: 'Skill Title must be at most 50 characters.' }),
  level: z.string().nonempty({ error: 'Skill Level required.' }).refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
    message: "Skill Level must be a number from 0 to 100"
  }),
  category: z.enum(["languages", "frameworks", "tools", "competencies", "soft"], { error: 'Category value required.' }),
  description: z.string().nonempty({ error: 'Skill Description required.' }),
});


export type SkillSchemaType = z.infer<typeof skillSchema>;
export type SkillSchemaErrorType = z.inferFlattenedErrors<typeof skillSchema>;


export type SkillActionState = {
  data?: SkillSchemaType
  errors: SkillSchemaErrorType
  message: FormValidationMessage | null
}
