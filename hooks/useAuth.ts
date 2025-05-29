"use server";

import { cookies } from "next/headers";

export async function checkAuthStatus() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  return !!token;
}
