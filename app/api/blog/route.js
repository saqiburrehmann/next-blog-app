import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db.js";
import createBlog from "@/lib/controllers/blogController";

export async function GET(request) {
  await connectDB();
  return NextResponse.json({ msg: "API working" });
}

// create blog
export async function POST(request) {
  await connectDB();

  const result = await createBlog(request);
  return NextResponse.json(result);
}
