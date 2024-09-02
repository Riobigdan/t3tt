import { getImageById } from "~/server/queries";

export default async function FullImagePageView(props: { id: number }) {
  const image = await getImageById(props.id);
  return (
    <div className="flex h-full w-full">
      <div className="flex-grow">
        {/* <div className="flex aspect-[16/9] items-center justify-center rounded-lg"> */}
        <div className="flex h-full items-center justify-center rounded-lg">
          <img
            src={image.url}
            alt={image.name}
            className="h-3/4 w-3/5 object-contain"
          />
        </div>
      </div>
      <div className="m-4 w-96 flex-shrink-0">
        <div className="text-2xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}
