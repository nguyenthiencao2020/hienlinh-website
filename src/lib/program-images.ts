// Ảnh mặc định cho từng mảng hoạt động, dùng khi chưa có ảnh trong Supabase
// (cover_image_url null). Khi admin tải ảnh thật lên Storage, ảnh trong DB sẽ
// được ưu tiên dùng thay cho ảnh mặc định này.
export const PROGRAM_FALLBACK_IMAGES: Record<string, string> = {
  "giao-duc": "/images/program-giao-duc.webp",
  "y-te": "/images/program-y-te.webp",
  "luu-tru": "/images/program-luu-tru.webp",
  "tam-ly": "/images/program-tam-ly.webp",
  "thien-nguyen": "/images/program-thien-nguyen.webp",
};
