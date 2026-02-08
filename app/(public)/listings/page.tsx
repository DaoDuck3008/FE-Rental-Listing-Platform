"use client";

import { useState } from "react";
import ListingCard from "@/components/listing/listingCard";
import ListingCard3 from "@/components/listing/listingCard3";
import MapView from "@/components/listing/MapView";
import FilterModal from "@/components/listing/FilterModal";
import {
  Search,
  MapPin,
  ChevronDown,
  Grid,
  Map,
  Filter,
  RotateCcw,
  Loader2,
  X,
} from "lucide-react";
import { useProvinces, useWardsByProvince } from "@/hooks/useProvinces";
import { useListingTypes } from "@/hooks/useListing";
import { useAmenities } from "@/hooks/useAmenities";
import { getPublicListings } from "@/services/listing.api";
import { useEffect } from "react";
import RangeSlider from "@/components/common/rangeSlider";
import { formatVietnamesePrice } from "@/utils/formatters";
import { toast } from "react-toastify";

type ViewMode = "grid" | "map";

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filters, setFilters] = useState({
    keyword: "",
    province_code: undefined as number | undefined,
    ward_code: undefined as number | undefined,
    listing_type_code: undefined as string | undefined,
    min_price: 0,
    max_price: 50000000,
    min_area: 0,
    max_area: 100,
    beds: undefined as number | undefined,
    amenities: [] as string[],
    sort_by: "DATE_DESC",
    page: 1,
    limit: viewMode === "map" ? 5 : undefined,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { provinces } = useProvinces();
  const { wards } = useWardsByProvince(filters.province_code);
  const { listingTypes } = useListingTypes();
  const { amenities } = useAmenities();

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const result = await getPublicListings(filters);
        setData(result);
      } catch (error: any) {
        const res = error.response.data;
        if (!res) {
          console.error(error);
          toast.error("Lỗi không xác định");
          return;
        }

        toast.error(res.message || "Đã có lỗi xảy ra vui lòng thử lại sau");
        return;
      } finally {
        setIsLoading(false);
      }
    };

    const handler = setTimeout(() => {
      fetchListings();
    }, 500);

    return () => clearTimeout(handler);
  }, [filters]);

  const listings = data?.data;
  const pagination = data?.pagination;

  const handleReset = () => {
    setFilters({
      keyword: "",
      province_code: undefined,
      ward_code: undefined,
      listing_type_code: undefined,
      min_price: 0,
      max_price: 50000000,
      min_area: 0,
      max_area: 500,
      beds: undefined,
      amenities: [],
      sort_by: "DATE_DESC",
      page: 1,
      limit: viewMode === "map" ? 5 : undefined,
    });
  };

  const toggleAmenity = (id: string) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter((a) => a !== id)
        : [...prev.amenities, id],
    }));
  };

  const sortOptions = [
    { label: "Mới nhất", value: "DATE_DESC" },
    { label: "Cũ nhất", value: "DATE_ASC" },
    { label: "Giá thấp đến cao", value: "PRICE_ASC" },
    { label: "Giá cao đến thấp", value: "PRICE_DESC" },
  ];

  // Khi chuyển đổi sang chế độ xem với Map thì đặt limit = 5
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      limit: viewMode === "map" ? 5 : undefined,
    }));
  }, [viewMode]);

  return (
    <main
      className={`flex-1 flex flex-col w-full ${
        viewMode === "grid"
          ? "max-w-360 mx-auto px-4 lg:px-10"
          : "max-w-full px-0"
      } py-6 transition-all duration-300`}
    >
      <div
        className={`flex flex-col lg:flex-row gap-8 items-start h-full relative ${
          viewMode === "map" ? "flex-row! gap-0!" : ""
        }`}
      >
        {/* Overlay for mobile ONLY */}
        <div
          className={`
            fixed inset-0 bg-black/40 backdrop-blur-sm z-60 lg:hidden transition-opacity duration-300
            ${
              isFilterOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }
          `}
          onClick={() => setIsFilterOpen(false)}
        />

        {/* Sidebar Container - Hidden in map view */}
        <div
          className={`
            z-70 transition-all duration-300 ease-in-out
            fixed inset-y-0 left-0 w-full 
            lg:relative lg:translate-x-0 lg:w-[320px] lg:z-0 lg:inset-auto
            ${
              viewMode === "map"
                ? "hidden"
                : isFilterOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <aside className="w-full bg-white p-6 shadow-2xl lg:shadow-none lg:p-0 lg:pr-2 lg:bg-transparent space-y-6 lg:sticky lg:top-24 h-full lg:h-full lg:max-h-[calc(100vh)] overflow-y-auto overflow-x-hidden pr-2 pb-10 custom-scrollbar">
            <div className="flex items-center justify-between">
              <h3 className="text-text-main text-xl font-bold leading-tight drop-shadow-sm">
                Bộ lọc
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleReset}
                  className="text-primary text-sm font-bold hover:underline flex items-center gap-1 group"
                >
                  <RotateCcw className="w-3 h-3 group-hover:rotate-45 transition-transform" />
                  Đặt lại
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="lg:hidden p-1 hover:bg-slate-100 rounded-full transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-6 h-6 text-text-main" />
                </button>
              </div>
            </div>

            {/* Keyword Search */}
            <div className="space-y-3">
              <p className="text-text-main text-base font-bold leading-normal">
                Tìm kiếm
              </p>
              <div className="flex w-full items-center rounded-lg border border-input-border bg-white px-3 py-2.5 shadow-sm focus-within:ring-2 ring-primary/20 transition-all">
                <Search className="text-text-secondary w-5 h-5 mr-2" />
                <input
                  className="w-full bg-transparent text-sm border-none p-0 focus:ring-0 text-text-main placeholder-secondary"
                  placeholder="Nhập từ khóa tìm kiếm..."
                  type="text"
                  value={filters.keyword}
                  onChange={(e) =>
                    setFilters({ ...filters, keyword: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Location Filters */}
            <div className="space-y-3">
              <p className="text-text-main text-base font-bold leading-normal">
                Vị trí
              </p>
              <div className="space-y-2">
                <div className="relative group">
                  <select
                    className="w-full appearance-none rounded-lg border border-input-border bg-white px-3 py-2.5 text-sm focus:ring-2 ring-primary/20 text-text-main outline-none transition-all pr-10"
                    value={filters.province_code || ""}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        province_code: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                        ward_code: undefined,
                      })
                    }
                  >
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {provinces?.map((p: any) => (
                      <option key={p.code} value={p.code}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                </div>

                <div className="relative group">
                  <select
                    className="w-full appearance-none rounded-lg border border-input-border bg-white px-3 py-2.5 text-sm focus:ring-2 ring-primary/20 text-text-main outline-none transition-all pr-10 disabled:opacity-50 disabled:bg-slate-50"
                    value={filters.ward_code || ""}
                    disabled={!filters.province_code}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        ward_code: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      })
                    }
                  >
                    <option value="">Chọn Quận/Huyện/Phường/Xã</option>
                    {wards?.map((w: any) => (
                      <option key={w.code} value={w.code}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 transition-all">
              <div className="flex justify-between items-center mb-4">
                <p className="text-text-main text-base font-bold leading-normal">
                  Khoảng giá
                </p>
                <div className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-full">
                  {formatVietnamesePrice(filters.min_price)} -{" "}
                  {formatVietnamesePrice(filters.max_price)}
                </div>
              </div>
              <div className="space-y-6 pt-2">
                <RangeSlider
                  min={0}
                  max={50000000}
                  step={500000}
                  values={[filters.min_price, filters.max_price]}
                  onChange={(values) =>
                    setFilters({
                      ...filters,
                      min_price: values[0],
                      max_price: values[1],
                    })
                  }
                  formatLabel={(val) => formatVietnamesePrice(val)}
                />
              </div>
            </div>

            {/* Area Range */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 transition-all">
              <div className="flex justify-between items-center mb-4">
                <p className="text-text-main text-base font-bold leading-normal">
                  Diện tích
                </p>
                <div className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-full">
                  {filters.min_area} m² - {filters.max_area} m²
                </div>
              </div>
              <div className="space-y-6 pt-2">
                <RangeSlider
                  min={0}
                  max={100}
                  step={1}
                  values={[filters.min_area, filters.max_area]}
                  onChange={(values) =>
                    setFilters({
                      ...filters,
                      min_area: values[0],
                      max_area: values[1],
                    })
                  }
                  formatLabel={(val) => `${val} m²`}
                />
              </div>
            </div>

            {/* Property Types */}
            <div className="space-y-3">
              <p className="text-text-main text-base font-bold leading-normal">
                Loại bất động sản
              </p>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
                {listingTypes?.map((type: any) => (
                  <label
                    key={type.code}
                    className="flex gap-x-2 lg:gap-x-3 items-center cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="listing_type"
                      className="h-4 w-4 lg:h-5 lg:w-5 rounded border-input-border text-primary focus:ring-0 transition-all"
                      checked={filters.listing_type_code === type.code}
                      onChange={() =>
                        setFilters({ ...filters, listing_type_code: type.code })
                      }
                    />
                    <span className="text-text-main text-[13px] lg:text-sm font-medium group-hover:text-primary transition-colors truncate">
                      {type.name}
                    </span>
                  </label>
                ))}
                <label className="flex gap-x-2 lg:gap-x-3 items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="listing_type"
                    className="h-4 w-4 lg:h-5 lg:w-5 rounded border-input-border text-primary focus:ring-0 transition-all"
                    checked={!filters.listing_type_code}
                    onChange={() =>
                      setFilters({ ...filters, listing_type_code: undefined })
                    }
                  />
                  <span className="text-text-main text-[13px] lg:text-sm font-medium group-hover:text-primary transition-colors">
                    Tất cả
                  </span>
                </label>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="space-y-3">
              <p className="text-text-main text-base font-bold leading-normal">
                Phòng ngủ
              </p>
              <div className="flex gap-2">
                {[undefined, 1, 2, 3].map((val) => (
                  <button
                    key={val === undefined ? "any" : val}
                    onClick={() => setFilters({ ...filters, beds: val })}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${
                      filters.beds === val
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input-border bg-white hover:border-primary hover:text-primary"
                    }`}
                  >
                    {val === undefined ? "Bất kỳ" : `${val}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <p className="text-text-main text-base font-bold leading-normal pt-2">
                Tiện nghi
              </p>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
                {amenities?.map((amenity: any) => (
                  <label
                    key={amenity.id}
                    className="flex gap-x-2 lg:gap-x-3 items-center cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 lg:h-5 lg:w-5 rounded border-input-border text-primary focus:ring-0 transition-all"
                      checked={filters.amenities.includes(amenity.id)}
                      onChange={() => toggleAmenity(amenity.id)}
                    />
                    <span className="text-text-main text-[13px] lg:text-sm font-medium group-hover:text-primary transition-colors truncate">
                      {amenity.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Results Area */}
        <div className="flex-1 flex flex-col w-full min-w-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-main">
                {provinces?.find((p: any) => p.code === filters.province_code)
                  ?.name
                  ? `Cho thuê tại ${
                      provinces.find(
                        (p: any) => p.code === filters.province_code
                      ).name
                    }`
                  : "Tất cả bài đăng cho thuê"}
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                Hiển thị {pagination?.totalItems || 0} kết quả
              </p>
            </div>

            <div>
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex-1 flex items-center justify-center gap-2 bg-white border border-input-border px-4 py-2 rounded-lg text-sm font-bold text-text-main hover:border-primary transition-all active:scale-95 shadow-sm"
              >
                <Filter className="w-4 h-4 text-primary" />
                Bộ lọc để mở ra
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Sort Dropdown */}
              <div className="relative group flex-1 sm:flex-none">
                <select
                  className="flex items-center gap-2 bg-white border border-input-border px-4 py-2 rounded-lg text-sm font-medium text-text-main hover:border-primary transition-colors outline-none appearance-none pr-10"
                  value={filters.sort_by}
                  onChange={(e) =>
                    setFilters({ ...filters, sort_by: e.target.value })
                  }
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      Sắp xếp: {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex bg-white border border-input-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-text-secondary hover:bg-slate-100"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "map"
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-text-secondary hover:bg-slate-100"
                  }`}
                >
                  <Map className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Listings Grid or Map View */}
          {viewMode === "grid" ? (
            // Grid View
            isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 w-full col-span-full">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-slate-500 font-medium">
                  Đang tìm kiếm kết quả phù hợp...
                </p>
              </div>
            ) : listings && listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-6">
                {listings.map((item: any) => (
                  <ListingCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    imgUrl={item.images?.[0]?.image_url || "/placeholder.png"}
                    cost={item.price.toLocaleString("vi-VN")}
                    address={item.address}
                    beds={item.bedrooms}
                    baths={item.bathrooms}
                    area={item.area}
                    status={item.status}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <Filter className="w-12 h-12 text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">
                  Không tìm thấy bài đăng nào phù hợp với bộ lọc của bạn.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-primary font-bold hover:underline"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )
          ) : (
            // Map View
            <div className="fixed inset-0 top-15 left-0 right-0 bottom-0 z-50 animate-slideInFromRight">
              <div className="flex h-full overflow-hidden">
                {/* Left Sidebar with Listings */}
                <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col h-full bg-white border-r border-slate-200 overflow-hidden relative shadow-xl z-10">
                  <div className="shrink-0 flex flex-col border-b border-slate-200 bg-white p-4 gap-3 z-10">
                    {/* Search Bar */}
                    <div className="flex w-full items-center gap-2">
                      <div className="flex w-full flex-1 items-stretch rounded-lg h-11 bg-[#f0f4f8] border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <div className="text-text-secondary flex items-center justify-center pl-3">
                          <Search className="w-5 h-5" />
                        </div>
                        <input
                          className="flex w-full min-w-0 flex-1 bg-transparent border-none focus:ring-0 text-text-main placeholder:text-text-secondary px-3 text-sm font-medium"
                          placeholder="Tìm theo quận, tên đường, dự án..."
                          value={filters.keyword}
                          onChange={(e) =>
                            setFilters({ ...filters, keyword: e.target.value })
                          }
                        />
                      </div>
                      <button
                        onClick={() => setIsFilterOpen(true)}
                        className="h-11 px-4 bg-primary hover:bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-md transition-colors"
                      >
                        <Filter className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Sort Dropdown and View Toggle */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-text-main text-lg font-bold leading-tight">
                        {pagination?.totalItems || 0} Kết quả
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="relative group">
                          <select
                            className="appearance-none bg-transparent border-none text-sm text-text-secondary cursor-pointer hover:text-primary pr-6 outline-none"
                            value={filters.sort_by}
                            onChange={(e) =>
                              setFilters({
                                ...filters,
                                sort_by: e.target.value,
                              })
                            }
                          >
                            {sortOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                Sắp xếp: {opt.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                        </div>

                        {/* View Toggle in Map View */}
                        <div className="flex bg-white border border-input-border rounded-lg p-1">
                          <button
                            onClick={() => setViewMode("grid")}
                            className={`p-1.5 rounded transition-colors ${
                              viewMode === ("grid" as string)
                                ? "bg-primary/10 text-primary shadow-sm"
                                : "text-text-secondary hover:bg-slate-100"
                            }`}
                          >
                            <Grid className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setViewMode("map")}
                            className={`p-1.5 rounded transition-colors ${
                              viewMode === ("map" as string)
                                ? "bg-primary/10 text-primary shadow-sm"
                                : "text-text-secondary hover:bg-slate-100"
                            }`}
                          >
                            <Map className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-light">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                        <p className="text-slate-500 font-medium">
                          Đang tìm kiếm kết quả phù hợp...
                        </p>
                      </div>
                    ) : listings && listings.length > 0 ? (
                      <>
                        {listings.map((item: any) => (
                          <ListingCard3
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            address={item.address}
                            price={item.price}
                            bedrooms={item.bedrooms}
                            bathrooms={item.bathrooms}
                            area={item.area}
                            views={item.views}
                            listing_type_name={item.listing_type?.name || "N/A"}
                            image_url={
                              item.images?.[0]?.image_url || "/placeholder.png"
                            }
                          />
                        ))}

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (
                          <div className="pt-4 pb-6 flex justify-center">
                            <nav className="flex items-center gap-2">
                              <button
                                disabled={filters.page === 1}
                                onClick={() =>
                                  setFilters({
                                    ...filters,
                                    page: filters.page - 1,
                                  })
                                }
                                className="size-10 flex items-center justify-center rounded-lg border border-input-border bg-white hover:bg-slate-50 text-text-secondary disabled:opacity-50 transition-colors"
                              >
                                <ChevronDown className="w-5 h-5 rotate-90" />
                              </button>
                              {[...Array(pagination.totalPages)].map((_, i) => {
                                const p = i + 1;
                                if (
                                  p === 1 ||
                                  p === pagination.totalPages ||
                                  Math.abs(p - filters.page) <= 1
                                ) {
                                  return (
                                    <button
                                      key={p}
                                      onClick={() =>
                                        setFilters({ ...filters, page: p })
                                      }
                                      className={`size-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                                        filters.page === p
                                          ? "bg-primary text-white"
                                          : "border border-input-border bg-white hover:bg-slate-50 text-text-main"
                                      }`}
                                    >
                                      {p}
                                    </button>
                                  );
                                } else if (Math.abs(p - filters.page) === 2) {
                                  return (
                                    <span
                                      key={p}
                                      className="text-text-secondary px-1"
                                    >
                                      ...
                                    </span>
                                  );
                                }
                                return null;
                              })}
                              <button
                                disabled={
                                  filters.page === pagination.totalPages
                                }
                                onClick={() =>
                                  setFilters({
                                    ...filters,
                                    page: filters.page + 1,
                                  })
                                }
                                className="size-10 flex items-center justify-center rounded-lg border border-input-border bg-white hover:bg-slate-50 text-text-secondary disabled:opacity-50 transition-colors"
                              >
                                <ChevronDown className="w-5 h-5 -rotate-90" />
                              </button>
                            </nav>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                        <Filter className="w-12 h-12 text-slate-300 mb-4" />
                        <p className="text-slate-500 font-medium">
                          Không tìm thấy bài đăng nào phù hợp với bộ lọc của
                          bạn.
                        </p>
                        <button
                          onClick={handleReset}
                          className="mt-4 text-primary font-bold hover:underline"
                        >
                          Xóa tất cả bộ lọc
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Map Panel */}
                <div className="hidden lg:block w-[55%] xl:w-[60%] relative bg-[#e5e3df] overflow-hidden">
                  {listings && listings.length > 0 ? (
                    <MapView listings={listings} />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-slate-100">
                      <p className="text-slate-500 font-medium">
                        Không có dữ liệu để hiển thị trên bản đồ
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Filter Modal for Map View */}
              <FilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                setFilters={setFilters}
                provinces={provinces || []}
                wards={wards || []}
                listingTypes={listingTypes || []}
                amenities={amenities || []}
                toggleAmenity={toggleAmenity}
                handleReset={handleReset}
              />
            </div>
          )}

          {/* Pagination - Only show in grid view */}
          {viewMode === "grid" && pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center mt-10 mb-6">
              <nav className="flex items-center gap-2">
                <button
                  disabled={filters.page === 1}
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page - 1 })
                  }
                  className="size-10 flex items-center justify-center rounded-lg border border-input-border bg-white hover:bg-slate-50 text-text-secondary disabled:opacity-50 transition-colors"
                >
                  <ChevronDown className="w-5 h-5 rotate-90" />
                </button>
                {[...Array(pagination.totalPages)].map((_, i) => {
                  const p = i + 1;
                  if (
                    p === 1 ||
                    p === pagination.totalPages ||
                    Math.abs(p - filters.page) <= 1
                  ) {
                    return (
                      <button
                        key={p}
                        onClick={() => setFilters({ ...filters, page: p })}
                        className={`size-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                          filters.page === p
                            ? "bg-primary text-white"
                            : "border border-input-border bg-white hover:bg-slate-50 text-text-main"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  } else if (Math.abs(p - filters.page) === 2) {
                    return (
                      <span key={p} className="text-text-secondary px-1">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
                <button
                  disabled={filters.page === pagination.totalPages}
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page + 1 })
                  }
                  className="size-10 flex items-center justify-center rounded-lg border border-input-border bg-white hover:bg-slate-50 text-text-secondary disabled:opacity-50 transition-colors"
                >
                  <ChevronDown className="w-5 h-5 -rotate-90" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        :global(.animate-slideInFromRight) {
          animation: slideInFromRight 0.3s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
