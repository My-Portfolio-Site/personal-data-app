import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/server/db/dbBinding";
import { Invite } from "@/schemas/invite";
import { userSchema, User } from "@/schemas/user";
import { auth } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next"
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
      console.log("Params not found, accept or token.");
      throw new Error("Invalid parameters");
    }
  } catch (error: any) {
    console.error("Error accepting invite:", error.message);
    return NextResponse.json({ error: "Failed to accept invite" }, { status: 500 });
  }
}


export async function POST(req: Request) {

  return NextResponse.json({ message: "Hello World" });
}