import { Star } from "lucide-react";

export default function CommentCard() {
  return (
    <div className="flex gap-4 group">
      <div className="size-10 sm:size-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-lg shrink-0">
        T
      </div>
      <div className="flex-1">
        <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="font-bold text-slate-900">Trần Minh Tâm</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="text-xs text-slate-500">2 ngày trước</span>
            </div>
            <div className="flex text-yellow-400 text-[16px]">
              <span className="material-symbols-outlined icon-filled text-sm">
                <Star />
              </span>
              <span className="material-symbols-outlined icon-filled text-sm">
                <Star />
              </span>
              <span className="material-symbols-outlined icon-filled text-sm">
                <Star />
              </span>
              <span className="material-symbols-outlined icon-filled text-sm">
                <Star />
              </span>
              <span className="material-symbols-outlined icon-filled text-sm">
                <Star />
              </span>
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Căn hộ y hình, view sông cực chill vào buổi chiều. Chủ nhà hỗ trợ
            nhiệt tình, thủ tục nhanh gọn. Rất đáng tiền!
          </p>
        </div>
        <div className="flex gap-4 mt-2 ml-2">
          <button className="text-xs font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-base">
              thumb_up
            </span>
            Hữu ích
          </button>
          <button className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">
            Trả lời
          </button>
        </div>
      </div>
    </div>
  );
}
