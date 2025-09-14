'use server'
import { z } from "zod/v4";
import { revalidatePath } from 'next/cache'

import type { SkillSchemaType, SkillSchemaErrorType } from '@/schemas/skill'
import { skillSchema, SkillActionState } from '@/schemas/skill'
import { fetchApi } from '@/server/utils/fetchWrapper'

// Add a new skill
export async function addSkill(_prev: SkillActionState, formData: FormData): Promise<SkillActionState> {
  const data = Object.fromEntries(formData)
  console.log('Action: Adding skill with data:', data);

  const validationResult = skillSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as SkillSchemaType,
      errors: z.flattenError(validationResult.error) as SkillSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi<SkillSchemaType>('/skills', 'POST', validationResult.data)

    if (!response.ok) {
      console.log('API Response: Failed to create skill,', 'status:', response.status)
      return {
        data: data as SkillSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as SkillSchemaErrorType,
        message: { success: false, message: `Failed to create skill.` }
      }
    }

    revalidatePath('/skills')
    return {
      data: data as SkillSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as SkillSchemaErrorType,
      message: { success: true, message: 'Skill created successfully' }
    }
  } catch (err) {
    console.error('Error updating skill:', err)
    return {
      data: data as SkillSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as SkillSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}

// Update an existing skill
export async function updateSkill(_prev: SkillActionState, formData: FormData): Promise<SkillActionState> {
  const data = Object.fromEntries(formData)

  console.log("RD:", data)

  const validationResult = skillSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as SkillSchemaType,
      errors: z.flattenError(validationResult.error) as SkillSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi<SkillSchemaType>('/skills', 'PUT', validationResult.data)

    if (!response.ok) {
      console.log('Action: Failed to update skill with data:', data);

      console.log('API Response: Failed to update skill,', 'status:', response.body)
      return {
        data: data as SkillSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as SkillSchemaErrorType,
        message: { success: false, message: `Failed to update skill.` }
      }
    }

    revalidatePath('/skills')
    return {
      data: data as SkillSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as SkillSchemaErrorType,
      message: { success: true, message: 'Skill updated successfully.' }
    }
  } catch (err) {
    console.error('Error creating skill:', err)
    return {
      data: data as SkillSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as SkillSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}

// Delete a skill
export async function deleteSkillById(id: string) {
  try {
    const response = await fetchApi(`/skills/${id}`, 'DELETE')

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
