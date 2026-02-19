import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Edit2, MoreVertical, ThumbsUp, Trash2 } from "lucide-react";
import { useState } from "react";
import WarningModal from "../ui/warningModal";
import DescriptionEditor from "./descriptionEditor";

interface CommentCardProps {
  comment: {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    like_count: number;
    user: {
      full_name: string;
      avatar?: string;
    };
    replies?: any[];
    isLiked?: boolean;
  };
  currentUser?: any;
  onUpdate?: (id: string, content: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onReply?: (parentId: string, content: string) => Promise<void>;
  onLike?: (id: string) => Promise<void>;
  isReply?: boolean;
}

export default function CommentCard({
  comment,
  currentUser,
  onUpdate,
  onDelete,
  onReply,
  onLike,
  isReply = false,
}: CommentCardProps) {
  const { user, content, created_at, id, user_id, replies, like_count = 0, isLiked } = comment;
  const isOwner = currentUser?.id === user_id;
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // States for reply function
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handleUpdate = async () => {
    if (!editContent.trim() || editContent === content) {
      setIsEditing(false);
      return;
    }
    setIsSubmitting(true);
    try {
      if (onUpdate) await onUpdate(id, editContent);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;
    setIsSubmittingReply(true);
    try {
      if (onReply) await onReply(id, replyContent);
      setReplyContent("");
      setIsReplying(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const confirmDelete = async () => {
    try {
      if (onDelete) await onDelete(id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={`flex gap-4 group ${isReply ? "ml-12 sm:ml-16 mt-4" : ""}`}>
        <div className={`${isReply ? "size-8" : "size-10 sm:size-12"} rounded-full overflow-hidden shrink-0 border border-slate-100 shadow-sm`}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.full_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-blue-100 flex items-center justify-center text-primary font-bold ${isReply ? "text-sm" : "text-lg"}`}>
              {user.full_name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 relative">
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className={`font-bold text-slate-900 ${isReply ? "text-sm" : ""}`}>
                  {user.full_name}
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="text-xs text-slate-500">
                  {(() => {
                    try {
                      const dateStr = created_at || (comment as any).createdAt;
                      if (!dateStr) return "Vừa xong";
                      const date = new Date(dateStr);
                      if (isNaN(date.getTime())) return "Vừa xong";
                      return formatDistanceToNow(date, {
                        addSuffix: true,
                        locale: vi,
                      });
                    } catch (e) {
                      return "Vừa xong";
                    }
                  })()}
                </span>
              </div>

              {isOwner && !isEditing && (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-primary transition-colors"
                    title="Chỉnh sửa"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                    title="Xóa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="flex flex-col gap-3">
                <DescriptionEditor
                  value={editContent}
                  onChange={setEditContent}
                  editorAttributes={{
                    class:
                      "prose prose-sm max-w-none focus:outline-none min-h-[100px] px-4 py-3 leading-relaxed",
                  }}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditContent(content);
                    }}
                    className="text-sm font-bold text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg"
                    disabled={isSubmitting}
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 shadow-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`text-slate-700 leading-relaxed prose prose-slate max-w-none ${isReply ? "text-sm" : "text-sm sm:text-base"}`}
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            )}
          </div>
          {!isEditing && (
            <div className="flex gap-4 mt-2 ml-2">
              <button
                onClick={() => onLike && onLike(id)}
                className={`text-xs font-bold transition-colors flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-100 ${isLiked ? "text-primary bg-blue-50" : "text-slate-500 hover:text-primary"}`}
              >
                <ThumbsUp size={14} fill={isLiked ? "currentColor" : "none"} />
                {like_count} Hữu ích
              </button>
              {!isReply && (
                <button 
                  onClick={() => setIsReplying(!isReplying)}
                  className={`text-xs font-bold transition-colors px-2 py-1 rounded hover:bg-slate-100 ${isReplying ? "text-primary bg-slate-100" : "text-slate-500 hover:text-primary"}`}
                >
                  {isReplying ? "Hủy trả lời" : "Trả lời"}
                </button>
              )}
            </div>
          )}

          {/* Reply Form */}
          {isReplying && (
            <div className="mt-4 ml-2 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <DescriptionEditor
                value={replyContent}
                onChange={setReplyContent}
                placeholder={`Trả lời ${user.full_name}...`}
                editorAttributes={{
                  class: "prose prose-sm max-w-none focus:outline-none min-h-[80px] px-4 py-3 leading-relaxed",
                }}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleReplySubmit}
                  disabled={isSubmittingReply || !replyContent.trim()}
                  className="bg-primary hover:bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isSubmittingReply ? "Đang gửi..." : "Gửi câu trả lời"}
                </button>
              </div>
            </div>
          )}

          {/* Sub Replies List */}
          {replies && replies.length > 0 && (
            <div className="flex flex-col">
              {replies.map((reply) => (
                <CommentCard
                  key={reply.id}
                  comment={reply}
                  currentUser={currentUser}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onLike={onLike}
                  isReply={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <WarningModal
          title="Xóa bình luận"
          message="Bạn có chắc chắn muốn xóa bình luận này không? Hành động này không thể hoàn tác."
          closeLabel="Hủy bỏ"
          submitLabel="Xác nhận xóa"
          OnClose={() => setShowDeleteModal(false)}
          OnSubmit={confirmDelete}
        />
      )}
    </>
  );
}
