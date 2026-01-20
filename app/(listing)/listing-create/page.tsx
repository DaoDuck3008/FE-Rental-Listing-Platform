"use client";

import DescriptionEditor from "@/components/common/descriptionEditor";
import UploadListingImage from "@/components/listing/uploadListingImage";
import { useAmenities } from "@/hooks/useAmenities";
import { useProvinces, useWardsByProvince } from "@/hooks/useProvinces";
import { validateHeaderName } from "http";
import {
  ChevronDown,
  CloudUpload,
  Eye,
  Image,
  Info,
  List,
  MapPin,
  Sparkles,
  User,
  icons,
} from "lucide-react";
import { useState } from "react";

interface createListingProps {
  title: string;
  listing_type_code: string;
  capacity: number;
  price: number;
  area: number;
  beds: number;
  bathrooms: number;
  province_code: number | null;
  ward_code: number | null;
  address: string;
  amenities: string[];
  images?: File[];
  description: string;
  showPhoneNumber: boolean;
}

import BackButton from "@/components/common/backButton";

export default function CreateNewListingPage() {
  const [form, setForm] = useState<createListingProps>({
    title: "",
    listing_type_code: "APARTMENT",
    capacity: 0,
    price: 0,
    area: 0,
    beds: 1,
    bathrooms: 1,
    province_code: null,
    ward_code: null,
    address: "",
    amenities: [],
    description: "",
    showPhoneNumber: true,
  });
  const [images, setImages] = useState<File[] | null>(null);

  const { provinces, isLoading: provinceIsLoading } = useProvinces();
  const { wards, isLoading: wardIsLoading } = useWardsByProvince(
    form.province_code
  );
  const { amenities, isLoading: amenitiesIsLoading } = useAmenities();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      province_code: value ? Number(value) : null,
      ward_code: null,
    }));
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      ward_code: value ? Number(value) : null,
    }));
  };

  const handleIncreaseNumber = (name: "beds" | "bathrooms") => {
    setForm((prev) => ({
      ...prev,
      [name]: form[name] + 1,
    }));
  };

  const handleDecreaseNumber = (name: "beds" | "bathrooms") => {
    if (form[name] <= 0) return;

    setForm((prev) => ({
      ...prev,
      [name]: form[name] - 1,
    }));
  };

  const handleAmenityToggle = (id: string) => {
    setForm((prev) => {
      const exists = prev.amenities.includes(id);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((item) => item !== id)
          : [...prev.amenities, id],
      };
    });
  };

  const handleShowPhoneNumberToggle = () => {
    setForm((prev) => ({
      ...prev,
      showPhoneNumber: !prev.showPhoneNumber,
    }));
  };

  const handleSubmit = () => {
    console.log(">>> form: ", form);
  };


  return (
    <>
      <main className="grow py-8 px-4 sm:px-6">
        <div className="max-w-240 mx-auto">
          {/* BACK BUTTON */}
          <div className="mb-4">
            <BackButton />
          </div>

          {/* TIÊU ĐỀ */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-black text-text-main tracking-tight mb-2">
              Đăng tin cho thuê mới
            </h1>
            <p className="text-text-secondary text-base">
              Điền thông tin chi tiết để tiếp cận người thuê nhanh chóng và hiệu
              quả.
            </p>
          </div>

          {/* LISTING FORM */}
          <form className="flex flex-col gap-6">
            {/* SECTION 1: BASIC INFORMATION */}
            <section className="bg-white rounded-xl border border-border-color shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border-color bg-gray-50/50 flex items-center gap-3">
                <div className="size-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <span className="material-symbols-outlined text-lg">
                    <Info size={20} />
                  </span>
                </div>
                <h2 className="text-lg font-bold text-text-main">
                  1. Thông tin cơ bản
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-text-main mb-2">
                    Tiêu đề bài đăng <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full h-12 px-4 rounded-lg border border-input-border bg-white text-text-main placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Ví dụ: Phòng trọ giá rẻ, khép kín, gần ĐH Bách Khoa..."
                    type="text"
                    value={form.title}
                    name="title"
                    onChange={handleChange}
                  />
                  <p className="mt-1.5 text-xs text-text-secondary">
                    Tiêu đề nên chứa loại hình, khu vực và điểm nổi bật.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">
                    Loại hình cho thuê <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="listing_type_code"
                      onChange={handleChange}
                      className="w-full h-12 px-4 appearance-none rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="">Chọn loại hình</option>
                      <option value="phong-tro">Phòng trọ</option>
                      <option value="can-ho">Căn hộ chung cư</option>
                      <option value="nha-nguyen-can">Nhà nguyên căn</option>
                      <option value="o-ghep">Tìm người ở ghép</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-secondary">
                      <span className="material-symbols-outlined">
                        <ChevronDown />
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">
                    Sức chứa (người)
                  </label>
                  <input
                    className="w-full h-12 px-4 rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Nhập số người tối đa"
                    type="number"
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">
                    Giá thuê (tháng) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-12 pl-4 pr-16 rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="Nhập giá thuê"
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-secondary bg-gray-50 rounded-r-lg border-l border-input-border">
                      <span className="text-sm font-semibold">VNĐ</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">
                    Diện tích <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-12 pl-4 pr-16 rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="Nhập diện tích"
                      type="number"
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-secondary bg-gray-50 rounded-r-lg border-l border-input-border">
                      <span className="text-sm font-semibold">m²</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 md:col-span-2">
                  <div>
                    <label className="block text-sm font-bold text-text-main mb-2">
                      Số phòng ngủ
                    </label>
                    <div className="flex items-center h-12 border border-input-border rounded-lg overflow-hidden">
                      <button
                        className="px-4 h-full bg-gray-50 hover:bg-gray-100 border-r border-input-border transition-colors text-text-secondary font-bold text-xl"
                        type="button"
                        onClick={() => handleDecreaseNumber("beds")}
                      >
                        -
                      </button>
                      <input
                        className="w-full h-full text-center border-none focus:ring-0 p-0 text-text-main font-medium"
                        min="0"
                        type="number"
                        value={form.beds}
                        name="beds"
                        onChange={handleChange}
                      />
                      <button
                        className="px-4 h-full bg-gray-50 hover:bg-gray-100 border-l border-input-border transition-colors text-text-secondary font-bold text-xl"
                        type="button"
                        onClick={() => handleIncreaseNumber("beds")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-main mb-2">
                      Số phòng vệ sinh
                    </label>
                    <div className="flex items-center h-12 border border-input-border rounded-lg overflow-hidden">
                      <button
                        className="px-4 h-full bg-gray-50 hover:bg-gray-100 border-r border-input-border transition-colors text-text-secondary font-bold text-xl"
                        type="button"
                        onClick={() => handleDecreaseNumber("bathrooms")}
                      >
                        -
                      </button>
                      <input
                        className="w-full h-full text-center border-none focus:ring-0 p-0 text-text-main font-medium"
                        min="0"
                        type="number"
                        value={form.bathrooms}
                        name="bathrooms"
                        onChange={handleChange}
                      />
                      <button
                        className="px-4 h-full bg-gray-50 hover:bg-gray-100 border-l border-input-border transition-colors text-text-secondary font-bold text-xl"
                        type="button"
                        onClick={() => handleIncreaseNumber("bathrooms")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: ADDRESS AND LOCATION */}
            <section className="bg-white rounded-xl border border-border-color shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border-color bg-gray-50/50 flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">
                    <MapPin size={20} />
                  </span>
                </div>
                <h2 className="text-lg font-bold text-text-main">
                  2. Địa chỉ &amp; Vị trí
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-sm font-bold text-text-main mb-2">
                    Tỉnh/Thành phố <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      onChange={handleProvinceChange}
                      name="province_code"
                      className="w-full h-12 px-4 appearance-none rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value="">Chọn Tỉnh/ Thành phố</option>
                      {provinceIsLoading && (
                        <option value=""> ... Đang tải dữ liệu ...</option>
                      )}

                      {!provinceIsLoading &&
                        provinces &&
                        provinces.map((p: any) => (
                          <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-secondary">
                      <span className="material-symbols-outlined">
                        <ChevronDown />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-bold text-text-main mb-2">
                    Phường/Xã <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      onChange={handleWardChange}
                      name="ward_code"
                      value={form.ward_code || ""}
                      disabled={!form.province_code}
                      className={`w-full h-12 px-4 appearance-none rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                        !form.province_code
                          ? "bg-gray-100 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <option value="">Chọn Phường/Xã</option>
                      {!wardIsLoading &&
                        wards &&
                        wards.map((w: any) => (
                          <option key={w.code} value={w.code}>
                            {w.name}
                          </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-secondary">
                      <span className="material-symbols-outlined">
                        <ChevronDown />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-bold text-text-main mb-2">
                    Địa chỉ chính xác <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full h-12 px-4 rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Số nhà, tên đường, khu dân cư..."
                    type="text"
                  />
                </div>
                <div className="md:col-span-3 rounded-xl overflow-hidden h-64 relative bg-gray-200 border border-input-border group cursor-pointer">
                  <img
                    alt="Map view of Ho Chi Minh City streets"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    data-location="Ho Chi Minh City"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeAVSSsPmznwMIv5cR4lgMGVP4Z_UB8rLGSXonecm9SD-7lHW21mu1vLPCUiWYSCURucpYJTyaeofJguU0XlyA9e3WJVZ3ZMtNhnEYRble5c0NKt2JXhezQtUNXZAbzHRSMD6TfLHAk1Aj7WRw29eA4jTzZWiWw3Xcv9_kSGB91cNdectrEl_PjXkJ4MBA89qA2lt8jvHfhzH7eE3UlqgXyvKjROWg10wqlKc7M92rbMnVdyBvg2riDZd-g4Ku7DhsJcdomZlYfEMR"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-primary font-bold">
                      <span className="material-symbols-outlined">
                        <CloudUpload />
                      </span>
                      Chọn vị trí trên bản đồ
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: IMAGES */}
            <section className="bg-white rounded-xl border border-border-color shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border-color bg-gray-50/50 flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary ">
                  <span className="material-symbols-outlined text-lg">
                    <Image size={20} />
                  </span>
                </div>
                <h2 className="text-lg font-bold text-text-main">
                  3. Hình ảnh
                </h2>
              </div>
              <div className="p-6">
                <UploadListingImage
                  setFileCallback={(files) => setImages(files)}
                />
              </div>
            </section>

            {/* SECTION 4: AMENITIES */}
            <section className="bg-white rounded-xl border border-border-color shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border-color bg-gray-50/50 flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">
                    <List size={20} />
                  </span>
                </div>
                <h2 className="text-lg font-bold text-text-main">
                  4. Tiện ích &amp; Mô tả
                </h2>
              </div>
              <div className="p-6">
                <label className="block text-sm font-bold text-text-main mb-4">
                  Tiện ích có sẵn
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                  {amenities &&
                    !amenitiesIsLoading &&
                    amenities.map((amenity: any) => {
                      const isSelected = form.amenities.includes(amenity.name);
                      const IconComponent =
                        icons[amenity.icon as keyof typeof icons] || Sparkles;

                      return (
                        <button
                          key={amenity.name}
                          type="button"
                          onClick={() => handleAmenityToggle(amenity.name)}
                          className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                            isSelected
                              ? "border-primary bg-primary/5 text-primary shadow-sm"
                              : "border-border-color bg-white text-text-secondary hover:border-primary/50 hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-full ${
                              isSelected ? "bg-white" : "bg-gray-100"
                            }`}
                          >
                            <IconComponent size={20} />
                          </div>
                          <span className="text-sm font-semibold">
                            {amenity.name}
                          </span>
                        </button>
                      );
                    })}
                </div>
                <label className="block text-sm font-bold text-text-main mb-2">
                  Mô tả chi tiết
                </label>
                <DescriptionEditor
                  value={form.description}
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      description: value,
                    }))
                  }
                />
              </div>
            </section>

            {/* SECTION 5: LANDLORD INFORMATION */}
            <section className="bg-white rounded-xl border border-border-color shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border-color bg-gray-50/50 flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">
                    <User size={20} />
                  </span>
                </div>
                <h2 className="text-lg font-bold text-text-main">
                  5. Thông tin liên hệ
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">
                    Tên người liên hệ
                  </label>
                  <input
                    className="w-full h-12 px-4 rounded-lg border border-input-border bg-gray-200 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    type="text"
                    value="Nguyễn Văn A"
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">
                    Số điện thoại
                  </label>
                  <input
                    className="w-full h-12 px-4 rounded-lg border border-input-border bg-gray-200 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    type="tel"
                    value="0912345678"
                    disabled={true}
                  />
                </div>
                <div className="md:col-span-2 flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-input-border">
                  <div>
                    <p className="text-sm font-bold text-text-main">
                      Hiển thị số điện thoại
                    </p>
                    <p className="text-xs text-text-secondary">
                      Cho phép mọi người nhìn thấy số điện thoại của bạn.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      className="sr-only peer"
                      type="checkbox"
                      value=""
                      name="showPhoneNumber"
                      checked={form.showPhoneNumber}
                      onChange={handleShowPhoneNumberToggle}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </section>
            {/* FOOTER BUTTONS */}
            <div className="sticky bottom-0 z-40 bg-white border-t border-border-color -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 mt-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div className="mx-auto flex items-center justify-end gap-3">
                <button
                  className="h-12 px-6 rounded-lg border border-input-border bg-white text-text-main font-bold text-sm hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  Lưu bản nháp
                </button>
                <label className="h-12 px-6 flex items-center gap-2 rounded-lg border border-input-border bg-white text-text-main font-bold text-sm hover:bg-gray-50 transition-colors cursor-pointer select-none">
                  <span className="material-symbols-outlined text-[20px]">
                    <Eye />
                  </span>
                  Xem trước
                </label>
                <button
                  className="h-12 px-8 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98]"
                  type="button"
                  onClick={handleSubmit}
                >
                  Đăng tin ngay
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
