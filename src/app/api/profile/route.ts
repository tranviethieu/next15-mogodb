// app/api/auth/profile/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "secret");

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    // payload sẽ chứa { id, role, iat, exp }
    // Bạn có thể truy vấn MongoDB lấy user từ payload.id

    return NextResponse.json({
      username: payload.username,
      role: payload.role,
      email: payload.email,
      _id: payload._id,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Token không hợp lệ" },
      { status: 401 }
    );
  }
}
