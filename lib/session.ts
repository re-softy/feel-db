import "server-only";
import { cookies } from "next/headers";

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = cookies();

  cookieStore.set("auth_token", userId, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token");
  return authToken ? authToken.value : null;
}

export async function deleteSession() {
  const cookieStore = cookies()
  cookieStore.delete('auth_token')
}