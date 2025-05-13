import { connectDB } from "@/lib/config/db";
import Email from "@/lib/models/emailModel";
import { NextResponse } from "next/server";

await connectDB();

// POST: Save new email
export async function POST(request) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (!email) {
    return NextResponse.json(
      { success: false, msg: "Email is required" },
      { status: 400 }
    );
  }

  await Email.create({ email });

  return NextResponse.json({ success: true, msg: "Email Subscribed" });
}

// GET: Return all emails
export async function GET() {
  try {
    const subscriptions = await Email.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, subscriptions });
  } catch (err) {
    return NextResponse.json(
      { success: false, msg: "Failed to fetch subscriptions" },
      { status: 500 }
    );
  }
}

// DELETE: Remove email by ID
// DELETE: Remove email by ID
export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");  // Fixed typo here
  await Email.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Email Deleted" });
}

