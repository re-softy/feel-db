import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import axios from "axios";

export async function GET() {
  const token = cookies().get("auth_token")?.value;
  console.log("Auth token from cookie:", token);

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    console.log("Response from /user/me backend:", response.data);
    return NextResponse.json({ user: response.data });
  } catch (error: any) {
    console.error("Error fetching user from Laravel backend:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
