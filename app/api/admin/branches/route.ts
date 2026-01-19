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
    const { data, error } = await supabase.from("branches").select("*").order("created_at", { ascending: false });

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

    const { name, location, phone, map_link } = body;

    // 유효성 검사
    if (!name || !location || !phone || !map_link) {
      return NextResponse.json({ error: "name, location, phone, map_link are required" }, { status: 400 });
    }

    // 데이터 준비
    const insertData = {
      name,
      location,
      phone,
      map_link,
    };

    console.log("Insert data:", insertData);

    const { data, error } = await supabase.from("branches").insert(insertData).select().single();

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
