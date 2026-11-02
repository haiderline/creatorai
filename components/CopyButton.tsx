"use client";
import { useState } from "react";
import { copyText } from "@/lib/clipboard";

export function CopyButton({ text, label = "Copy", className = "btn-ghost" }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        if (await copyText(text)) {
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        }
      }}
    >
      <span aria-live="polite">{done ? "Copied" : label}</span>
    </button>
  );
}

export function DownloadButton({ text, filename, label = "Download .txt", className = "btn-ghost" }: { text: string; filename: string; label?: string; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const url = URL.createObjectURL(new Blob([text + "\n"], { type: "text/plain;charset=utf-8" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      }}
    >
      {label}
    </button>
  );
}
