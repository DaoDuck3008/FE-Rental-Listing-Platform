"use client";

import React from "react";
import { Heart } from "lucide-react";

export default function MyFavoritesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-50 rounded-2xl">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Danh sách yêu thích của tôi</h1>
          <p className="text-slate-500 text-sm">Quản lý và so sánh các bài đăng bạn đã lưu</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-20 flex flex-col items-center justify-center text-center">
        <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
           <Heart className="w-10 h-10 text-slate-200" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Đang được thiết kế</h3>
        <p className="text-slate-500 max-w-sm mt-2">
          Trang quản lý chi tiết danh sách yêu thích đang trong quá trình hoàn thiện. 
          Vui lòng quay lại sau để trải nghiệm đầy đủ các tính năng so sánh và lọc.
        </p>
      </div>
    </div>
  );
}
