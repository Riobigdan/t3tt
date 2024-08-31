"use client";

import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";

export default function TopNav() {
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 p-4 text-xl">
      <Link href="/">Home</Link>
      <Link href="/layer2">Layer 2</Link>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              router.refresh();
              console.log("upload complete");
            }}
          />
          <UserButton />
        </div>
      </SignedIn>
    </nav>
  );
}
