import { CloudUpload, Star, Trash2, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadListingImage({
  setFileCallback,
  setCoverImageCallback,
}: {
  setFileCallback: (files: File[] | null) => void;
  setCoverImageCallback?: (coverImageIndex: number) => void;
}) {
  const [coverImage, setCoverImage] = useState<string>("");
  const [previews, setPreviews] = useState<string[]>([]);
  const [file, setFile] = useState<File[] | null>(null);

  // useEffect to notify parent about cover image changes
  useEffect(() => {
    if (coverImage && previews.length > 0) {
      const coverIndex = previews.indexOf(coverImage);
      if (coverIndex !== -1) {
        setCoverImageCallback?.(coverIndex);
      }
    }
  }, [coverImage, previews, setCoverImageCallback]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      const newFiles = [...(file || []), ...acceptedFiles];

      setFile(newFiles);
      setFileCallback(newFiles);

      const imgUrls = acceptedFiles.map((img) => URL.createObjectURL(img));

      setPreviews((prev) => {
        const newPreviews = [...prev, ...imgUrls];
        return newPreviews;
      });

      // Set first image as cover if no cover exists
      if (!coverImage && imgUrls[0]) {
        setCoverImage(imgUrls[0]);
      }
    },
    [file, setFileCallback, coverImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    maxFiles: 20,
    multiple: true,
    maxSize: 10 * 1024 * 1024,
  });

  const removeImage = (index: number) => {
    if (!file) return;

    const newFiles = file.filter((_, i) => i !== index);
    setFile(newFiles);
    setFileCallback(newFiles);

    const imageToRemove = previews[index];
    const newPreviews = previews.filter((_, i) => i !== index);

    URL.revokeObjectURL(imageToRemove);
    setPreviews(newPreviews);

    // If removed image was the cover, set first image as new cover
    if (coverImage === imageToRemove) {
      setCoverImage(newPreviews[0] || "");
    }
  };

  return (
    <>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-primary/40 rounded-xl bg-primary/5 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/10 transition-colors gap-4 group"
      >
        <div className="size-16 bg-white rounded-full flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-3xl">
            {isDragActive ? <Upload /> : <CloudUpload />}
          </span>
        </div>

        <input {...getInputProps()} />

        <div>
          <p className="text-text-main font-bold text-lg">
            Bấm để chọn ảnh hoặc kéo thả vào đây
          </p>
          <p className="text-text-secondary text-sm mt-1">
            Nên đăng ít nhất 3-5 ảnh rõ nét (định dạng JPG, PNG)
          </p>
        </div>
        <button
          className="px-4 py-2 bg-white text-primary text-sm font-bold rounded-lg shadow-sm border border-input-border hover:bg-gray-50 cursor-pointer"
          type="button"
        >
          Chọn ảnh
        </button>
      </div>

      {/* Preview Images */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {previews.length > 0 &&
          previews.map((img, index) => (
            <div
              key={img} // hoặc key={index} (tạm chấp nhận)
              className="relative aspect-4/3 rounded-lg overflow-hidden group border border-border-color bg-gray-100"
            >
              <img
                alt={`Preview Image ${index + 1}`}
                className="w-full h-full object-cover"
                src={img}
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {coverImage !== img && (
                  <button
                    type="button"
                    title="Đặt làm ảnh bìa"
                    onClick={() => setCoverImage(img)}
                    className="size-8 rounded-full bg-white text-text-main hover:bg-gray-50 flex items-center justify-center"
                  >
                    <Star size={15} />
                  </button>
                )}

                <button
                  type="button"
                  title="Xóa"
                  className="size-8 rounded-full bg-white text-red-500 hover:bg-red-50 flex items-center justify-center"
                  onClick={() => removeImage(index)}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {coverImage === img && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  Ảnh bìa
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
}
