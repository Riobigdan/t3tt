import { SignedIn, SignedOut } from "@clerk/nextjs";
import { headers } from "next/headers";
import { getUserData } from "~/server/data";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  const userData = await getUserData();
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="">
          <img
            src={image.url}
            alt={image.name}
            className="h-full max-h-48 w-full max-w-48 object-contain"
          />
          <div className="text-center">{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  headers(); //确保该页面是动态渲染的，而不是静态生成的

  return (
    <main className="">
      <SignedOut>
        <div className="text-center text-2xl font-bold">Please sign in</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
