/* 
(.)photo/[id]/page.tsx 
(.) 表示当前目录 photo 表示当前目录下的一个子目录
[id] 表示一个动态路由参数，id 是参数名，可以自定义
page.tsx 表示当前目录下的一个页面文件
*/
import React from "react";
import { Modal } from "./model";
import FullImagePageView from "~/components/full-image-page";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (isNaN(idAsNumber)) throw new Error("Invalid photo id");
  return (
    <Modal>
      <FullImagePageView id={idAsNumber} />
    </Modal>
  );
}
