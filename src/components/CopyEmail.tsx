"use client";

import { useState } from "react";
import { Comic } from "./art";

const EMAIL = "gabedougherty@outlook.com";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard API blocked: fall back to a hidden textarea.
      const t = document.createElement("textarea");
      t.value = EMAIL;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };
  return (
    <Comic as="button" type="button" onClick={copy} bg="#E8202A" shadow={6} className="comic-link cursor-pointer px-6 py-3 text-2xl text-white">
      <span aria-live="polite">{copied ? "EMAIL COPIED!" : EMAIL.toUpperCase()}</span>
    </Comic>
  );
}
