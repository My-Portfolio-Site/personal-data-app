import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/server/db/dbBinding";
import { getCurrentUserId } from "@/lib/dal";
import { skillSchema, SkillSchemaType } from "@/schemas/skill";

// Get a skill by ID
export async function GET(req: Request, { params }: { params: { skillId?: string } }) {
  try {
    const currentUserId = await getCurrentUserId();
    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }

    const skillId = params.skillId;

    console.log(`Fetching skills for currentUserId: ${currentUserId} and skillId: ${skillId}`);

    const query = `SELECT * FROM "skills" WHERE "id" = ? AND "userId" = ?;`;
    const result = await db.prepare(query).bind(skillId, currentUserId).first();
    if (!result) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching skills:", error.message);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

// Delete a skill by ID
export async function DELETE(req: Request, { params }: { params: { skillId?: string } }) {
  try {
    const currentUserId = await getCurrentUserId();

    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }
    const skillId = params.skillId;

    if (!skillId) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
    }
    const queryFind = `SELECT * FROM "skills" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(skillId, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    const query = `DELETE FROM "skills" WHERE "id" = ? AND "userId" = ?;`;
    await db.prepare(query).bind(skillId, currentUserId).run();
    return NextResponse.json({ message: "Skill deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting skill:", error.message);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}