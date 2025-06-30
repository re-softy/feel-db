"use server";

import { cookies } from "next/headers";
import axios from "axios";

export async function voteEmotionAction(
  collectionId: string,
  emotionIds: number[]
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return {
        success: false,
        error: "Authentication is required to vote.",
      };
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}vote-emotions`,
      {
        movie_id: collectionId,
        emotion_ids: emotionIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Failed to submit vote",
    };
  }
}
