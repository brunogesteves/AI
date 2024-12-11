import { useChatInfo } from "@/contexts/contextChat";
import PDFFile from "../files/pdf";
import ExcelFile from "../files/excel";
import ImageFile from "../files/image";

export default function ModalFile() {
  const { modalRef, fileName } = useChatInfo();

  function typeOfFile(fileName: string) {
    const extension = fileName?.split(".").pop();
    switch (extension) {
      case "pdf":
        return <PDFFile />;
        break;
      case "png":
        return <ImageFile />;
        break;
      case "jpg":
        return <ImageFile />;
        break;

      default:
        return <ExcelFile />;
    }
  }

  return (
    <dialog ref={modalRef} className="w-full h-full bg-transparent ">
      <div className="bg-black opacity-60 w-full h-full relative"></div>
      <div
        className=" flex flex-col justify-center bg-red-500 w-[calc(100vw_-_14vw)] h-[calc(100vh_-_14vh)] absolute
          top-1/2 transform -translate-x-1/2 -translate-y-1/2 left-1/2 p-2
          rounded-md gap-10 text-3xl"
      >
        {fileName != "" && typeOfFile(fileName)}
      </div>
    </dialog>
  );
}
