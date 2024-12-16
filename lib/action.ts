import axios from "axios";

export async function SignUp(formData: any) {
  try {
    const response = await axios.post(
      `${process.env.API_BASE_URL}user/signup`,
      formData
    );

    return {
      ok: true,
      data: response.data, 
    };
  } catch (error: any) {
    if (error.response?.status === 400) {
      return { ok: false, message: "User with that email already exists" };
    }
    return { ok: false, message: "Failed to register user" };
  }
}
