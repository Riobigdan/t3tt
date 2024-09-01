import { SignedIn, SignedOut } from "@clerk/nextjs";
import { headers } from "next/headers";
import Image from "next/image";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="flex h-48 w-48 flex-col">
          <Image
            src={image.url}
            alt={image.name}
            width={192}
            height={192}
            style={{ objectFit: "contain", maxHeight: "100%" }} // objectFit: "contain" 是 CSS 属性， contain 是 CSS 属性，表示图像保持其纵横比，并尽可能大，但完全在容器内
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
