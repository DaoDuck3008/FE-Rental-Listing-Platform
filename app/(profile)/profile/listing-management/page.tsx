"use client";

import PostButton from "@/components/common/postBtn";
import ListingTableBody from "@/components/listing/listingTableBody";
import {
  ArrowDownWideNarrow,
  Search,
  ChevronsDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ListingManagementPage() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  return (
    <>
      <main className="flex-1 w-full max-w-360 mx-auto p-4 lg:p-8">
        <div className="gap-8 h-full">
          {/* <!-- Page Heading & Actions --> */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-slate-900 text-3xl font-extrabold leading-tight tracking-tight">
                Quản lý tin đăng
              </h1>
              <p className="text-slate-500 text-base font-normal">
                Xem thống kê và điều chỉnh các bài đăng cho thuê của bạn.
              </p>
            </div>
            <PostButton title=" + Đăng tin mới" />
          </div>

          {/* <!-- Search & Filter Area --> */}
          <div className="p-4 mt-2 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {/* <!-- Search --> */}
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined">
                  <Search />
                </span>
                <input
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm transition-all"
                  placeholder="Tìm kiếm theo tiêu đề, địa chỉ hoặc mã tin..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
              {/* <!-- Filters Group --> */}
              <div className="flex gap-3 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                <div className="min-w-40">
                  <div className="relative">
                    <select className="w-full h-11 pl-3 pr-10 hover:bg-blue-500 hover:text-white appearance-none rounded-lg bg-slate-50 border border-slate-200 text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm font-medium cursor-pointer">
                      <option>Tất cả trạng thái</option>
                      <option>Đang hiển thị</option>
                      <option>Đã hết hạn</option>
                      <option>Đã ẩn</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined pointer-events-none">
                      <ChevronsDown />
                    </span>
                  </div>
                </div>
                <div className="min-w-40">
                  <div className="relative">
                    <select className="w-full h-11 pl-3 pr-10 hover:bg-blue-500 hover:text-white appearance-none rounded-lg bg-slate-50 border border-slate-200 text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm font-medium cursor-pointer">
                      <option>Sắp xếp: Mới nhất</option>
                      <option>Giá: Cao đến thấp</option>
                      <option>Lượt xem nhiều nhất</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined pointer-events-none">
                      <ArrowDownWideNarrow />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Quick Filter Chips --> */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
              <button className="px-3 py-1.5 rounded-full bg-slate-800 text-white text-xs font-semibold transition-colors">
                Tất cả (12)
              </button>
              <button className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-semibold transition-colors">
                Đang hiển thị (5)
              </button>
              <button className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-semibold transition-colors">
                Đã hết hạn (3)
              </button>
              <button className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-semibold transition-colors">
                Bị từ chối (0)
              </button>
            </div>
          </div>

          {/* Table Container with Horizontal Scroll */}
          <div className="mt-3 rounded-xl bg-white border border-slate-200 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 min-w-75">
                      Tin đăng
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                      Giá thuê
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                      Thống kê
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <ListingTableBody
                    title="Phòng trọ khép kín gần ĐH Bách Khoa, đầy đủ tiện nghi"
                    address="Đống Đa, Hà Nội"
                    price={3000000}
                    views={125}
                    status="PUBLISHED"
                  />
                  <ListingTableBody
                    title="Phòng trọ khép kín gần ĐH Bách Khoa, đầy đủ tiện nghi"
                    address="Đống Đa, Hà Nội"
                    price={3000000}
                    views={12500}
                    status="PUBLISHED"
                  />
                  <ListingTableBody
                    title="Phòng trọ khép kín gần ĐH Bách Khoa, đầy đủ tiện nghi"
                    address="Đống Đa, Hà Nội"
                    price={3000000}
                    views={125}
                    status="PUBLISHED"
                  />
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/50">
              <p className="text-sm text-slate-500">
                Hiển thị
                <span className="font-bold text-slate-700">1-4</span> trong
                <span className="font-bold text-slate-700">12</span> tin
              </p>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="material-symbols-outlined text-[18px]">
                    <ChevronLeft />
                  </span>
                </button>
                <button className="w-8 h-8 rounded-lg bg-blue-500 text-white text-sm font-bold shadow-sm">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors">
                  3
                </button>
                <span className="text-slate-400">...</span>
                <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-white">
                  <span className="material-symbols-outlined text-[18px]">
                    <ChevronRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
