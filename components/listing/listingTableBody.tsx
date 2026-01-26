import { CalendarFold, Eye, MapPin, Pen, Trash2 } from "lucide-react";
import {
  formatVietnameseDate,
  formatVietnamesePrice,
  getVietnameseStatus,
  getStatusStyle,
  formatViews,
} from "@/utils";
import { useRouter } from "next/navigation";

interface ListingTableBodyProps {
  id: string;
  img_url?: string;
  title: string;
  address: string;
  price: number;
  createdAt?: string;
  views: string | number;
  status?: string;
}

export default function ListingTableBody({
  id,
  img_url,
  title,
  address,
  price,
  createdAt,
  views,
  status,
}: ListingTableBodyProps) {
  const router = useRouter();

  // Lấy trạng thái tiếng Việt
  const vietnameseStatus = getVietnameseStatus(status);

  // Lấy style cho trạng thái
  const statusStyle = getStatusStyle(status);

  // Format ngày tháng
  const formattedDate = formatVietnameseDate(createdAt);

  // Format giá tiền
  const formattedPrice = formatVietnamesePrice(price);

  // Format số lượt xem
  const formattedViews = formatViews(views);

  const openListing = (listingId: string) => {
    router.replace(`/listing-update-draft/${listingId}`);
  };

  return (
    <tr className="group hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex gap-4 items-start">
          <div className=" rounded-lg bg-slate-200 overflow-hidden shrink-0">
            <img
              src={img_url || "/NoImage.jpg"}
              className="object-cover w-20 h-16"
            />
          </div>
          <div className="flex flex-col gap-1 cursor-pointer">
            <p className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-500 transition-colors">
              {title}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                <MapPin size={12} />
              </span>
              {address}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="block text-sm font-bold text-blue-500 whitespace-nowrap">
          {formattedPrice}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              <CalendarFold size={12} />
            </span>
            {formattedDate || "N/A"}
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              <Eye size={12} />
            </span>
            {formattedViews} lượt xem
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
          ></span>
          {vietnameseStatus}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          {status !== "DRAFT" && (
            <button
              className="cursor-pointer p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
              title="Xem tin"
            >
              <span className="material-symbols-outlined text-[20px]">
                <Eye size={15} />
              </span>
            </button>
          )}
          <button
            className="cursor-pointer p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Chỉnh sửa"
            onClick={() => openListing(id)}
          >
            <span className="material-symbols-outlined text-[20px]">
              <Pen size={15} />
            </span>
          </button>
          <button
            className="cursor-pointer p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Xóa tin"
          >
            <span className="material-symbols-outlined text-[20px]">
              <Trash2 size={15} />
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}
