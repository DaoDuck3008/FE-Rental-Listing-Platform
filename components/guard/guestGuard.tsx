"use client";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import FullPageLoading from "../ui/fullPageLoading";

interface Props {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: Props) {
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (user) {
      console.log("GuestGuard: User is logged in, redirecting...");
      toast.warning("Bạn không thể truy cập trang này khi đã đăng nhập.");
      router.replace("/");
    }
  }, [user, hydrated, router]);

  // Chờ hydrated
  if (!hydrated) return <FullPageLoading />;

  // Nếu đã đăng nhập, không hiển thị nội dung
  if (user) {
    return null;
  }

  return <>{children}</>;
}
