"use client";

import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";
import { useUploadThing } from "~/utils/uploadthing";

type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFile = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFile);
    console.log(result);
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export function SimpleUploadButton() {
  const router = useRouter();
  const posthog = usePostHog();
  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin: () => {
      posthog.capture("upload_begin");
      toast("Uploading...", {
        description: "Please wait while we upload your image...",
        duration: 10000,
        id: "upload-toast",
      });
    },
    onUploadError: (error) => {
      posthog.capture("upload_error", { error: error.message });
      toast.dismiss("upload-toast");
      toast(`Error: ${error.message} Rate: 10/100s`, {
        duration: 10000,
        id: "upload-error",
      });
    },
    onClientUploadComplete: () => {
      toast.dismiss("upload-toast");
      toast("Upload complete");
      posthog.capture("upload_complete");
      router.refresh();
    },
  });
  return (
    <div>
      <label className="cursor-pointer" htmlFor="imageUploader">
        <UploadSVG className="transition-transform hover:-translate-y-1" />
      </label>
      <input
        {...inputProps}
        id="imageUploader"
        type="file"
        className="sr-only"
      />
    </div>
  );
}

function UploadSVG({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`size-6 ${className ?? ""}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}
