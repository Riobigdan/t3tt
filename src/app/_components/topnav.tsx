import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./upload-button";

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 p-4 text-xl">
      <Link href="/">Home</Link>
      <Link href="/layer2">Layer 2</Link>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
          {/* <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              router.refresh();
              console.log("upload complete");
            }}
          /> */}
          <SimpleUploadButton />
          <UserButton />
        </div>
      </SignedIn>
    </nav>
  );
}
