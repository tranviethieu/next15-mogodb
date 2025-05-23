// pages/index.tsx
"use client";
import { userAtom } from "@/store/atoms/user";
import { useAtom } from "jotai";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [content, setContent] = useState("");
  const [user] = useAtom(userAtom);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1
        onClick={() => {
          router.push("/user");
        }}
      >
        Tạo bài viết {user?.username}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Nội dung"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
}
