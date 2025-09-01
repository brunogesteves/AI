import { IOpenFileProps } from "@/utils/types";
import Image from "next/image";

export default function ImageFile({
  fileName,
  projectId,
  userId,
}: IOpenFileProps) {
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL_FILES}/${userId}/${projectId}/${fileName}`}
        alt="image"
        style={{ width: "50%", height: "auto" }}
        width={500}
        height={0}
      />
    </div>
  );
}
