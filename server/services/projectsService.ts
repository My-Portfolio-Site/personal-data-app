import 'server-only';
// import { revalidatePath } from 'next/cache'

import type { ProjectSchemaType } from '@/schemas/project'
import { fetchApi } from '@/server/utils/fetchWrapper'

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
    const response = await fetchApi(`/projects/${id}`, 'GET')

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

