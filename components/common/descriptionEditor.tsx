"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useState, useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./toolBar";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function DescriptionEditor({ value, onChange }: Props) {
  // Force re-render when selection changes so Toolbar updates
  const [, forceUpdate] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Nhập mô tả chi tiết...",
      }),
    ],
    content: value || "", // Changed default empty content to empty string to let placeholder work
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    onTransaction() {
      forceUpdate((n) => n + 1);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[200px] px-4 py-3 leading-relaxed",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="input-field border border-gray-200 rounded-xl bg-white  focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300 shadow-sm hover:border-gray-300">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
