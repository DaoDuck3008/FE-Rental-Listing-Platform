"use client";

import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-bold">403 – Không có quyền truy cập</h1>

      <button
        className="rounded-xl transition hover:-translate-y-1 cursor-pointer bg-blue-600 px-4 py-2 text-white"
        onClick={() => {
          router.replace("/");
        }}
      >
        Quay về trang chủ
      </button>
    </div>
  );
}
