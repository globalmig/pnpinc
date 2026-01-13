import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

function checkAuth() {
  const session = cookies().get("admin_session");
  return session?.value === "authenticated";
}

// GET: 목록 조회
export async function GET() {
  // if (!checkAuth()) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase GET error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: 새 항목 생성
// POST: 새 항목 생성
export async function POST(request: NextRequest) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const title = String(body?.title ?? "").trim();

    // ✅ image_links: string | string[] | {url}[] 등 뭐가 와도 string[]로 정리
    const raw = body?.image_links ?? body?.image_link ?? body?.image ?? body?.images;

    const image_links: string[] = Array.isArray(raw) ? raw.map((v) => (typeof v === "string" ? v : v?.url)).filter(Boolean) : typeof raw === "string" ? [raw] : [];

    if (!title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    // ✅ “없어도 되는” 정책이면 아래를 주석 처리하고, 허용 정책이면 유지
    if (image_links.length === 0) {
      return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
    }

    const { data, error } = await supabase.from("gallery").insert({ title, image_links }).select().single();

    if (error) {
      return NextResponse.json({ error: error.message, details: error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: String(error) }, { status: 500 });
  }
}
