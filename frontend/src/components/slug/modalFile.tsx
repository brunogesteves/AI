import { useChatInfo } from "@/contexts/contextChat";
import PDFFile from "../files/pdf";
import ExcelFile from "../files/excel";

export default function ModalFile() {
  const { modalRef } = useChatInfo();

  return (
    <dialog ref={modalRef} className="w-full h-full bg-transparent ">
      <div className="bg-black opacity-60 w-full h-full relative"></div>
      <div
        className=" flex flex-col justify-center bg-red-500 w-[calc(100vw_-_14vw)] h-[calc(100vh_-_14vh)] absolute
          top-1/2 transform -translate-x-1/2 -translate-y-1/2 left-1/2 p-2
          rounded-md gap-10 text-3xl"
      >
        {/* <PDFFile /> */}
        <ExcelFile />
      </div>
    </dialog>
  );
}
