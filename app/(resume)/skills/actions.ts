'use server'
import { z } from "zod/v4";
import { revalidatePath } from 'next/cache'

import type { SkillSchemaType, SkillSchemaErrorType } from '@/schemas/skill'
import { skillSchema } from '@/schemas/skill'
import { fetchApi } from '@/lib/helpers'


//==============================Skill=====================================//
// Fetch all skills
export async function fetchSkills() {
  try {
    const response = await fetchApi('/skills', 'GET')

    if (!response.ok) {
      console.log('Action: Failed to fetch skills,', 'status:', response.status)
      throw new Error('Failed to fetch skills')
    }
    const responseData = await response.json() as SkillSchemaType[];
    return { success: true, data: responseData } as ActionResponse<SkillSchemaType[]>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}

// export async function fetchExperienceById(id: string) {
//   try {
//     const response = await fetchApi(`/experience?experienceId=${id}`, 'GET')

//     if (!response.ok) {
//       console.log('Failed to fetch experience,', 'status:', response.status)
//       throw new Error('Failed to fetch experience')
//     }

//     const responseData = await response.json() as ExperienceSchemaType
//     return { success: true, data: responseData } as ActionResponse<ExperienceSchemaType>;
//   } catch (err) {
//     return { message: (err as Error).message, success: false } as ActionResponse;
//   }
// }



// Delete a skill
export async function deleteSkillsById(id: string) {
  try {
    const response = await fetchApi(`/skills?skillId=${id}`, 'DELETE')

    if (!response.ok) {
      console.log('Failed to delete skill,', 'status:', response.status)
      throw new Error('Failed to delete skill')
    }
    revalidatePath('/skills')
    return { message: 'Skill deleted successfully', status: 200, success: true } as ActionResponse
  } catch (err) {
    return { message: (err as Error).message, status: 400, success: false } as ActionResponse
  }
}


// // Add a new experience
// export async function addExperience(_prev: ExperienceActionState, formData: FormData): Promise<ExperienceActionState> {
//   const data = Object.fromEntries(formData)
//   console.log('Action: Adding experience with data:', data);
  
//   const validationResult = experienceSchema.safeParse(data)
//   if (!validationResult.success) {
//     return {
//       data: data as ExperienceSchemaType,
//       errors: z.flattenError(validationResult.error) as ExperienceSchemaErrorType,
//       message: {success: false, message: 'One or more fields are invalid.'}
//     }
//   }

//   try {
//     const response = await fetchApi<ExperienceSchemaType>('/experience', 'POST', validationResult.data)

//     if (!response.ok) {
//       console.log('API Response: Failed to create experience,', 'status:', response.status)
//       return {
//         data: data as ExperienceSchemaType,
//         errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
//         message: {success: false, message: `Failed to create experience.`}
//       }
//     }

//     revalidatePath('/experience')
//     return {
//       data: data as ExperienceSchemaType,
//       errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
//       message: {success: true, message: 'Experience created successfully'}
//     }
//   } catch (err) {
//     console.error('Error updating experience:', err)
//     return {
//       data: data as ExperienceSchemaType,
//       errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
//       message: {success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred'}
//     }
//   }
// }


// // Update an existing experience
// export async function updateExperience(_prev: ExperienceActionState, formData: FormData): Promise<ExperienceActionState> {
//   const data = Object.fromEntries(formData)

//   console.log("RD:", data)
  
//   const validationResult = experienceSchema.safeParse(data)
//   if (!validationResult.success) {
//     return {
//       data: data as ExperienceSchemaType,
//       errors: z.flattenError(validationResult.error) as ExperienceSchemaErrorType,
//       message: {success: false, message: 'One or more fields are invalid.'}
//     }
//   }

//   try {
//     const response = await fetchApi<ExperienceSchemaType>('/experience', 'PUT', validationResult.data)

//     if (!response.ok) {
//       console.log('Action: Failed to update experience with data:', data);
      
//       console.log('API Response: Failed to update experience,', 'status:', response.status)
//       return {
//         data: data as ExperienceSchemaType,
//         errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
//         message: {success: false, message: `Failed to update experience.`}
//       }
//     }

//     revalidatePath('/experience')
//     return {
//       data: data as ExperienceSchemaType,
//       errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
//       message: {success: true, message: 'Experience updated successfully.'}
//     }
//   } catch (err) {
//     console.error('Error creating experience:', err)
//     return {
//       data: data as ExperienceSchemaType,
//       errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
//       message: {success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred'}
//     }
//   }
// }