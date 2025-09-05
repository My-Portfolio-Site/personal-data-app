import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/dal";
import { projectSchema, ProjectSchemaType } from "@/schemas/project";

// Get all projects
export async function GET(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }

    const url = new URL(req.url);
    const projectId = url.searchParams.get("projectId");
    if (projectId) {
      // Fetch a single
      console.log(`Fetching projects for currentUserId: ${currentUserId} and projectId: ${projectId}`);

      const query = `SELECT * FROM "projects" WHERE "id" = ? AND "userId" = ?;`;
      const result = await db.prepare(query).bind(projectId, currentUserId).first();
      if (!result) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }

      return NextResponse.json(result, { status: 200 });
    }

    // Fetch projects for the given currentUserId
    console.log(`Fetching projects for userId: ${currentUserId}`);
    const query = `SELECT * FROM "projects" WHERE "userId" = ?;`;
    const { results } = await db.prepare(query).bind(currentUserId).all<ProjectSchemaType>();

    return NextResponse.json(results, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching projects:", error.message);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// Add a new project
export async function POST(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }
    
    const body = await req.json();
    console.log("API request received:", body);

    // Validate the request body
    const { title, description, features, technologies, company, year, duration, liveUrl, githubUrl, status, role } = projectSchema.parse(body);

    // Generate a unique ID for the project
    const projectId = uuidv4();
    console.log("Creating project with ID:", projectId, currentUserId, title, description, features, technologies, company, year, duration, liveUrl, githubUrl, status, role);

    // Insert the new project into the database
    const query = `
      INSERT INTO "projects" ("id", "userId", "title", "description", "features", "technologies", "company", "year", "duration", "liveUrl", "githubUrl", "status", "role")
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    await db.prepare(query).bind(projectId, currentUserId, title, description, features, technologies, company, year, duration, liveUrl, githubUrl, status, role).run();
    return NextResponse.json({ message: "Project created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 500 });
  }
}

// Update existing projects
export async function PUT(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    const { id, userId, title, description, features, technologies, company, year, duration, liveUrl, githubUrl, status, role } = projectSchema.parse(await req.json());

    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }

    if (currentUserId !== userId) {
      console.log("Not authorized. User ID mismatch.");
      return NextResponse.json(
        { error: "Not authorized. User ID mismatch." },
        { status: 403 }
      );
    }
    console.log("API: Updating project with ID:", id, currentUserId, title, description, features, technologies, company, year, duration, liveUrl, githubUrl, status, role);

    const queryFind = `SELECT * FROM "projects" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(id, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const query = `
      UPDATE "projects"
      SET
        "title" = COALESCE(?, "title"),
        "description" = COALESCE(?, "description"),
        "features" = COALESCE(?, "features"),
        "technologies" = COALESCE(?, "technologies"),
        "company" = COALESCE(?, "company"),
        "year" = COALESCE(?, "year"),
        "duration" = COALESCE(?, "duration"),
        "liveUrl" = COALESCE(?, "liveUrl"),
        "githubUrl" = COALESCE(?, "githubUrl"),
        "status" = COALESCE(?, "status"),
        "role" = COALESCE(?, "role")
      WHERE "id" = ? AND "userId" = ?;
    `;
    const res = await db.prepare(query).bind(
      title,
      description,
      features,
      technologies,
      company,
      year,
      duration,
      liveUrl,
      githubUrl,
      status,
      role,
      id,
      userId).run();
    console.log("API: project updated successfully", res);

    return NextResponse.json({ message: "Project updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating project:", error.message);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// Delete a project by ID
export async function DELETE(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();

    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }
    const url = new URL(req.url);
    const projectId = url.searchParams.get("projectId");

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