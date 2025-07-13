'use server'

import { User, deleteUserSchema, updateUserFormSchema, UpdateUserData } from '@/schemas/user'
import { auth } from '@/lib/auth'

import { getCurrentUrl } from '@/lib/helpers'
import { headers, cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// ==================================================Users=============================================================//
// Fetch all Users
export async function fetchAllUsers() {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_USERS_URL = API_BASE_URL + '/api/users'
    const response = await fetch(API_USERS_URL, { method: 'GET', headers: { 'Cookie': cookieHeader } })
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
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_USERS_URL = API_BASE_URL + '/api/users'

    const parsedData = deleteUserSchema.parse({ id })
    const response = await fetch(API_USERS_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader },
      body: JSON.stringify(parsedData),
    })
    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(error.error || 'Failed to delete user')
    }
    revalidatePath('/admin/users')
    return (await response.json()) as ApiResponseMessage
  } catch (err) {
    return { error: (err as Error).message } as ApiError
  }
}

// Update a user
export async function updateUser(data: UpdateUserData) {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_USERS_URL = API_BASE_URL + '/api/users'

    const parsedData = updateUserFormSchema.parse(data)
    const response = await fetch(API_USERS_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader },
      body: JSON.stringify(parsedData),
    })
    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(error.error || 'Failed to update user')
    }
    revalidatePath('/admin/users')
    return (await response.json()) as ApiResponseMessage
  } catch (err) {
    return { error: (err as Error).message } as ApiError
  }
}


