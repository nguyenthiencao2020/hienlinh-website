// Bài viết cũ lưu văn bản thuần; bài soạn bằng trình soạn Tiptap lưu HTML.
export function isRichHtml(content: string) {
  return /<(p|h[1-6]|ul|ol|blockquote|img)\b/i.test(content);
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function plainTextToHtml(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br>")}</p>`)
    .join("");
}
