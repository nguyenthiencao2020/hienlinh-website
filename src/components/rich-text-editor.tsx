"use client";

import {
  EditorContent,
  Node,
  mergeAttributes,
  useEditor,
  useEditorState,
  type Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Youtube from "@tiptap/extension-youtube";
import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isRichHtml, plainTextToHtml } from "@/lib/rich-text";

const MAX_VIDEO_MB = 50;

const Video = Node.create({
  name: "video",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    return { src: { default: null } };
  },
  parseHTML() {
    return [{ tag: "video[src]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["video", mergeAttributes(HTMLAttributes, { controls: "true", preload: "metadata" })];
  },
});

const TEXT_COLORS = [
  { label: "Xanh thương hiệu", value: "#00663e" },
  { label: "Nâu thương hiệu", value: "#5c3013" },
  { label: "Cam", value: "#d96f10" },
  { label: "Đỏ", value: "#dc2626" },
  { label: "Xanh dương", value: "#2563eb" },
  { label: "Xám", value: "#52525b" },
];

const HIGHLIGHTS = [
  { label: "Vàng", value: "#fef08a" },
  { label: "Xanh lá", value: "#bbf7d0" },
  { label: "Cam", value: "#fed7aa" },
  { label: "Hồng", value: "#fbcfe8" },
  { label: "Xanh dương", value: "#bfdbfe" },
];

export function RichTextEditor({
  name,
  defaultValue,
  uploadFolder,
}: {
  name: string;
  defaultValue?: string | null;
  uploadFolder: string;
}) {
  const initial = defaultValue
    ? isRichHtml(defaultValue)
      ? defaultValue
      : plainTextToHtml(defaultValue)
    : "";
  const [html, setHtml] = useState(initial);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true },
      }),
      Image,
      Video,
      Youtube.configure({ nocookie: true, width: 640, height: 360 }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: initial,
    editorProps: {
      attributes: {
        class:
          "prose prose-zinc max-w-none min-h-[360px] px-5 py-4 focus:outline-none prose-headings:text-brand-green prose-a:text-brand-green prose-img:rounded-xl",
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.isEmpty ? "" : editor.getHTML()),
  });

  return (
    <div className="mt-1 rounded-xl border border-zinc-300 bg-white focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green/10">
      {editor && <Toolbar editor={editor} uploadFolder={uploadFolder} />}
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}

type Menu = "color" | "highlight" | "video" | null;

function Toolbar({ editor, uploadFolder }: { editor: Editor; uploadFolder: string }) {
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<"image" | "video" | null>(null);
  const [menu, setMenu] = useState<Menu>(null);

  const s = useEditorState({
    editor,
    selector: ({ editor }) => ({
      block: editor.isActive("heading", { level: 2 })
        ? "h2"
        : editor.isActive("heading", { level: 3 })
          ? "h3"
          : editor.isActive("heading", { level: 4 })
            ? "h4"
            : "p",
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      underline: editor.isActive("underline"),
      strike: editor.isActive("strike"),
      color: (editor.getAttributes("textStyle").color as string | undefined) ?? null,
      highlight: editor.isActive("highlight"),
      left: editor.isActive({ textAlign: "left" }),
      center: editor.isActive({ textAlign: "center" }),
      right: editor.isActive({ textAlign: "right" }),
      justify: editor.isActive({ textAlign: "justify" }),
      bullet: editor.isActive("bulletList"),
      ordered: editor.isActive("orderedList"),
      quote: editor.isActive("blockquote"),
      link: editor.isActive("link"),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });

  const c = () => editor.chain().focus();

  function setBlock(value: string) {
    if (value === "p") c().setParagraph().run();
    else c().setHeading({ level: Number(value.slice(1)) as 2 | 3 | 4 }).run();
  }

  function toggleLink() {
    if (s.link) {
      c().extendMarkRange("link").unsetLink().run();
      return;
    }
    const url = window.prompt("Dán đường dẫn (https://...)");
    if (url) c().extendMarkRange("link").setLink({ href: url }).run();
  }

  async function upload(file: File, kind: "image" | "video") {
    setUploading(kind);
    const supabase = createClient();
    const path = `${uploadFolder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    setUploading(null);
    if (error) {
      window.alert("Tải lên thất bại: " + error.message);
      return null;
    }
    return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
  }

  async function onImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const url = await upload(file, "image");
    if (url) c().setImage({ src: url, alt: "" }).run();
  }

  async function onVideoFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
      window.alert(
        `Video lớn hơn ${MAX_VIDEO_MB}MB — vui lòng đăng lên YouTube rồi dùng "Dán link YouTube".`,
      );
      return;
    }
    const url = await upload(file, "video");
    if (url) c().insertContent({ type: "video", attrs: { src: url } }).run();
  }

  function onYoutube() {
    setMenu(null);
    const url = window.prompt("Dán link video YouTube");
    if (!url) return;
    const ok = c().setYoutubeVideo({ src: url }).run();
    if (!ok) window.alert("Link YouTube không hợp lệ.");
  }

  return (
    <div className="sticky top-12 z-10 flex flex-wrap items-center gap-0.5 rounded-t-xl border-b border-zinc-200 bg-zinc-50/95 px-2 py-1.5 backdrop-blur">
      <Btn label="Hoàn tác" onClick={() => c().undo().run()} disabled={!s.canUndo}>
        <Ico d={<><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" /></>} />
      </Btn>
      <Btn label="Làm lại" onClick={() => c().redo().run()} disabled={!s.canRedo}>
        <Ico d={<><path d="m15 14 5-5-5-5" /><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" /></>} />
      </Btn>
      <Sep />
      <select
        aria-label="Kiểu đoạn văn"
        value={s.block}
        onChange={(e) => setBlock(e.target.value)}
        className="h-8 rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-700 hover:border-zinc-300 focus:border-brand-green focus:outline-none"
      >
        <option value="p">Đoạn văn</option>
        <option value="h2">Tiêu đề lớn</option>
        <option value="h3">Tiêu đề vừa</option>
        <option value="h4">Tiêu đề nhỏ</option>
      </select>
      <Sep />
      <Btn label="In đậm (Ctrl+B)" active={s.bold} onClick={() => c().toggleBold().run()}>
        <Ico d={<path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />} />
      </Btn>
      <Btn label="In nghiêng (Ctrl+I)" active={s.italic} onClick={() => c().toggleItalic().run()}>
        <Ico d={<><line x1="19" x2="10" y1="4" y2="4" /><line x1="14" x2="5" y1="20" y2="20" /><line x1="15" x2="9" y1="4" y2="20" /></>} />
      </Btn>
      <Btn label="Gạch chân (Ctrl+U)" active={s.underline} onClick={() => c().toggleUnderline().run()}>
        <Ico d={<><path d="M6 4v6a6 6 0 0 0 12 0V4" /><line x1="4" x2="20" y1="20" y2="20" /></>} />
      </Btn>
      <Btn label="Gạch ngang" active={s.strike} onClick={() => c().toggleStrike().run()}>
        <Ico d={<><path d="M16 4H9a3 3 0 0 0-2.83 4" /><path d="M14 12a4 4 0 0 1 0 8H6" /><line x1="4" x2="20" y1="12" y2="12" /></>} />
      </Btn>
      <div className="relative">
        <Btn label="Màu chữ" active={!!s.color} onClick={() => setMenu(menu === "color" ? null : "color")}>
          <span className="flex flex-col items-center leading-none">
            <span className="text-sm font-bold">A</span>
            <span className="mt-0.5 h-1 w-4 rounded-full" style={{ background: s.color ?? "#18181b" }} />
          </span>
        </Btn>
        {menu === "color" && (
          <Swatches
            items={TEXT_COLORS}
            resetLabel="Màu mặc định"
            onPick={(v) => {
              if (v) c().setColor(v).run();
              else c().unsetColor().run();
              setMenu(null);
            }}
          />
        )}
      </div>
      <div className="relative">
        <Btn label="Tô nền chữ" active={s.highlight} onClick={() => setMenu(menu === "highlight" ? null : "highlight")}>
          <Ico d={<><path d="m9 11-6 6v3h9l3-3" /><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" /></>} />
        </Btn>
        {menu === "highlight" && (
          <Swatches
            items={HIGHLIGHTS}
            resetLabel="Bỏ tô nền"
            onPick={(v) => {
              if (v) c().setHighlight({ color: v }).run();
              else c().unsetHighlight().run();
              setMenu(null);
            }}
          />
        )}
      </div>
      <Sep />
      <Btn label="Căn trái" active={s.left} onClick={() => c().setTextAlign("left").run()}>
        <Ico d={<><path d="M21 6H3" /><path d="M15 12H3" /><path d="M17 18H3" /></>} />
      </Btn>
      <Btn label="Căn giữa" active={s.center} onClick={() => c().setTextAlign("center").run()}>
        <Ico d={<><path d="M21 6H3" /><path d="M17 12H7" /><path d="M19 18H5" /></>} />
      </Btn>
      <Btn label="Căn phải" active={s.right} onClick={() => c().setTextAlign("right").run()}>
        <Ico d={<><path d="M21 6H3" /><path d="M21 12H9" /><path d="M21 18H7" /></>} />
      </Btn>
      <Btn label="Căn đều 2 bên" active={s.justify} onClick={() => c().setTextAlign("justify").run()}>
        <Ico d={<><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>} />
      </Btn>
      <Sep />
      <Btn label="Danh sách chấm" active={s.bullet} onClick={() => c().toggleBulletList().run()}>
        <Ico d={<><path d="M3 12h.01" /><path d="M3 18h.01" /><path d="M3 6h.01" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M8 6h13" /></>} />
      </Btn>
      <Btn label="Danh sách số" active={s.ordered} onClick={() => c().toggleOrderedList().run()}>
        <Ico d={<><path d="M10 12h11" /><path d="M10 18h11" /><path d="M10 6h11" /><path d="M4 10h2" /><path d="M4 6h1v4" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" /></>} />
      </Btn>
      <Btn label="Trích dẫn" active={s.quote} onClick={() => c().toggleBlockquote().run()}>
        <Ico d={<><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /></>} />
      </Btn>
      <Btn label="Đường kẻ ngang" onClick={() => c().setHorizontalRule().run()}>
        <Ico d={<path d="M5 12h14" />} />
      </Btn>
      <Sep />
      <Btn label={s.link ? "Bỏ liên kết" : "Chèn liên kết"} active={s.link} onClick={toggleLink}>
        <Ico d={<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>} />
      </Btn>
      <Btn label={uploading === "image" ? "Đang tải ảnh…" : "Chèn ảnh"} onClick={() => imageRef.current?.click()} disabled={!!uploading}>
        {uploading === "image" ? <Spinner /> : (
          <Ico d={<><rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21" /></>} />
        )}
      </Btn>
      <div className="relative">
        <Btn label={uploading === "video" ? "Đang tải video…" : "Chèn video"} onClick={() => setMenu(menu === "video" ? null : "video")} disabled={!!uploading}>
          {uploading === "video" ? <Spinner /> : (
            <Ico d={<><path d="m16 13 5.22 3.48a.5.5 0 0 0 .78-.42V7.87a.5.5 0 0 0-.76-.43L16 10.5" /><rect x="2" y="6" width="14" height="12" rx="2" /></>} />
          )}
        </Btn>
        {menu === "video" && (
          <div className="absolute right-0 top-full z-20 mt-1 w-56 rounded-lg border border-zinc-200 bg-white py-1 text-sm shadow-lg">
            <button type="button" onClick={onYoutube} className="block w-full px-3 py-2 text-left text-zinc-700 hover:bg-zinc-50">
              Dán link YouTube
            </button>
            <button
              type="button"
              onClick={() => {
                setMenu(null);
                videoRef.current?.click();
              }}
              className="block w-full px-3 py-2 text-left text-zinc-700 hover:bg-zinc-50"
            >
              Tải file video (tối đa {MAX_VIDEO_MB}MB)
            </button>
          </div>
        )}
      </div>
      <Sep />
      <Btn label="Xoá định dạng" onClick={() => c().unsetAllMarks().clearNodes().run()}>
        <Ico d={<><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" /><path d="M22 21H7" /><path d="m5 11 9 9" /></>} />
      </Btn>
      <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={onImage} />
      <input ref={videoRef} type="file" accept="video/mp4,video/webm,video/quicktime" className="hidden" onChange={onVideoFile} />
    </div>
  );
}

function Btn({
  label,
  active,
  onClick,
  disabled,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-8 min-w-[30px] items-center justify-center rounded-md px-1 transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
        active ? "bg-brand-green/15 text-brand-green" : "text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-900"
      }`}
    >
      {children}
    </button>
  );
}

function Ico({ d }: { d: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      {d}
    </svg>
  );
}

function Spinner() {
  return <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-green/25 border-t-brand-green" />;
}

function Sep() {
  return <span className="mx-0.5 h-6 w-px bg-zinc-200" />;
}

function Swatches({
  items,
  resetLabel,
  onPick,
}: {
  items: { label: string; value: string }[];
  resetLabel: string;
  onPick: (value: string | null) => void;
}) {
  return (
    <div className="absolute left-0 top-full z-20 mt-1 w-48 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg">
      <div className="grid grid-cols-6 gap-1.5">
        {items.map((it) => (
          <button
            key={it.value}
            type="button"
            title={it.label}
            aria-label={it.label}
            onClick={() => onPick(it.value)}
            className="h-6 w-6 rounded-full border border-black/10 transition-transform hover:scale-110"
            style={{ background: it.value }}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => onPick(null)}
        className="mt-2 w-full rounded-md px-2 py-1 text-left text-xs text-zinc-600 hover:bg-zinc-50"
      >
        {resetLabel}
      </button>
    </div>
  );
}
