"use client";

import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isRichHtml, plainTextToHtml } from "@/lib/rich-text";

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
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true },
      }),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: initial,
    editorProps: {
      attributes: {
        class:
          "prose prose-zinc max-w-none min-h-[320px] px-4 py-3 focus:outline-none prose-headings:text-brand-green prose-a:text-brand-green prose-img:rounded-xl",
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.isEmpty ? "" : editor.getHTML()),
  });

  return (
    <div className="mt-1 overflow-hidden rounded-lg border border-zinc-300 focus-within:border-brand-green">
      {editor && <Toolbar editor={editor} uploadFolder={uploadFolder} />}
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}

function Toolbar({ editor, uploadFolder }: { editor: Editor; uploadFolder: string }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const s = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      underline: editor.isActive("underline"),
      h2: editor.isActive("heading", { level: 2 }),
      h3: editor.isActive("heading", { level: 3 }),
      bullet: editor.isActive("bulletList"),
      ordered: editor.isActive("orderedList"),
      quote: editor.isActive("blockquote"),
      link: editor.isActive("link"),
      left: editor.isActive({ textAlign: "left" }),
      center: editor.isActive({ textAlign: "center" }),
      justify: editor.isActive({ textAlign: "justify" }),
    }),
  });

  function toggleLink() {
    if (s.link) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const url = window.prompt("Dán đường dẫn (https://...)");
    if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = createClient();
    const path = `${uploadFolder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      window.alert("Tải ảnh lên thất bại: " + error.message);
    } else {
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      editor.chain().focus().setImage({ src: data.publicUrl, alt: "" }).run();
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  const c = () => editor.chain().focus();

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-zinc-200 bg-zinc-50 px-2 py-1.5">
      <Btn active={s.bold} title="In đậm" onClick={() => c().toggleBold().run()}>
        <b>B</b>
      </Btn>
      <Btn active={s.italic} title="In nghiêng" onClick={() => c().toggleItalic().run()}>
        <i>I</i>
      </Btn>
      <Btn active={s.underline} title="Gạch chân" onClick={() => c().toggleUnderline().run()}>
        <u>U</u>
      </Btn>
      <Sep />
      <Btn active={s.h2} title="Tiêu đề lớn" onClick={() => c().toggleHeading({ level: 2 }).run()}>
        H2
      </Btn>
      <Btn active={s.h3} title="Tiêu đề nhỏ" onClick={() => c().toggleHeading({ level: 3 }).run()}>
        H3
      </Btn>
      <Sep />
      <Btn active={s.bullet} title="Danh sách chấm" onClick={() => c().toggleBulletList().run()}>
        • List
      </Btn>
      <Btn active={s.ordered} title="Danh sách số" onClick={() => c().toggleOrderedList().run()}>
        1. List
      </Btn>
      <Btn active={s.quote} title="Trích dẫn" onClick={() => c().toggleBlockquote().run()}>
        “ ”
      </Btn>
      <Sep />
      <Btn active={s.left} title="Căn trái" onClick={() => c().setTextAlign("left").run()}>
        Trái
      </Btn>
      <Btn active={s.center} title="Căn giữa" onClick={() => c().setTextAlign("center").run()}>
        Giữa
      </Btn>
      <Btn active={s.justify} title="Căn đều" onClick={() => c().setTextAlign("justify").run()}>
        Đều
      </Btn>
      <Sep />
      <Btn active={s.link} title={s.link ? "Bỏ liên kết" : "Chèn liên kết"} onClick={toggleLink}>
        {s.link ? "Bỏ link" : "Link"}
      </Btn>
      <Btn title="Chèn ảnh" onClick={() => fileRef.current?.click()} disabled={uploading}>
        {uploading ? "Đang tải..." : "Ảnh"}
      </Btn>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={uploadImage} />
      <Sep />
      <Btn title="Hoàn tác" onClick={() => c().undo().run()}>
        ↶
      </Btn>
      <Btn title="Làm lại" onClick={() => c().redo().run()}>
        ↷
      </Btn>
    </div>
  );
}

function Btn({
  active,
  title,
  onClick,
  disabled,
  children,
}: {
  active?: boolean;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`rounded px-2 py-1 text-sm transition-colors disabled:opacity-50 ${
        active ? "bg-brand-green text-white" : "text-zinc-700 hover:bg-zinc-200"
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span className="mx-1 h-5 w-px bg-zinc-300" />;
}
