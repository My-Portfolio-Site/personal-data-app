import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/server/db/dbBinding";
import { getCurrentUserId } from "@/lib/dal";
import { educationSchema, EducationSchemaType } from "@/schemas/education";

interface Context {
  params: Promise<{ educationId: string }>;
}
// Get a education by ID
export async function GET(req: Request, context: Context) {
  try {
    const currentUserId = await getCurrentUserId();

    const params = await context.params;
    const educationId = params.educationId;

    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }

    console.log(`Fetching education for currentUserId: ${currentUserId} and educationId: ${educationId}`);

    const query = `SELECT * FROM "educations" WHERE "id" = ? AND "userId" = ?;`;
    const result = await db.prepare(query).bind(educationId, currentUserId).first();
    if (!result) {
      return NextResponse.json({ error: "Education not found" }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching educations:", error.message);
    return NextResponse.json({ error: "Failed to fetch educations" }, { status: 500 });
  }
}


// Delete an education by ID
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
    const educationId = params.educationId;

    if (!educationId) {
      return NextResponse.json({ error: "Education ID is required" }, { status: 400 });
    }
    const queryFind = `SELECT * FROM "educations" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(educationId, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: "Education not found" }, { status: 404 });
    }

    const query = `DELETE FROM "educations" WHERE "id" = ? AND "userId" = ?;`;
    await db.prepare(query).bind(educationId, currentUserId).run();
    return NextResponse.json({ message: "Education deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting education:", error.message);
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 });
  }
}