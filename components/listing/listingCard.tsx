import { Bath, Bed, BookHeart, LandPlot } from "lucide-react";

interface ListingCardProps {
  title: string;
  imgUrl: string;
  cost: string | number;
  address: string;
  beds: number;
  baths: number;
  area: number;
  status: string | null;
}

export default function ListingCard({
  title,
  imgUrl,
  cost,
  address,
  beds,
  baths,
  area,
  status,
}: ListingCardProps) {
  return (
    <a
      href="#"
      className="group bg-white cursor-pointer rounded-xl overflow-hidden border border-slate-200  hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105">
          <img
            src={imgUrl}
            className="w-full h-full object-cover"
            alt={title}
          />
        </div>
        <div className="absolute top-3 right-3">
          <button className="bg-white/90  p-2 rounded-full text-slate-400 hover:text-red-500 transition-colors backdrop-blur-sm">
            <span className="material-symbols-outlined text-xl block">
              <BookHeart />
            </span>
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
            Mới
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-bold text-slate-900 ">
            {/* 2.400.000 */}
            {cost}₫
            <span className="text-sm text-slate-500  font-medium">/tháng</span>
          </h3>
          <span className="text-xs font-bold text-green-600 bg-green-100   px-2 py-1 rounded">
            Đã xác thực
          </span>
        </div>
        <p className="text-slate-900  font-semibold truncate">
          {/* Căn hộ Loft cao cấp trung tâm */}
          {title}
        </p>
        <p className="text-slate-500  text-sm truncate">
          {/* 123 Đường Hai Bà Trưng, Quận 1 */}
          {address}
        </p>
        <div className="w-full h-px bg-slate-100  my-2"></div>
        <div className="flex items-center gap-4 text-slate-600  text-sm">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-lg">
              <Bed />
            </span>
            <span className="font-bold">{beds}</span> PN
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-lg">
              <Bath />
            </span>
            <span className="font-bold">{baths}</span> PT
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-lg">
              <LandPlot />
            </span>
            <span className="font-bold">{area}</span> m²
          </div>
        </div>
      </div>
    </a>
  );
}
