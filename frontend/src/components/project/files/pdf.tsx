import { IOpenFileProps } from "@/utils/types";

export default function PDFFile({
  fileName,
  projectId,
  userId,
}: IOpenFileProps) {
  console.log(fileName);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <iframe
        src={`${process.env.NEXT_PUBLIC_API_URL_FILES}/${userId}/${projectId}/${fileName}`}
        // src={`http://localhost:3001/src/files/7/3/${fileName}`}
        width="90%"
        height="90%"
        style={{ border: "none" }}
      />
    </div>
  );
}
