"use client";

import { useState, useEffect } from "react";
import ListingCard3 from "@/components/listing/listingCard3";
import MapView from "@/components/listing/MapView";
import FilterModal from "@/components/listing/FilterModal";
import { Search, Filter, ChevronDown, Loader2 } from "lucide-react";
import { useProvinces, useWardsByProvince } from "@/hooks/useProvinces";
import { useListingTypes } from "@/hooks/useListing";
import { useAmenities } from "@/hooks/useAmenities";
import { getPublicListings } from "@/services/listing.api";
import { toast } from "react-toastify";

export default function MapListingsPage() {
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
    limit: 5,
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
        const res = error.response?.data;
        if (!res) {
          console.error(error);
          toast.error("Lỗi không xác định");
          return;
        }
        toast.error(res.message || "Đã có lỗi xảy ra vui lòng thử lại sau");
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
      max_area: 100,
      beds: undefined,
      amenities: [],
      sort_by: "DATE_DESC",
      page: 1,
      limit: 5,
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

  return (
    <div className="flex h-[calc(100vh)] mb-5 overflow-hidden">
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

          {/* Sort Dropdown */}
          <div className="flex items-center justify-between">
            <h3 className="text-text-main text-lg font-bold leading-tight">
              {pagination?.totalItems || 0} Kết quả
            </h3>
            <div className="relative group">
              <select
                className="appearance-none bg-transparent border-none text-sm text-text-secondary cursor-pointer hover:text-primary pr-6 outline-none"
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
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
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
                  image_url={item.images?.[0]?.image_url || "/placeholder.png"}
                />
              ))}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="pt-4 pb-6 flex justify-center">
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
            </>
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
          )}
        </div>
      </div>

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

      {/* Filter Modal */}
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
  );
}
