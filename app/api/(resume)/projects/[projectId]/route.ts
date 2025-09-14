import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/server/db/dbBinding";
import { getCurrentUserId } from "@/lib/dal";
import { projectSchema, ProjectSchemaType } from "@/schemas/project";

// Get a project by ID
export async function GET(req: Request, { params }: { params: { projectId: string } }) {
  try {
    const currentUserId = await getCurrentUserId();
    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }

    const projectId = params.projectId;
    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    console.log(`Fetching projects for currentUserId: ${currentUserId} and projectId: ${projectId}`);

    const query = `SELECT * FROM "projects" WHERE "id" = ? AND "userId" = ?;`;
    const result = await db.prepare(query).bind(projectId, currentUserId).first();
    if (!result) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching project:", error.message);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

// Delete a project by ID
export async function DELETE(req: Request, { params }: { params: { projectId: string } }) {
  try {
    const currentUserId = await getCurrentUserId();

    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }
    const projectId = params.projectId;

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }
    const queryFind = `SELECT * FROM "projects" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(projectId, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const query = `DELETE FROM "projects" WHERE "id" = ? AND "userId" = ?;`;
    await db.prepare(query).bind(projectId, currentUserId).run();
    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting project:", error.message);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}