"use client";

import { Handshake, Menu } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import UserDropdown from "./userDropdown";
import PostButton from "../common/postBtn";

export default function AppHeader() {
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200  bg-background-light/95  backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-900  cursor-pointer"
        >
          <div className="size-8 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">
              <Handshake color="#137fec" size={30} />
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">RentalHome</h2>
        </Link>
        <div className="hidden md:flex flex-1 justify-end items-center gap-8">
          <nav className="flex items-center gap-6">
            <a
              className="text-sm font-semibold hover:text-blue-500 transition-colors"
              href="#"
            >
              Thuê
            </a>
            <a
              className="text-sm font-semibold hover:text-blue-500 transition-colors"
              href="#"
            >
              Mua
            </a>
            <a
              className="text-sm font-semibold hover:text-blue-500 transition-colors"
              href="#"
            >
              Tìm môi giới
            </a>
          </nav>
          <div className="flex gap-3 items-center">
            {!user ? (
              <Link
                href="/login"
                className="flex items-center justify-center rounded-lg h-10 px-4 bg-slate-200 hover:bg-slate-300 text-slate-900 text-sm font-bold transition-colors"
              >
                Đăng nhập
              </Link>
            ) : (
              // 🔹 ĐÃ ĐĂNG NHẬP
              <UserDropdown user={user} onLogout={clearAuth} />
            )}

            {user && <PostButton />}
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-slate-900 ">
            <span className="material-symbols-outlined">
              <Menu size={30} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
