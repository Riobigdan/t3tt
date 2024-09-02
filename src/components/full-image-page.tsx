import { getImageById } from "~/server/queries";
import { clerkClient } from "@clerk/nextjs/server";

export default async function FullImagePageView(props: { id: number }) {
  const image = await getImageById(props.id);

  const uploadrInfo = image.userId
    ? await clerkClient().users.getUser(image.userId)
    : null;

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
      <div className="m-4 w-72 flex-shrink-0 gap-2">
        <div className="text-center text-xl font-bold">{image.name}</div>

        <div className="flex flex-col p-2">
          <span>Upload By: </span>
          <span>{uploadrInfo?.fullName}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Created On: </span>
          <span>
            {image.createdAt
              .toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\//g, "-")}
          </span>
        </div>
      </div>
    </div>
  );
}
