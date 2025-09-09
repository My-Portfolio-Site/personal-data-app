'use server'
import { z } from "zod/v4";
import { revalidatePath } from 'next/cache'

import type { ProjectSchemaType, ProjectSchemaErrorType } from '@/schemas/project'
import { projectSchema, ProjectActionState } from '@/schemas/project'
import { fetchApi } from '@/server/utils/fetchWrapper'

// Add a new project
export async function addProject(_prev: ProjectActionState, formData: FormData): Promise<ProjectActionState> {
  const data = Object.fromEntries(formData)
  console.log('Action: Adding project with data:', data);

  const validationResult = projectSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as ProjectSchemaType,
      errors: z.flattenError(validationResult.error) as ProjectSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi<ProjectSchemaType>('/projects', 'POST', validationResult.data)

    if (!response.ok) {
      console.log('API Response: Failed to create a new project,', 'status:', response.status)
      return {
        data: data as ProjectSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as ProjectSchemaErrorType,
        message: { success: false, message: `Failed to create project.` }
      }
    }

    revalidatePath('/projects')
    return {
      data: data as ProjectSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ProjectSchemaErrorType,
      message: { success: true, message: 'Project created successfully' }
    }
  } catch (err) {
    console.error('Error creating project:', err)
    return {
      data: data as ProjectSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ProjectSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}

// Update an existing project
export async function updateProject(_prev: ProjectActionState, formData: FormData): Promise<ProjectActionState> {
  const data = Object.fromEntries(formData)

  console.log("RD:", data)

  const validationResult = projectSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as ProjectSchemaType,
      errors: z.flattenError(validationResult.error) as ProjectSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi<ProjectSchemaType>('/projects', 'PUT', validationResult.data)

    if (!response.ok) {
      console.log('Action: Failed to update project with data:', data);

      console.log('API Response: Failed to update project,', 'status:', response.status)
      return {
        data: data as ProjectSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as ProjectSchemaErrorType,
        message: { success: false, message: `Failed to update project.` }
      }
    }

    revalidatePath('/projects')
    return {
      data: data as ProjectSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ProjectSchemaErrorType,
      message: { success: true, message: 'Project updated successfully.' }
    }
  } catch (err) {
    console.error('Error updating project:', err)
    return {
      data: data as ProjectSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ProjectSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}

// Delete a project
export async function deleteProjectById(id: string) {
  try {
    const response = await fetchApi(`/projects?projectId=${id}`, 'DELETE')

    if (!response.ok) {
      console.log('Failed to delete project,', 'status:', response.status)
      throw new Error('Failed to delete project')
    }
    revalidatePath('/projects')
    return { message: 'Project deleted successfully', status: 200, success: true } as ActionResponse
  } catch (err) {
    return { message: (err as Error).message, status: 400, success: false } as ActionResponse
  }
}
