import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

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
  if (!image) throw new Error("Image not found");
  if (image.userId !== user.userId) throw new Error("Unauthorized");
  return image;
}
