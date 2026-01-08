"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useClickOutside } from "@/hooks/useClickOutside";
import { logout } from "@/services/auth.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ChevronDown, User } from "lucide-react";

interface Props {
  user: {
    id: string;
    fullName: string;
    role: string;
    avatar?: string;
  };
  onLogout: () => void;
}

export default function UserDropdown({ user, onLogout }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useClickOutside(ref, () => {
    setOpen(false);
  });

  const handleLogout = async () => {
    try {
      const result = await logout();
    } catch (error: any) {
      if (error.status === 401) {
        toast.warning("Bạn chưa đăng nhập");
      } else {
        toast.error("Có lỗi xảy ra!");
        console.error(">>> Logout error: ", error);
      }
    } finally {
      onLogout;
      toast.success("Đăng xuất thành công!");
      window.location.href = "/";
    }
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-100 transition"
      >
        <div className="h-8 w-8 rounded-full bg-slate-300 flex items-center justify-center text-sm font-bold">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.fullName}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-slate-600" />
          )}
        </div>
        <span className="text-sm font-semibold text-slate-900">
          {user.fullName}
        </span>
        <span>
          <ChevronDown />
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-slate-200 z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-slate-100"
          >
            Trang cá nhân
          </Link>

          <Link
            href="/post/create"
            className="block px-4 py-2 text-sm hover:bg-slate-100"
          >
            Đăng tin
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
