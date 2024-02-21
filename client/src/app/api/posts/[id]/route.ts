import { NextRequest, NextResponse } from "next/server";
import { getFindPostById } from "@/service/posts";

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  console.log("GET : ", context);

  return getFindPostById(context.params.id).then((data) =>
    NextResponse.json(data)
  );
}
