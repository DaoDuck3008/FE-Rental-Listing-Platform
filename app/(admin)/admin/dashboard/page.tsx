"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { api } from "@/services/api";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { DashboardCharts } from "@/components/admin/dashboard/DashboardCharts";
import { DashboardLists } from "@/components/admin/dashboard/DashboardLists";
import { Search, Bell } from "lucide-react";
import Image from "next/image";

// Fetcher for SWR
const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

export default function DashboardAdminPage() {
  const { data: overview, error: errOverview, isLoading: loadingOverview } = useSWR("/api/admin/dashboard/overview", fetcher);
  const { data: growthCharts, error: errCharts, isLoading: loadingCharts } = useSWR("/api/admin/dashboard/charts", fetcher);
  const { data: listingsByType, error: errPie, isLoading: loadingPie } = useSWR("/api/admin/dashboard/pie-chart", fetcher);
  const { data: lists, error: errLists, isLoading: loadingLists } = useSWR("/api/admin/dashboard/recent", fetcher);

  const isLoading = loadingOverview || loadingCharts || loadingPie || loadingLists;
  const error = errOverview || errCharts || errPie || errLists;

  // Fallback / Skeleton can be implemented later
  if (isLoading) return <div className="p-8 text-center text-slate-500">Đang tải dữ liệu dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Lỗi khi tải dữ liệu dashboard: {error.message}</div>;

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden relative">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf3] dark:border-slate-700 bg-white dark:bg-[#1a202c] px-6 py-3 shrink-0 z-10 lg:hidden">
        {/* Mobile search / Actions spacing */}
      </header>

      {/* Top Header Actions (Assuming Search is needed, maybe just UI from HTML) */}
      <div className="hidden lg:flex items-center justify-between whitespace-nowrap px-6 py-3 shrink-0 z-10 w-full mb-4">
        <label className="flex flex-col min-w-40 !h-10 max-w-96 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-[#4c739a] flex border-none bg-[#f0f4f8] dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
              <Search className="w-5 h-5" />
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d141b] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f0f4f8] dark:bg-slate-800 h-full placeholder:text-[#4c739a] px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
              placeholder="Tìm kiếm bài đăng, người dùng..."
            />
          </div>
        </label>
        
        <div className="flex flex-1 justify-end gap-4 items-center">
          <button className="flex items-center justify-center rounded-full size-10 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0d141b] dark:text-white relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a202c]"></span>
          </button>
          <div className="hidden md:flex bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-primary/20" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBpLNA-we0c4ZvkigkqTsw_1pr4YM39AtyvKG4XcQA6Z4tZ24ngF2snwBq-5iPsB3xa5xOxt2buVnt_Dx7ArwVZL05B4rlxuEfyQ6GXZXU5uoWHRdU3YNJXkfu0AekzIcRcgJSXeNpIJ2F5iUAeKAnqp1xr_pVQVB39HqPwb2srZGM04a08y9u_MD3GeemHzmJTzc7X2M0-BAzbZtKC1xctCEKYnc2iy_CZY4scF_hLxEGOzyJwOWTu_oo7jBA7WBhQAQsSJwtFgEsM")' }}
          ></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6 md:gap-8 pb-10">
          
          {/* Page Heading */}
          <div className="flex flex-col gap-1">
            <h2 className="text-[#0d141b] dark:text-white text-2xl md:text-3xl font-extrabold leading-tight tracking-tight">
              Tổng quan hệ thống
            </h2>
            <p className="text-[#4c739a] text-sm md:text-base font-medium">
              Chào mừng trở lại, Quản trị viên.
            </p>
          </div>

          <DashboardStats overview={overview} />
          
          <DashboardCharts charts={{
            postGrowth: growthCharts?.postGrowth,
            userGrowth: growthCharts?.userGrowth,
            listingsByType: listingsByType
          }} />
          
          <DashboardLists lists={lists} />

        </div>
      </div>
    </div>
  );
}
