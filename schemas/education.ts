import { z } from "zod/v4";

export const educationSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  institution: z.string().nonempty({ error: 'Institution name required.' }),
  degree: z.string().nonempty({ error: 'Degree value required.' }),
  field: z.string().nonempty({ error: 'Field of study required.' }),
  location: z.string().nonempty({ error: 'Location value required.' }),
  startDate: z.iso.date({ error: 'Enter valid date.' }),
  endDate: z.iso.date({ error: 'Enter valid date.' }).optional(),
  gpa: z.string().nonempty({ error: 'GPA value required.' }),
  honors: z.string().optional(),
  coursework: z.string().optional(),
  activities: z.string().optional(),
});

export type EducationSchemaType = z.infer<typeof educationSchema>;
export type EducationSchemaErrorType = z.inferFlattenedErrors<typeof educationSchema>;


export type EducationActionState = {
  data?: EducationSchemaType
  errors: EducationSchemaErrorType
  message: FormValidationMessage | null
}
