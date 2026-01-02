"use client";

import {
  ArrowRight,
  ChevronDown,
  Eye,
  EyeOff,
  House,
  Lock,
  Mail,
  Phone,
  RotateCcwKeyIcon,
  User,
  VenusAndMarsIcon,
} from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] =
    useState<boolean>(false);

  return (
    <div className="bg-background-light  text-slate-900  min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-200">
      <div className="w-full max-w-145 bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-slate-900/5 my-4">
        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4 text-primary">
              <div className="size-12 bg-[#e7f2fd] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl p-4">
                  <House size={40} color="#137fec" />
                </span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900  mb-2">
              Đăng Ký Tài Khoản
            </h1>
            <p className="text-slate-500  text-sm sm:text-base">
              Tham gia cộng đồng tìm nhà trọ uy tín nhất.
            </p>
          </div>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 bg-white  border border-slate-200  hover:bg-slate-50  text-slate-700  font-bold py-3 px-4 rounded-lg transition-all duration-200 h-12">
              <img className="w-6 h-6" src="/GoogleLogo.png" />
              <span>Tiếp tục với Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-white  border border-slate-200  hover:bg-slate-50  text-slate-700 font-bold py-3 px-4 rounded-lg transition-all duration-200 h-12">
              <img className="w-6 h-6" src="/FacebookLogo.png" />
              <span>Tiếp tục với Facebook</span>
            </button>
          </div>
          <div className="relative flex py-8 items-center">
            <div className="grow border-t border-slate-200 "></div>
            <span className="shrink-0 mx-4 text-slate-400  text-sm">
              Hoặc đăng ký bằng email
            </span>
            <div className="grow border-t border-slate-200 "></div>
          </div>
          <form action="#" className="space-y-5">
            <div className="space-y-1.5">
              <label
                className="block text-sm font-semibold text-slate-700 "
                htmlFor="fullname"
              >
                Tên đầy đủ
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">
                    <User />
                  </span>
                </div>
                <input
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50  border-transparent focus:bg-white ring-1 ring-slate-200  focus:ring-2 focus:ring-primary rounded-lg text-slate-900  placeholder-slate-400 transition-all text-sm font-medium"
                  id="fullname"
                  name="fullname"
                  placeholder="Nguyễn Văn A"
                  type="text"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  className="block text-sm font-semibold text-slate-700 "
                  htmlFor="gender"
                >
                  Giới tính
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">
                      <VenusAndMarsIcon />
                    </span>
                  </div>
                  <select
                    className="appearance-none block w-full pl-10 pr-8 py-3 bg-slate-50  border-transparent  focus:bg-white  ring-1 ring-slate-200  focus:ring-2 focus:ring-primary rounded-lg text-slate-900  transition-all text-sm font-medium"
                    id="gender"
                    name="gender"
                  >
                    <option value="">Chọn</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <span className="material-symbols-outlined text-[20px]">
                      <ChevronDown />
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  className="block text-sm font-semibold text-slate-700 "
                  htmlFor="phone"
                >
                  Số điện thoại
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">
                      <Phone />
                    </span>
                  </div>
                  <input
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50  border-transparent  focus:bg-white  ring-1 ring-slate-200 focus:ring-2 focus:ring-primary rounded-lg text-slate-900  placeholder-slate-400 transition-all text-sm font-medium"
                    id="phone"
                    name="phone"
                    placeholder="09xx..."
                    type="tel"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label
                className="block text-sm font-semibold text-slate-700 "
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">
                    <Mail />
                  </span>
                </div>
                <input
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50  border-transparent  focus:bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-primary rounded-lg text-slate-900  placeholder-slate-400 transition-all text-sm font-medium"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label
                className="block text-sm font-semibold text-slate-700 "
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    <Lock />
                  </span>
                </div>
                <input
                  className="block w-full pl-10 pr-10 py-3 bg-slate-50  border-transparent  focus:bg-white  ring-1 ring-slate-200  focus:ring-2 focus:ring-primary rounded-lg text-slate-900  placeholder-slate-400 transition-all text-sm font-medium"
                  id="password"
                  name="password"
                  placeholder="Tối thiểu 8 ký tự"
                  type={visiblePassword ? "text" : "password"}
                />
                {!visiblePassword && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600  cursor-pointer"
                    type="button"
                    onClick={() => setVisiblePassword(true)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      <EyeOff />
                    </span>
                  </button>
                )}
                {visiblePassword && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600  cursor-pointer"
                    type="button"
                    onClick={() => setVisiblePassword(false)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      <Eye />
                    </span>
                  </button>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <label
                className="block text-sm font-semibold text-slate-700 "
                htmlFor="confirm_password"
              >
                Nhập lại mật khẩu
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    <RotateCcwKeyIcon />
                  </span>
                </div>
                <input
                  className="block w-full pl-10 pr-10 py-3 bg-slate-50  border-transparent  focus:bg-white  ring-1 ring-slate-200  focus:ring-2 focus:ring-primary rounded-lg text-slate-900  placeholder-slate-400 transition-all text-sm font-medium"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="Nhập lại mật khẩu"
                  type={visibleConfirmPassword ? "text" : "password"}
                />
                {!visibleConfirmPassword && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    type="button"
                    onClick={() => setVisibleConfirmPassword(true)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      <Eye />
                    </span>
                  </button>
                )}

                {visibleConfirmPassword && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    type="button"
                    onClick={() => setVisibleConfirmPassword(false)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      <EyeOff />
                    </span>
                  </button>
                )}
              </div>
            </div>
            <button
              className="w-full flex items-center justify-center cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-lg transition-colors shadow-md shadow-blue-500/20 mt-2"
              type="submit"
            >
              <span className="truncate">Đăng ký tài khoản</span>
              <span className="material-symbols-outlined ml-2 text-sm">
                <ArrowRight />
              </span>
            </button>
            <p className="text-xs text-center text-slate-400 mt-4 leading-relaxed px-4">
              Bằng việc đăng ký, bạn đồng ý với
              <a
                className="underline hover:text-blue transition-colors"
                href="#"
              >
                Điều khoản dịch vụ
              </a>
              và
              <a
                className="underline hover:text-primary transition-colors"
                href="#"
              >
                Chính sách bảo mật
              </a>
              của chúng tôi.
            </p>
          </form>
          <div className="mt-8 text-center pt-6 border-t border-slate-100 ">
            <p className="text-sm font-medium text-slate-600 ">
              Đã có tài khoản?
              <a
                className="text-primary hover:text-blue-600 font-bold ml-1 transition-colors"
                href="#"
              >
                Đăng nhập
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
