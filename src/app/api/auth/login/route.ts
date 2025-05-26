import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

// Tạo `Uint8Array` từ secret
const JWT_SECRET = new TextEncoder().encode("secret");

export async function POST(req: NextRequest) {
  await dbConnect();
  const { username, password } = await req.json();

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: "Sai tài khoản hoặc mật khẩu" },
      { status: 401 }
    );
  }

  // ✅ Tạo JWT bằng jose///
  const token = await new SignJWT({
    id: user._id.toString(),
    role: user.role,
    username: user.username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(JWT_SECRET);

  const res = NextResponse.json({ message: "Đăng nhập thành công" });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return res;
}
