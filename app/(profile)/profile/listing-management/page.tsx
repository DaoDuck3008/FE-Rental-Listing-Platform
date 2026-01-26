"use client";

import PostButton from "@/components/common/postBtn";
import ListingTableBody from "@/components/listing/listingTableBody";
import { getMyListings } from "@/services/listing.api";
import {
  ArrowDownWideNarrow,
  Search,
  ChevronsDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface Listing {
  id: string;
  title: string;
  price: string;
  address: string;
  views: number;
  status: string;
  created_at: string;
  images: { image_url: string }[];
}

interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export default function ListingManagementPage() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [inputLimit, setInputLimit] = useState<string>("10");
  const [page, setPage] = useState<number>(1);
  const [listings, setListings] = useState<Listing[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  // Debounce limit input
  useEffect(() => {
    const timer = setTimeout(() => {
      const val = parseInt(inputLimit);
      if (!isNaN(val) && val >= 1 && val <= 10) {
        setLimit(val);
        setPage(1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputLimit]);

  useEffect(() => {
    const callMyListings = async () => {
      try {
        const result = await getMyListings({ limit, page });
        const { data, pagination } = result;
        setListings(data);
        setPagination(pagination);
      } catch (error: any) {
        const res = error.response?.data;
        if (res?.error === "UNAUTHORIZED" || res?.error === "FORBIDDEN") {
          toast.error(res.message);
        } else if (res?.error === "DATABASE_ERROR") {
          toast.error("Có lỗi ở phía cơ sở dữ liệu");
        } else {
          toast.error("Có lỗi xảy ra.");
          console.error(error);
        }
      }
    };
    callMyListings();
  }, [page, limit]);

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
                Tất cả ({pagination?.totalItems || 0})
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
                  {listings.length > 0 ? (
                    listings.map((listing) => (
                      <ListingTableBody
                        key={listing.id}
                        id={listing.id}
                        title={listing.title}
                        address={listing.address}
                        price={Number(listing.price)}
                        views={listing.views}
                        status={listing.status}
                        createdAt={listing.created_at}
                        img_url={listing.images[0]?.image_url}
                      />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-slate-500"
                      >
                        Chưa có tin đăng nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 gap-4 border-t border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <p className="text-sm text-slate-500 whitespace-nowrap">
                  Hiển thị{" "}
                  {pagination
                    ? (pagination.page - 1) * pagination.limit + 1
                    : 0}{" "}
                  -{" "}
                  {pagination
                    ? Math.min(
                        pagination.page * pagination.limit,
                        pagination.totalItems
                      )
                    : 0}{" "}
                  trong {pagination?.totalItems || 0} tin | Mỗi trang:
                </p>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={inputLimit}
                  onChange={(e) => setInputLimit(e.target.value)}
                  onBlur={() => {
                    const val = parseInt(inputLimit);
                    if (isNaN(val) || val < 1) setInputLimit("1");
                    else if (val > 10) setInputLimit("10");
                  }}
                  className="w-16 h-8 px-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-1.5">
                {/* First Page */}
                <button
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  title="Trang đầu"
                >
                  <ChevronsLeft size={16} />
                </button>

                {/* Prev */}
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-1 mx-1">
                  {Array.from(
                    { length: pagination?.totalPages || 0 },
                    (_, i) => i + 1
                  )
                    .filter(
                      (p) =>
                        Math.abs(p - page) <= 1 ||
                        p === 1 ||
                        p === pagination?.totalPages
                    )
                    .map((p, index, array) => (
                      <div key={p} className="flex items-center">
                        {index > 0 && array[index - 1] !== p - 1 && (
                          <span className="text-slate-400 px-1">...</span>
                        )}
                        <button
                          onClick={() => setPage(p)}
                          className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                            page === p
                              ? "bg-blue-500 text-white shadow-md"
                              : "text-slate-600 hover:bg-white hover:border-slate-300 border border-transparent font-medium"
                          }`}
                        >
                          {p}
                        </button>
                      </div>
                    ))}
                </div>

                {/* Next */}
                <button
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(prev + 1, pagination?.totalPages || 1)
                    )
                  }
                  disabled={page === (pagination?.totalPages || 1)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Last Page */}
                <button
                  onClick={() => setPage(pagination?.totalPages || 1)}
                  disabled={page === (pagination?.totalPages || 1)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  title="Trang cuối"
                >
                  <ChevronsRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
