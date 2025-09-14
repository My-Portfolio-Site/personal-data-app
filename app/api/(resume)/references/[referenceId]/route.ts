import { NextResponse } from "next/server";

import { db } from "@/server/db/dbBinding";
import { getCurrentUserId } from "@/lib/dal";

// Get a reference by ID
export async function GET(req: Request, { params }: { params: { referenceId: string } }) {
  try {
    const currentUserId = await getCurrentUserId();
    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }

    const referenceId = params.referenceId;
    if (!referenceId) {
      return NextResponse.json({ error: "References ID is required" }, { status: 400 });
    }

    console.log(`Fetching references for currentUserId: ${currentUserId} and referenceId: ${referenceId}`);

    const query = `SELECT * FROM "references" WHERE "id" = ? AND "userId" = ?;`;
    const result = await db.prepare(query).bind(referenceId, currentUserId).first();
    if (!result) {
      return NextResponse.json({ error: "References not found" }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching reference:", error.message);
    return NextResponse.json({ error: "Failed to fetch reference" }, { status: 500 });
  }
}


// Delete an reference by ID
export async function DELETE(req: Request, { params }: { params: { referenceId: string } }) {
  try {
    const currentUserId = await getCurrentUserId();

    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }
    const referenceId = params.referenceId;

    if (!referenceId) {
      return NextResponse.json({ error: "References ID is required" }, { status: 400 });
    }
    const queryFind = `SELECT * FROM "references" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(referenceId, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: "References not found" }, { status: 404 });
    }

    const query = `DELETE FROM "references" WHERE "id" = ? AND "userId" = ?;`;
    await db.prepare(query).bind(referenceId, currentUserId).run();
    return NextResponse.json({ message: "References deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting reference:", error.message);
    return NextResponse.json({ error: "Failed to delete reference" }, { status: 500 });
  }
}