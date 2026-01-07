"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-6xl font-bold text-slate-800">404</h1>
      <p className="text-slate-500">
        Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa
      </p>

      <Link
        href="/"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700 transition"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
