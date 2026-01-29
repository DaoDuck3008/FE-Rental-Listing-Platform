"use client";

import { useState } from "react";
import { SendHorizonal, User } from "lucide-react";
import DescriptionEditor from "../common/descriptionEditor";
import CommentCard from "../common/commentCard";

interface ListingCommentsProps {
  userAvatar?: string;
}

export default function ListingComments({ userAvatar }: ListingCommentsProps) {
  const [comment, setComment] = useState("");

  return (
    <div className="mt-10 mb-16 pt-10 border-t border-slate-200">
      <div className="max-w-4xl">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">
          Bình luận &amp; Đánh giá
        </h3>
        <div className="flex gap-4 mb-10">
          <div className="hidden sm:flex size-12 items-center justify-center  shrink-0">
            <img
              src={userAvatar ?? "./NoImage.jpg"}
              className="object-cover size-12 rounded-full"
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <DescriptionEditor
              value={comment}
              onChange={setComment}
              placeholder="Viết bình luận của bạn..."
              editorAttributes={{
                class:
                  "prose prose-sm max-w-none focus:outline-none min-h-[120px] px-4 py-3 leading-relaxed",
              }}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-500">
                Bình luận của bạn sẽ được kiểm duyệt trước khi hiển thị.
              </p>
              <button className="bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                <span>Gửi bình luận</span>
                <span className="material-symbols-outlined text-[18px]">
                  <SendHorizonal size={20} />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <button className="mt-4 px-6 py-3 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors self-center">
            Xem thêm bình luận
          </button>
        </div>
      </div>
    </div>
  );
}
