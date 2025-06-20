'use server'

import { User, deleteUserSchema } from '@/schemas/user'
import { auth } from '@/lib/auth'
// Error type for API responses
type ApiError = {
  error: string
  status?: number
}
type ApiResponseMessage = {
  message: string
  status?: number
}
// Base URL for the API
import { getCloudflareContext } from "@opennextjs/cloudflare";
const {env} = await getCloudflareContext({ async: true })
const API_BASE_URL = env.API_URL

// ==================================================Users=============================================================//
const API_USERS_URL = API_BASE_URL + '/users'
// Fetch all Users
export async function fetchAllUsers() {
  try {
    const response = await fetch(API_USERS_URL, { method: 'GET' })
    if (!response.ok) {
      const error = { error: 'Failed to fetch users', status: response.status }
      console.log(error)
      return error as ApiError
    }
    return (await response.json()) as User[]
  } catch (err) {
    return { error: (err as Error).message } as ApiError
  }
}

// Delete an user
export async function deleteUser(id: string) {
  try {
    const parsedData = deleteUserSchema.parse({ id })
    const response = await fetch(API_USERS_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedData),
    })
    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(error.error || 'Failed to delete user')
    }
    return (await response.json()) as ApiResponseMessage
  } catch (err) {
    return { error: (err as Error).message } as ApiError
  }
}
