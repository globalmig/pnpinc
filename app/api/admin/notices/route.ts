import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function checkAuth() {
  const session = (await cookies()).get("admin_session");
  return session?.value === "authenticated";
}

// GET: 목록 조회
export async function GET() {
  // if (!checkAuth()) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const { data, error } = await supabase.from("notices").select("*").order("posted_at", { ascending: false });

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
export async function POST(request: NextRequest) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log("Received body:", body);

    const { title, description, posted_at, image_links } = body;

    // 유효성 검사
    if (!title || !description || !posted_at) {
      return NextResponse.json({ error: "title, description, posted_at are required" }, { status: 400 });
    }

    // 데이터 준비
    const insertData = {
      title,
      description,
      posted_at,
      image_links: Array.isArray(image_links) ? image_links : [],
    };

    console.log("Insert data:", insertData);

    const { data, error } = await supabase.from("notices").insert(insertData).select().single();

    if (error) {
      console.error("Supabase INSERT error:", error);
      return NextResponse.json({ error: error.message, details: error }, { status: 500 });
    }

    console.log("Insert success:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Server error", details: String(error) }, { status: 500 });
  }
}
