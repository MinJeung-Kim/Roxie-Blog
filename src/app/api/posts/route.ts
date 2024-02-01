import { getFeaturedPosts } from "@/service/posts";
import { NextResponse } from "next/server";

export async function GET() {
  return getFeaturedPosts().then((data) => NextResponse.json(data));
}
