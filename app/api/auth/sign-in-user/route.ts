import { SERVER_URL } from "@/app/utils/vars";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
//
export async function POST(req: NextRequest) {
  const { name, pass } = await req.json();
  try {
    const res1 = await fetch(`${SERVER_URL}/login`, {
    // const res1 = await fetch(`https://wificombat-staging-backend-production.up.railway.app/login`, {
      method: "POST",

      body: JSON.stringify({ email: name, password: pass }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res1.json();
    let res;
    if (data?.success === false) {
      res = NextResponse.json(
        {
          message: data?.message,
        },
        {
          status: res1.status,
        }
      );
    } else {
      res = NextResponse.json({
        user_id: data?.data?.user?.id,
        first_name: data?.data?.user?.first_name,
        last_name: data?.data?.user?.last_name,
        age: data?.data?.user?.age,
        _class: data?.data?.user?._class,
        email: data?.data?.user?.email,
        role: data?.data?.user?.role,
        is_active: data?.data?.user?.is_active,
        ...data?.data,
      });
      res.cookies.set("token", data?.data?.token, {
        httpOnly: true,
        secure: true,
        priority: "high",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    }
    return res;
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
