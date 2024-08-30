import { headers } from "next/headers";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  headers(); //确保该页面是动态渲染的，而不是静态生成的
  const images = await db.query.images.findMany({
    orderBy: (module, { desc }) => [desc(module.points)],
  });

  return (
    <main className="">
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
      <h1>Hello World</h1>
    </main>
  );
}
