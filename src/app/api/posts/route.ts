import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(req: NextRequest) {
    await dbConnect();
  
    try {
      const searchParams = req.nextUrl.searchParams;
      const searchTerm = searchParams.get("search") || "";
  
      // Tìm theo tiêu đề (không phân biệt hoa thường)
      const posts = await Post.find({
        title: { $regex: searchTerm, $options: "i" },
      }).sort({ createdAt: -1 });
  
      return NextResponse.json({ data: posts }, { status: 200 });
    } catch (error) {
      console.error("Lỗi khi tìm kiếm bài viết:", error);
      return NextResponse.json(
        { message: "Lỗi khi tìm kiếm bài viết" },
        { status: 500 }
      );
    }
  }

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const { title, content } = body;

    const newPost = await Post.create({ title, content });

    return NextResponse.json(
      {
        message: "Đã tạo bài viết thành công!",
        data: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lỗi tạo bài viết:", error);
    return NextResponse.json(
      { message: "Lỗi khi tạo bài viết" },
      { status: 500 }
    );
  }
}
