'use server'

import {
  createInviteFormSchema,
  updateInviteSchema,
  deleteInviteSchema,
  Invite,
  CreateInviteForm,
  UpdateInvite,
  createInviteSchema,
} from '@/schemas/invite'
import { auth } from '@/lib/auth'

import { getCurrentUrl } from '@/server/utils/fetchWrapper'
import { headers, cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
//==============================Invites=====================================//
// Fetch all invites
export async function fetchAllInvites() {
  try {
    const cookieStore = cookies()
    const cookieHeader = cookieStore.toString()

    const API_BASE_URL = getCurrentUrl(await headers())
    const API_INVITES_URL = API_BASE_URL + '/api/invites'
    console.log('Fetching invites...', API_INVITES_URL)

    const response = await fetch(API_INVITES_URL, { method: 'GET', headers: { 'Cookie': cookieHeader } })
    if (!response.ok) {
      console.log('Failed to fetch invites,', 'status:', response.status)
      throw new Error('Failed to fetch invites')
    }
    return (await response.json()) as Invite[]
  } catch (err) {
    return { success: false, message: (err as Error).message } as ActionResponse
  }
}

// Add a new invite
export async function createInvite(data: CreateInviteForm) {
  try {
    const cookieStore = cookies()
    const cookieHeader = cookieStore.toString()

    const API_BASE_URL = getCurrentUrl(await headers())
    const API_INVITES_URL = API_BASE_URL + '/api/invites'

    const currentUserSession = await auth()
    let currentUserEmail = ''
    if (!currentUserSession?.user?.email) {
      currentUserEmail = 'mnkesu1998@gmail.com'
      // throw new Error("User not authenticated");
    } else {
      currentUserEmail = currentUserSession?.user?.email
    }
    const dateExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const parsedData = createInviteFormSchema.parse(data)
    const allParsedData = createInviteSchema.parse({
      ...parsedData,
      expires: new Date(dateExpires).toISOString(), // 7 days from now
      invitedBy: currentUserEmail,
    })
    console.log('Creating invite: ', allParsedData)
    const response = await fetch(API_INVITES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader },
      body: JSON.stringify(allParsedData),
    })
    if (!response.ok) {
      throw new Error('Failed to create invite')
    }
    revalidatePath('/admin/invites')
    return { message: 'Invite created successfully', success: true } as ActionResponse
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse
  }
}

// Update an invite
export async function updateInvite(data: UpdateInvite) {
  try {
    const cookieStore = cookies()
    const cookieHeader = cookieStore.toString()

    const API_BASE_URL = getCurrentUrl(await headers())
    const API_INVITES_URL = API_BASE_URL + '/api/invites'

    const parsedData = updateInviteSchema.parse(data)
    const response = await fetch(API_INVITES_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader },
      body: JSON.stringify(parsedData),
    })
    if (!response.ok) {
      throw new Error('Failed to update invite')
    }
    revalidatePath('/admin/invites')
    return { message: 'Invite updated successfully', success: true } as ActionResponse
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse
  }
}

// Delete an invite
export async function deleteInvite(id: string) {
  try {
    const cookieStore = cookies()
    const cookieHeader = cookieStore.toString()

    const API_BASE_URL = getCurrentUrl(await headers())
    const API_INVITES_URL = API_BASE_URL + '/api/invites'

    const parsedData = deleteInviteSchema.parse({ id })
    const response = await fetch(API_INVITES_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader },
      body: JSON.stringify(parsedData),
    })
    if (!response.ok) {
      throw new Error('Failed to delete invite')
    }
    revalidatePath('/admin/invites')
    return { message: 'Invite deleted successfully', success: true } as ActionResponse
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse
  }
}

