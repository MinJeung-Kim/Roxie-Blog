import { createPost, getAllPosts } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return getAllPosts().then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const title = form.get("title")?.toString();
  const description = form.get("description")?.toString();
  const content = form.get("content")?.toString();
  const category = form.get("category")?.toString();
  const file = form.get("file") as Blob;
  if (!content || !title || !category || !description || !file) {
    return new Response("Bad Request", { status: 400 });
  }

  return createPost(title, description, content, category, file) //
    .then((data) => NextResponse.json(data));
}
