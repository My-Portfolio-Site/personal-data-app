import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { addInviteSchema, acceptInviteSchema, updateInviteSchema, Invite } from "@/schemas/invite";

// Get all invites or accept an invite
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const accept = url.searchParams.get("accept");
    const token = url.searchParams.get("token");

    // Handle invite acceptance
    if (accept && token) {
      // Validate the token
      const tokenQuery = `SELECT * FROM "invites" WHERE "id" = ?;`;
      const invite = await db.prepare(tokenQuery).bind(token).first<Invite>();

      if (!invite) {
        return NextResponse.json({ error: "Invalid token or invite not found" }, { status: 404 });
      }

      // Check if already expired
      if (invite.expires < new Date()) {
        return NextResponse.json({ error: "Invite has expired" }, { status: 400 });
      }

      // Check if already accepted
      if (invite.status === "accepted") {
        return NextResponse.json({ error: "Invite already accepted" }, { status: 400 });
      }

      // Deny rejected token
      if (invite.status === "rejected") {
        return NextResponse.json({ error: "Invite already rejected" }, { status: 400 });
      }

      if (accept === "true") {
        // Accept the invite)
      // Handle invite acceptance
      const query = `
        UPDATE "invites"
        SET 
          "status" = "accepted",
          "updatedAt" = CURRENT_TIMESTAMP
        WHERE "id" = ?;
      `;
      await db.prepare(query).bind(token).run();

      return NextResponse.json({ message: "Invite accepted successfully" }, { status: 200 });
      } else if (accept === "false") {
        // Reject the invite
        const query = `
          UPDATE "invites"
          SET 
            "status" = "rejected",
            "updatedAt" = CURRENT_TIMESTAMP
          WHERE "id" = ?;
        `;
        await db.prepare(query).bind(token).run();

        return NextResponse.json({ message: "Invite rejected successfully" }, { status: 200 });
      } else {
        return NextResponse.json({ error: "Invalid accept parameter" }, { status: 400 });
      }
    } else {
      // Fetch all invites
      console.log("Fetching all invites");
      const query = `SELECT * FROM "invites";`;
      const result = await db.prepare(query).all();
      const invites = (result.results || []) as Invite[];
      return NextResponse.json(invites, { status: 200 });
    }
  } catch (error: any) {
    console.error("Error fetching invites:", error.message);
    return NextResponse.json({ error: "Failed to fetch invites" }, { status: 500 });
  }
}

// Add a new invite
export async function POST(req: Request) {
  try {
    const { email, role, invitedBy, expires } = addInviteSchema.parse(await req.json());
    const inviteId = uuidv4();
    const query = `
      INSERT INTO "invites" ("id", "email", "role", "invitedBy", "expires")
      VALUES (?, ?, ?, ?, ?);
    `;
    await db.prepare(query).bind(inviteId, email, role, invitedBy, expires).run();
    return NextResponse.json({ message: "Invite created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating invite:", error.message);
    return NextResponse.json({ error: "Failed to create invite" }, { status: 500 });
  }
}

// Update an invite
export async function PUT(req: Request) {
  try {
    // Handle normal invite update
    const { id, status, updatedAt } = updateInviteSchema.parse(await req.json());
    const query = `
        UPDATE "invites"
        SET 
          "status" = COALESCE(?, "status"),
          "updatedAt" = COALESCE(?, "updatedAt")
        WHERE "id" = ?;
      `;
    await db.prepare(query).bind(status, updatedAt, id).run();
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