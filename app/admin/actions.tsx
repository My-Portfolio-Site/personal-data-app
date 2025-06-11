"use server";

import { addInviteSchema, updateInviteSchema, deleteInviteSchema, Invite, AddInvite, UpdateInvite, DeleteInvite } from "@/schemas/invite";
import { User } from "@/schemas/user";
// Error type for API responses
type ApiError = {
  error: string;
  status?: number;
};
// Base URL for the API
const API_BASE_URL = "http://localhost:3000/api";

//==============================Invites=====================================//
const API_INVITES_URL = API_BASE_URL + "/invites";
// Fetch all invites
export async function fetchAllInvites() {
  try {
    console.log("Fetching invites...", API_INVITES_URL);
    
    const response = await fetch(API_INVITES_URL, { method: "GET" });
    if (!response.ok) {
      console.log("Failed to fetch invites,", "status:", response.status);
      throw new Error("Failed to fetch invites")
    }
    return (await response.json()) as Invite[];
  } catch (err) {
    return { error: (err as Error).message } as ApiError;
  }
}

// Add a new invite
export async function createInvite(data: AddInvite): Promise<{ message: string }> {
  const parsedData = addInviteSchema.parse(data);
  const response = await fetch(API_INVITES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsedData),
  });
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || "Failed to create invite");
  }
  return await response.json();
}

// Update an invite
export async function updateInvite(data: UpdateInvite): Promise<{ message: string }> {
  const parsedData = updateInviteSchema.parse(data);
  const response = await fetch(API_INVITES_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsedData),
  });
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || "Failed to update invite");
  }
  return await response.json();
}

// Delete an invite
export async function deleteInvite(data: DeleteInvite): Promise<{ message: string }> {
  const parsedData = deleteInviteSchema.parse(data);
  const response = await fetch(API_INVITES_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsedData),
  });
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || "Failed to delete invite");
  }
  return await response.json();
}


// ==================================================Users=============================================================//
const API_USERS_URL = API_BASE_URL + "/users";
// Fetch all Users
export async function fetchAllUsers() {
  try{
  const response = await fetch(API_USERS_URL, { method: "GET" });
    if (!response.ok) {
      const error= { error: "Failed to fetch users", status: response.status };
      console.log(error)
      return error as ApiError;
    }
    return (await response.json()) as User[];
  } catch (err) {
    return { error: (err as Error).message } as ApiError;
  }
}