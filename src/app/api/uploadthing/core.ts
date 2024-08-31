//Note: /server 能加载的时候只加载server部分 这样更快
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

const f = createUploadthing();

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      const user = auth();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      const optimizedName = optimizeName(file.name);
      await db.insert(images).values({
        name: optimizedName,
        url: file.url,
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

function optimizeName(fileName: string): string {
  const nameWithoutExtension = fileName.replace(/\.[^.]+$/, "");
  const optimizedName = nameWithoutExtension.replace(/_logo.*$/, "");
  return optimizedName.replace(/_/g, " ").trim();
}

/* file Structure
file UploadedFileData {
  name: 'Nottingham_Forest_F.C._logo.svg',
  size: 36064,
  type: 'image',
  key: 'd6ed1367-bc38-4bb5-89dc-323d995262e0-g7pgvk.C._logo.svg',
  url: 'https://utfs.io/f/d6ed1367-bc38-4bb5-89dc-323d995262e0-g7pgvk.C._logo.svg',
  customId: null  
}
*/
