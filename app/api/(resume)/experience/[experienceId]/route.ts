import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/server/db/dbBinding";
import { getCurrentUserId } from "@/lib/dal";
import { experienceSchema, ExperienceSchemaType } from "@/schemas/experience";

interface Context {
  params: Promise<{ experienceId: string }>;
}

// Get all experiences
export async function GET(req: Request, context: Context) {
  try {
    const currentUserId = await getCurrentUserId();
    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }

    const params = await context.params;

    const experienceId = params.experienceId;
    if (!experienceId) {
      return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });
    }
    console.log(`Fetching experiences for currentUserId: ${currentUserId} and experienceId: ${experienceId}`);

    const query = `SELECT * FROM "experiences" WHERE "id" = ? AND "userId" = ?;`;
    const result = await db.prepare(query).bind(experienceId, currentUserId).first();
    if (!result) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching experience:", error.message);
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}

// Delete an experience by ID
export async function DELETE(req: Request, context: Context) {
  try {
    const currentUserId = await getCurrentUserId();

    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }
    const params = await context.params;
    const experienceId = params.experienceId;

    if (!experienceId) {
      return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });
    }
    const queryFind = `SELECT * FROM "experiences" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(experienceId, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    const query = `DELETE FROM "experiences" WHERE "id" = ? AND "userId" = ?;`;
    await db.prepare(query).bind(experienceId, currentUserId).run();
    return NextResponse.json({ message: "Experience deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting experience:", error.message);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}