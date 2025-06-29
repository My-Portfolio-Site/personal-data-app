import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { User, deleteUserSchema, updateUserSchema, addUserSchema } from "@/schemas/user";

// Get all users
export async function GET() {
  try {
    const query = `SELECT * FROM "users";`;
    const result = await db.prepare(query).all();
    const users = (result.results || []) as User[];
    return NextResponse.json( users , { status: 200 });
  } catch (error: any) {
    console.error("API: Error fetching users:", error.message);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// Delete a user by ID
export async function DELETE(req: Request) {
  try {
    const { id } = deleteUserSchema.parse(await req.json());
    if (!id) {
      console.log("User ID is required for deletion");
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const checkQuery = `SELECT * FROM "users" WHERE "id" = ?;`;
    const userExists = await db.prepare(checkQuery).bind(id).first();
    if (!userExists) {
      console.log("User not found with ID:", id);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const query = `DELETE FROM "users" WHERE "id" = ?;`;
    const resp = await db.prepare(query).bind(id).run();
    console.log("Delete response:", resp);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting user:", error.message);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

// Update a user by ID
export async function PUT(req: Request) {
  try {
    const { id, name, role, userVerified } = updateUserSchema.parse(await req.json());
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const checkQuery = `SELECT * FROM "users" WHERE "id" = ?;`;
    const userExists: User | null = await db.prepare(checkQuery).bind(id).first();
    if (!userExists) {
      console.log("User not found with ID:", id);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log("Updating user:", id, name, role, userVerified);
    const query = `
      UPDATE "users" 
      SET 
        "name" = COALESCE(?, "name"),
        "role" = COALESCE(?, "role"),
        "userVerified" = COALESCE(?, "userVerified")
      WHERE "id" = ?;
    `;
    await db.prepare(query).bind(name, role, userVerified, id).run();
    return NextResponse.json({ message: "User updated successfully" }, {status: 200});
  } catch (error: any) {
    console.error("Error updating user:", error.message);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// Add a new user (not implemented in this route, but can be added later)
export async function POST(req: Request) {
  try {
    const { name, email, role, userVerified, emailVerified, image } = addUserSchema.parse(await req.json());
    console.log("Received data for new user:", { name, email, role, userVerified, emailVerified, image });
    
    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      );
    }
    
    const checkQuery = `SELECT * FROM "users" WHERE "email" = ?;`;
    const existingUser = await db.prepare(checkQuery).bind(email).first();
    
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }
    const userId = uuidv4(); // Generate a new UUID if no ID is provided
    console.log("Adding new user:", userId, name, email, role, userVerified, emailVerified, image);
    const query = `
      INSERT INTO "users" ("id", "name", "email", "role", "userVerified", "emailVerified", "image")
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    
    await db.prepare(query).bind(userId, name, email, role,  userVerified, emailVerified, image).run();
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}