import 'server-only';

import type { SkillSchemaType } from '@/schemas/skill'
import { fetchApi } from '@/server/utils/fetchWrapper'

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

// Fetch a skill by ID
export async function fetchSkillById(id: string) {
  try {
    const response = await fetchApi(`/skills?skillId=${id}`, 'GET')

    if (!response.ok) {
      console.log('Failed to fetch skill,', 'status:', response.status)
      throw new Error('Failed to fetch skill')
    }

    const responseData = await response.json() as SkillSchemaType
    return { success: true, data: responseData } as ActionResponse<SkillSchemaType>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}

