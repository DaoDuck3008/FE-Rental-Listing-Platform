"use client";

import Dropdown from "@/components/common/dropdown";
import PostButton from "@/components/common/postBtn";
import RecommendCard from "@/components/homePage/recommendCard";
import ListingCard from "@/components/listing/listingCard";
import { getPublicListings } from "@/services/listing.api";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  BanknoteX,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { formatVietnamesePrice } from "@/utils";

export default function Home() {
  const [listings, setListings] = useState<any>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const result = await getPublicListings({
          page: 1,
          limit: 3,
          sort_by: "DATE_DESC",
        });
        setListings(result.data);
      } catch (error: any) {
        const res = error.response.data;
        if (!res) {
          toast.error("Lỗi không xác định. Vui lòng thử lại sau.");
          return;
        }
        toast.error(res.message || "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        return;
      }
    };

    fetchListings();
  }, []);

  return (
    <>
      <div>
        {/* First section with search bar  */}
        <section className="relative w-full">
          <div className="w-full h-140 relative flex items-center justify-center bg-slate-900">
            <div
              className="absolute inset-0 z-0 w-full h-full bg-cover bg-center"
              data-alt="Nội thất phòng khách hiện đại, sáng sủa với cửa sổ lớn và ánh nắng"
              style={{
                backgroundImage: `linear-gradient(
                    rgba(0, 0, 0, 0.4),
                    rgba(0, 0, 0, 0.6)
                  ), url('/HomePageBG.png')`,
              }}
            ></div>
            <div className="relative z-10 w-full max-w-240 px-4 flex flex-col items-center text-center gap-8">
              <div className="space-y-4">
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-sm">
                  Khám phá nơi bạn muốn sống
                </h1>
                <h2 className="text-slate-200 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                  Tìm kiếm hơn 1 triệu căn hộ, nhà ở và chung cư cho thuê từ các
                  chủ nhà đáng tin cậy.
                </h2>
              </div>
              <div className="w-full max-w-200 bg-white  rounded-2xl shadow-xl p-2 md:p-3 flex flex-col md:flex-row gap-2 md:gap-0 md:items-center">
                <div className="flex-1 flex items-center px-4 h-12 md:h-auto border-b md:border-b-0 md:border-r border-slate-200 ">
                  <span className="material-symbols-outlined text-slate-400 mr-3">
                    <Search />
                  </span>
                  <input
                    className="w-full bg-transparent border-transparent online-none focus:outline-none text-slate-500  placeholder-slate-400 text-base font-medium p-0"
                    placeholder="Thành phố, Mã bưu điện, hoặc Khu vực"
                    type="text"
                  />
                </div>
                <div className="hidden md:flex items-center gap-2 px-4">
                  <div className="relative group">
                    <Dropdown title="Giá" />
                  </div>
                  <div className="relative group">
                    <Dropdown title="Loại" />
                  </div>
                </div>
                <div className="flex md:hidden gap-2 pb-2">
                  <select className="flex-1 bg-slate-50  border-none rounded-lg text-sm p-2 text-slate-700 ">
                    <option>Khoảng giá</option>
                  </select>
                  <select className="flex-1 bg-slate-50  border-none rounded-lg text-sm p-2 text-slate-700 ">
                    <option>Loại bất động sản</option>
                  </select>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold h-12 md:h-12 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/20 w-full md:w-auto flex items-center justify-center gap-2">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Second section: Famous City */}
        <section className="py-12 bg-white  border-slate-100 ">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <h3 className="text-slate-900  text-lg font-bold mb-6">
              Địa điểm phổ biến
            </h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              <a
                className="shrink-0 flex items-center gap-3 p-2 pr-6 rounded-full bg-slate-50  border border-slate-200  hover:border-primary/50  transition-colors group"
                href="#"
              >
                <span className="font-semibold text-sm text-slate-700  group-hover:text-primary">
                  TP. Hồ Chí Minh
                </span>
              </a>
              <a
                className="shrink-0 flex items-center gap-3 p-2 pr-6 rounded-full bg-slate-50  border border-slate-200  hover:border-primary/50  transition-colors group"
                href="#"
              >
                <span className="font-semibold text-sm text-slate-700  group-hover:text-primary">
                  Hà Nội
                </span>
              </a>
              <a
                className="shrink-0 flex items-center gap-3 p-2 pr-6 rounded-full bg-slate-50  border border-slate-200  hover:border-primary/50  transition-colors group"
                href="#"
              >
                <span className="font-semibold text-sm text-slate-700  group-hover:text-primary">
                  Đà Nẵng
                </span>
              </a>
              <a
                className="shrink-0 flex items-center gap-3 p-2 pr-6 rounded-full bg-slate-50  border border-slate-200  hover:border-primary/50 transition-colors group"
                href="#"
              >
                <span className="font-semibold text-sm text-slate-700  group-hover:text-primary">
                  Nha Trang
                </span>
              </a>
              <a
                className="shrink-0 flex items-center gap-3 p-2 pr-6 rounded-full bg-slate-50  border border-slate-200  hover:border-primary/50  transition-colors group"
                href="#"
              >
                <span className="font-semibold text-sm text-slate-700 group-hover:text-primary">
                  Cần Thơ
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Third section: Newest listings */}
        <section className="py-16 max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 ">
                Tin đăng mới nhất
              </h2>
              <p className="text-slate-500 ">
                Những bất động sản mới được thêm hôm nay trong khu vực của bạn.
              </p>
            </div>
            <Link
              className="hidden md:flex items-center text-primary font-bold hover:underline"
              href="/listings"
            >
              Xem tất cả
              <span className="material-symbols-outlined ml-1 text-sm">
                <ArrowRight />
              </span>
            </Link>
          </div>
          {/* 3 newest listings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings && listings.length > 0 ? (
              listings.map((listing: any) => (
                <ListingCard
                  key={listing.id}
                  id={listing.id}
                  title={listing.title}
                  price={listing.price}
                  address={listing.address}
                  imgUrl={listing.images[0].image_url || "./NoImage.png"}
                  beds={listing.bedrooms}
                  baths={listing.bathrooms}
                  area={listing.area}
                  status={listing.status}
                />
              ))
            ) : (
              <p>Không có tin đăng nào để hiển thị.</p>
            )}
          </div>
          <div className="mt-8 flex justify-center md:hidden">
            <button className="w-full py-3 border border-slate-300  rounded-lg text-slate-900  font-bold hover:bg-slate-50 ">
              Xem tất cả tin đăng
            </button>
          </div>
        </section>

        {/* Fourth Section: Why choose us? */}
        <section className="py-20 bg-white ">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900  mb-4">
                Tại sao chọn RentalHome?
              </h2>
              <p className="text-slate-500  text-lg">
                Chúng tôi giúp việc tìm kiếm ngôi nhà tiếp theo của bạn trở nên
                đơn giản, an toàn và thoải mái.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <RecommendCard
                icon={ShieldCheck}
                title="Chủ nhà đã xác thực"
                description="Chúng tôi sàng lọc tất cả chủ nhà và tin đăng để đảm bảo bạn chỉ giao dịch với các chủ sở hữu hợp pháp."
              />
              <RecommendCard
                icon={BanknoteX}
                title="Không phí ẩn"
                description="Giá cả minh bạch trên tất cả các tin đăng. Những gì bạn thấy là những gì bạn trả, không có chi phí bất ngờ."
              />
              <RecommendCard
                icon={Clock}
                title="Tham quan ngay lập tức"
                description="Lên lịch tham quan trực tiếp hoặc qua video ngay lập tức thông qua lịch trên nền tảng của chúng tôi."
              />
            </div>
          </div>
        </section>

        {/* Fifth Section: Asking owner */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="bg-blue-500 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-2xl shadow-blue-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              <div className="relative z-10 max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Bạn là chủ nhà?
                </h2>
                <p className="text-blue-100 text-lg">
                  Đăng tin miễn phí và tiếp cận hàng triệu người thuê. Các công
                  cụ của chúng tôi giúp quản lý hồ sơ dễ dàng.
                </p>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                <PostButton
                  title="Đăng tin bất động sản của bạn"
                  className="bg-white text-blue-500 font-bold h-14 px-8 rounded-xl hover:bg-slate-50 hover:-translate-y-1 transition shadow-lg cursor-pointer"
                />
                <button className="bg-blue-600 text-white  font-bold h-14 px-8 rounded-xl hover:bg-blue-700 hover:-translate-y-1 transition cursor-pointer">
                  Tìm Hiểu Thêm
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
