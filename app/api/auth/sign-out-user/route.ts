import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  try {
    cookieStore.delete("token");
    cookieStore.delete("email");
    cookieStore.delete("role");
    cookieStore.delete("user_id");
    cookieStore.delete("first_name");
    cookieStore.delete("last_name");
    cookieStore.delete("_class");
    cookieStore.delete("age");
    cookieStore.delete("full_name");
    cookieStore.delete("session_id");
    return NextResponse.json(
      { message: "User Logged Out!" },
      { status: 200, statusText: "OK" }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: 500, statusText: "Something went wrong" }
    );
  }
}
