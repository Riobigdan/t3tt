import { SignedIn, SignedOut } from "@clerk/nextjs";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 flex-col">
          <Link href={`/img/${image.id}`} className="relative h-48 w-full">
            <Image
              src={image.url}
              alt={image.name}
              layout="fill"
              style={{ objectFit: "contain" }} // objectFit: "contain" 是 CSS 属性，表示图像保持其纵横比，并尽可能大，但完全在容器内
            />
          </Link>
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
