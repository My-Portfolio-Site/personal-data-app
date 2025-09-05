'use server'
import { z } from "zod/v4";
import { revalidatePath } from 'next/cache'

import type { ProjectSchemaType, ProjectSchemaErrorType } from '@/schemas/project'
import { projectSchema, ProjectActionState } from '@/schemas/project'
import { fetchApi } from '@/lib/helpers'


//==============================Project=====================================//
// Fetch all projects
export async function fetchProjects() {
  try {
    const response = await fetchApi('/projects', 'GET')

    if (!response.ok) {
      console.log('Action: Failed to fetch projects,', 'status:', response.status)
      throw new Error('Failed to fetch projects')
    }
    const responseData = await response.json() as ProjectSchemaType[];
    return { success: true, data: responseData } as ActionResponse<ProjectSchemaType[]>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}

// Fetch a single project by ID
export async function fetchProjectById(id: string) {
  try {
    const response = await fetchApi(`/projects?projectId=${id}`, 'GET')

    if (!response.ok) {
      console.log('Failed to fetch project,', 'status:', response.status)
      throw new Error('Failed to fetch project')
    }

    const responseData = await response.json() as ProjectSchemaType
    return { success: true, data: responseData } as ActionResponse<ProjectSchemaType>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
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

// Add a new project
export async function addProject(_prev: ProjectActionState, formData: FormData): Promise<ProjectActionState> {
  const data = Object.fromEntries(formData)
  console.log('Action: Adding project with data:', data);

  const validationResult = projectSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as ProjectSchemaType,
      errors: z.flattenError(validationResult.error) as ProjectSchemaErrorType,
      message: {success: false, message: 'One or more fields are invalid.'}
    }
  }

  try {
    const response = await fetchApi<ProjectSchemaType>('/projects', 'POST', validationResult.data)

    if (!response.ok) {
      console.log('API Response: Failed to create a new project,', 'status:', response.status)
      return {
        data: data as ProjectSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as ProjectSchemaErrorType,
        message: {success: false, message: `Failed to create project.`}
      }
    }

    revalidatePath('/projects')
    return {
      data: data as ProjectSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ProjectSchemaErrorType,
      message: {success: true, message: 'Project created successfully'}
    }
  } catch (err) {
    console.error('Error creating project:', err)
    return {
      data: data as ProjectSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ProjectSchemaErrorType,
      message: {success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred'}
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
      message: {success: false, message: 'One or more fields are invalid.'}
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
        message: {success: false, message: `Failed to update project.`}
      }
    }

    revalidatePath('/projects')
    return {
      data: data as ProjectSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ProjectSchemaErrorType,
      message: {success: true, message: 'Project updated successfully.'}
    }
  } catch (err) {
    console.error('Error updating project:', err)
    return {
      data: data as ProjectSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ProjectSchemaErrorType,
      message: {success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred'}
    }
  }
}