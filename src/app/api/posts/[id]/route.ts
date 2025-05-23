import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

// UPDATE (PUT)
export async function PUT(req: NextRequest) {
  await dbConnect();

  const id = req.nextUrl.searchParams.get("id");

  try {
    const body = await req.json();
    const updatedPost = await Post.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedPost) {
      return NextResponse.json(
        { message: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Cập nhật thành công",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Lỗi cập nhật bài viết:", error);
    return NextResponse.json({ message: "Lỗi khi cập nhật" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: NextRequest) {
  await dbConnect();

  const id = req.nextUrl.pathname.split("/").pop(); // Lấy id từ URL

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        { message: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Đã xoá bài viết thành công" });
  } catch (error) {
    console.error("Lỗi xoá bài viết:", error);
    return NextResponse.json({ message: "Lỗi khi xoá" }, { status: 500 });
  }
}
