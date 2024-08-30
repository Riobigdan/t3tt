import { db } from "~/server/db";

const mockedUrls = [
  "https://picsum.photos/500/300",
  "https://picsum.photos/500/300",
  "https://picsum.photos/500/300",
];

const mockedImages = mockedUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log("🐛 ~ file: page.tsx:17 ~ HomePage ~ posts:", posts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id} className="w-48">
            <h2>{post.name}</h2>
          </div>
        ))}
        {mockedImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt={`Image ${image.id}`} />
          </div>
        ))}
      </div>
      <h1>Hello World</h1>
    </main>
  );
}
