import Link from "next/link";

const mockedUrls = [
  "https://picsum.photos/500/300",
  "https://picsum.photos/500/300",
  "https://picsum.photos/500/300",
];

const mockedImages = mockedUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
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
