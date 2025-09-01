import { IOpenFileProps } from "@/utils/types";

export default function AudioFile({
  fileName,
  projectId,
  userId,
}: IOpenFileProps) {
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <audio controls>
        <source
          src={`${process.env.NEXT_PUBLIC_API_URL_FILES}/${userId}/${projectId}/${fileName}`}
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}
