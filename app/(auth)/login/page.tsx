"use client";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="bg-background-light font-display text-[#0d141b]  min-h-screen flex flex-col">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-120 bg-white  rounded-xl shadow-lg border border-slate-100  overflow-hidden">
          <div className="pt-8 px-8 pb-2 text-center">
            <h1 className="text-[#0d141b]  text-[28px] font-bold leading-tight mb-2">
              Đăng nhập
            </h1>
            <p className="text-slate-500  text-sm">
              Chào mừng bạn trở lại! Vui lòng nhập thông tin.
            </p>
          </div>
          <div className="p-8 pt-6">
            <form action="#" className="flex flex-col gap-5" method="POST">
              <label className="flex flex-col">
                <span className="text-[#0d141b]  text-sm font-medium leading-normal pb-2">
                  Đăng nhập bằng Email
                </span>
                <div className="relative">
                  <input
                    className="form-input w-full rounded-lg text-[#0d141b]  border border-[#cfdbe7]  bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-12 px-4 pl-11 text-base placeholder:text-[#94a3b8]"
                    placeholder="Nhập email hoặc số điện thoại"
                    type="email"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">
                      <Mail />
                    </span>
                  </div>
                </div>
              </label>
              <label className="flex flex-col">
                <span className="text-[#0d141b]  text-sm font-medium leading-normal pb-2">
                  Mật khẩu
                </span>
                <div className="relative flex w-full items-stretch rounded-lg">
                  <input
                    className="form-input w-full rounded-lg rounded-r-none border border-[#cfdbe7]  border-r-0 bg-slate-50  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:z-10 h-12 px-4 pl-11 text-[#0d141b]  placeholder:text-[#94a3b8]"
                    placeholder="Nhập mật khẩu"
                    type={visiblePassword ? "text" : "password"}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex items-center pointer-events-none z-20">
                    <span className="material-symbols-outlined text-[20px]">
                      <Lock />
                    </span>
                  </div>
                  {visiblePassword && (
                    <button
                      className="flex items-center justify-center px-3 rounded-r-lg border border-l-0 border-[#cfdbe7]  bg-slate-50  text-slate-400 hover:text-slate-600  transition-colors"
                      type="button"
                      onClick={() => setVisiblePassword(false)}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        <Eye />
                      </span>
                    </button>
                  )}

                  {!visiblePassword && (
                    <button
                      className="flex items-center justify-center px-3 rounded-r-lg border border-l-0 border-[#cfdbe7]  bg-slate-50  text-slate-400 hover:text-slate-600  transition-colors"
                      type="button"
                      onClick={() => setVisiblePassword(true)}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        <EyeOff />
                      </span>
                    </button>
                  )}
                </div>
              </label>
              <div className="flex flex-wrap items-center justify-between gap-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    className="custom-checkbox h-5 w-5 rounded border-[#cfdbe7]  border-2 bg-transparent text-blue-500 checked:bg-blue-500 checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all"
                    type="checkbox"
                  />
                  <span className="text-[#0d141b]  text-sm font-medium group-hover:text-blue-500 transition-colors">
                    Ghi nhớ đăng nhập
                  </span>
                </label>
                <Link
                  className="text-blue-500 text-sm font-semibold hover:underline decoration-2 underline-offset-2"
                  href="#"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <button className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <span>Đăng nhập</span>
              </button>
            </form>
            <div className="relative flex py-6 items-center">
              <div className="grow border-t border-slate-200 "></div>
              <span className="shrink-0 mx-4 text-slate-400 text-sm font-medium">
                Hoặc
              </span>
              <div className="grow border-t border-slate-200 "></div>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center cursor-pointer justify-center gap-3 bg-white  border border-slate-200  hover:bg-slate-50  text-slate-700  font-bold py-3 px-4 rounded-lg transition-all duration-200 h-12">
                <img className="w-6 h-6" src="/GoogleLogo.png" />
                <span>Tiếp tục với Google</span>
              </button>
              <button className="w-full flex items-center cursor-pointer justify-center gap-3 bg-white  border border-slate-200  hover:bg-slate-50  text-slate-700 font-bold py-3 px-4 rounded-lg transition-all duration-200 h-12">
                <img className="w-6 h-6" src="/FacebookLogo.png" />
                <span>Tiếp tục với Facebook</span>
              </button>
            </div>
            <div className="mt-8 text-center">
              <p className="text-slate-600  text-sm">
                Chưa có tài khoản?
                <Link
                  className="text-blue-500 font-bold hover:underline decoration-2 underline-offset-2 ml-1"
                  href="/register"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
