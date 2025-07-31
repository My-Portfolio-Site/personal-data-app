import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { createInviteSchema, acceptInviteSchema, updateInviteSchema, Invite } from "@/schemas/invite";

// Get all invites
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    if (url.searchParams.toString()) {
      console.log("Query parameters are not allowed for this route");
      return NextResponse.json(
        { error: "Query parameters are not allowed for this route" },
        { status: 400 }
      );
    }
    // Fetch all invites
    console.log("Fetching all invites");
    const query = `SELECT * FROM "invites";`;
    const result = await db.prepare(query).all();
    const invites = (result.results || []) as Invite[];
    return NextResponse.json(invites, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching invites:", error.message);
    return NextResponse.json({ error: "Failed to fetch invites" }, { status: 500 });
  }
}

// Add a new invite
export async function POST(req: Request) {
  try {
    const  body = await req.json();
    console.log("API request received:", body);
    
    const { email, role, invitedBy, expires } = createInviteSchema.parse(body);
    const inviteId = uuidv4();
    console.log("Creating invite with ID:", inviteId, email, role, invitedBy, expires);
    const query = `
      INSERT INTO "invites" ("id", "email", "role", "invitedBy", "expires")
      VALUES (?, ?, ?, ?, ?);
    `;
    await db.prepare(query).bind(inviteId, email, role, invitedBy, expires).run();
    return NextResponse.json({ message: "Invite created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating invite:", error);
    return NextResponse.json({ error: error.message || "Failed to create invite" }, { status: 500 });
  }
}

// Update an invite
export async function PUT(req: Request) {
  try {
    // Handle normal invite update
    const { id, email, role } = updateInviteSchema.parse(await req.json());
    const query = `
        UPDATE "invites"
        SET 
          "email" = COALESCE(?, "email"),
          "role" = COALESCE(?, "role"),
          "updatedAt" = COALESCE(?, "updatedAt")
        WHERE "id" = ?;
      `;
    const updatedAt = new Date().toISOString();
    await db.prepare(query).bind(email, role, updatedAt, id).run();
    return NextResponse.json({ message: "Invite updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating invite:", error.message);
    return NextResponse.json({ error: "Failed to update invite" }, { status: 500 });
  }
}

// Delete an invite by ID
export async function DELETE(req: Request) {
  try {
    const { id } = updateInviteSchema.pick({ id: true }).parse(await req.json());
    const query = `DELETE FROM "invites" WHERE "id" = ?;`;
    await db.prepare(query).bind(id).run();
    return NextResponse.json({ message: "Invite deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting invite:", error.message);
    return NextResponse.json({ error: "Failed to delete invite" }, { status: 500 });
  }
}