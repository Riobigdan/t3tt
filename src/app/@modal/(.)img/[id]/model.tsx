"use client";

import { Children, ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import React from "react";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    // dialog 是 HTML 内置的对话框组件
    <dialog
      ref={dialogRef}
      onClose={onDismiss}
      className="m-0 h-screen w-screen bg-zinc-900/50 text-white backdrop-blur-xl"
    >
      {children}
      {/* <button onClick={onDismiss}>Close</button> */}
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
