import { cookies } from "next/headers";

export async function assertAdmin() {
  const c = (await cookies()).get("admin")?.value;
  if (c !== "1") {
    const err = new Error("Unauthorized");
    // @ts-ignore
    err.status = 401;
    throw err;
  }
}
