import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Not signed in");

  const images = await db.query.images.findMany({
    where: (image, { eq }) => eq(image.userId, user.userId),
    orderBy: (image, { desc }) => [desc(image.points)],
  });
  return images;
}

export async function getImageById(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Not signed in");

  const image = await db.query.images.findFirst({
    where: (image, { eq }) => eq(image.id, id),
  });
  if (!image) redirect("/");
  if (image.userId !== user.userId) throw new Error("Unauthorized");
  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Not signed in");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  console.log("deleteImage id: ", id);

  revalidatePath("/");
  redirect("/");
}
