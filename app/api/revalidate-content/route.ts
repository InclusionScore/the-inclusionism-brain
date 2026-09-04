import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const tags = ["editorial-feeds", "essays-feed", "podcast-feed"];

function authorized(request: NextRequest) {
  const secret = process.env.CONTENT_REVALIDATE_SECRET;
  if (!secret) return false;
  const headerToken = request.headers.get("x-revalidate-secret");
  return headerToken === secret;
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  tags.forEach((tag) => revalidateTag(tag));
  return NextResponse.json({ revalidated: true, tags });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
