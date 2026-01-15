import {
  Bell,
  Handshake,
  Heart,
  LayoutPanelTop,
  LogOut,
  Newspaper,
  User,
} from "lucide-react";

export default function UserSidebar() {
  return (
    <aside
      className="fixed top-0 left-0 h-full w-72 bg-white border-r border-[#cfdbe7] flex flex-col z-50 transition-transform duration-300 -translate-x-full peer-checked:translate-x-0 lg:translate-x-0 shadow-2xl lg:shadow-none overflow-y-auto no-scrollbar peer-checked-desktop:translate-x-0"
      id="sidebar"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10  rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/30">
              <span className="material-symbols-outlined">
                <Handshake color="#137fec" size={30} />
              </span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-blue-500 whitespace-nowrap">
              Rental House
            </span>
          </div>
          <label
            className="lg:hidden text-slate-400 cursor-pointer hover:text-red-500 transition-colors"
            htmlFor="mobile-menu-toggle"
          >
            <span className="material-symbols-outlined">close</span>
          </label>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-blue-500/20 shrink-0"></div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-[#0d141b] text-sm font-bold leading-tight truncate">
                Nguyễn Văn A
              </h1>
              <p className="text-[#4c739a] text-xs font-medium truncate">
                Chủ cho thuê
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500 text-white shadow-md shadow-blue-500/20 group transition-all"
              href="#"
            >
              <span className="material-symbols-outlined fill-1">
                <LayoutPanelTop />
              </span>
              <span className="text-sm font-semibold whitespace-nowrap">
                Tổng quan
              </span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4c739a] hover:bg-slate-100 transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined group-hover:text-blue-500 transition-colors">
                <Newspaper />
              </span>
              <span className="text-sm font-semibold whitespace-nowrap">
                Quản lý bài đăng
              </span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4c739a] hover:bg-slate-100 transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined group-hover:text-blue-500 transition-colors">
                <User />
              </span>
              <span className="text-sm font-semibold whitespace-nowrap">
                Hồ sơ cá nhân
              </span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4c739a] hover:bg-slate-100 transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined group-hover:text-blue-500 transition-colors">
                <Heart />
              </span>
              <span className="text-sm font-semibold whitespace-nowrap">
                Tin đã lưu
              </span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4c739a] hover:bg-slate-100 transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined group-hover:text-blue-500 transition-colors">
                <Bell />
              </span>
              <span className="text-sm font-semibold whitespace-nowrap">
                Thông báo
              </span>
            </a>
          </nav>
        </div>
      </div>
      <div className="mt-auto p-6 border-t border-[#cfdbe7] flex flex-col gap-2 relative">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors group">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
            <LogOut />
          </span>
          <span className="text-sm font-bold whitespace-nowrap">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
