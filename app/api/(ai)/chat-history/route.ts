import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

import { db } from "@/server/db/dbBinding";
import { getCurrentUserId } from "@/lib/dal";
import { MessageSchema, MessageSchemaType, ChatSchema, ChatSchemaType } from "@/schemas/chat";

// Get Chat History for current user
export async function GET(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const chatId = url.searchParams.get("chatId");
    if (chatId) {
      // Fetch a single
      console.log(`Fetching chats for currentUserId: ${currentUserId} and chatId: ${chatId}`);

      const query = `SELECT * FROM "chat_history" WHERE "id" = ? AND "userId" = ?;`;
      const result = await db.prepare(query).bind(chatId, currentUserId).first<ChatSchemaType>();
      if (!result) {
        return NextResponse.json({ error: "Chat not found" }, { status: 404 });
      }
      return NextResponse.json(result, { status: 200 });
    }

    console.log("API: Get User Chat History Request:", currentUserId);
    const query = `
      SELECT * FROM "chat_history" WHERE "userId" = ?;
    `;
    const result = await db.prepare(query).bind(currentUserId).all<ChatSchemaType[]>();
    if (!result) {
      console.warn("API: Chat History not found for userId:", currentUserId);
      return NextResponse.json({}, { status: 200 }); // Return null if no Chat History found
    }

    return NextResponse.json(result.results, { status: 200 });
  } catch (error: any) {
    console.error("API: Error fetching Chat History:", error.message);
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const chatId = url.searchParams.get("chatId");
    if (!chatId) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
    }

    console.log(`Deleting chat for currentUserId: ${currentUserId} and chatId: ${chatId}`);

    const query = `DELETE FROM "chat_history" WHERE "id" = ? AND "userId" = ?;`;
    await db.prepare(query).bind(chatId, currentUserId).run();

    return NextResponse.json({ message: "Chat deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("API: Error deleting Chat:", error.message);
    return NextResponse.json({ error: "Failed to delete chat" }, { status: 500 });
  }
}
