import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Not signed in");

  const images = await db.query.images.findMany({
    where: (image, { eq }) => eq(image.userId, user.userId),
    orderBy: (module, { desc }) => [desc(module.points)],
  });
  return images;
}
