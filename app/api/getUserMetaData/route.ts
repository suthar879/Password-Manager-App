import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();

  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  return NextResponse.json(user.privateMetadata);
}