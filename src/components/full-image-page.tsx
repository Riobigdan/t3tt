import { deleteImage, getImageById } from "~/server/queries";
import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function FullImagePageView(props: { id: number }) {
  console.log("FullImagePageView props: ", props);
  const image = await getImageById(props.id);

  const uploadrInfo = image.userId
    ? await clerkClient().users.getUser(image.userId)
    : null;

  return (
    <div className="flex h-full w-full">
      <div className="flex-grow">
        <div className="flex h-full items-center justify-center">
          <img
            src={image.url}
            alt={image.name}
            className="h-3/4 w-3/5 object-contain"
          />
        </div>
      </div>
      <div className="m-4 flex w-72 flex-shrink-0 flex-col justify-center gap-2">
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

        <div className="p-2">
          <form
            action={async () => {
              "use server";

              await deleteImage(props.id);
            }}
          >
            <Button variant="destructive" type="submit">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
