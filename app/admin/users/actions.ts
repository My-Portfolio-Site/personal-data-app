'use server'

import { User, deleteUserSchema } from '@/schemas/user'
import { auth } from '@/lib/auth'

import { getCurrentUrl } from '@/lib/helpers'
import { headers } from 'next/headers'
// ==================================================Users=============================================================//
// Fetch all Users
export async function fetchAllUsers() {
  try {
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_USERS_URL = API_BASE_URL + '/api/users'
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
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_USERS_URL = API_BASE_URL + '/api/users'
    
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
