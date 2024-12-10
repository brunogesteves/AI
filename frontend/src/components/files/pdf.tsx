import { useChatInfo } from "@/contexts/contextChat";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { IoCloseCircleSharp } from "react-icons/io5";

export default function PDFFile() {
  const { slug, fileName, setIsModalopen } = useChatInfo();
  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl={`${process.env.NEXT_PUBLIC_FILE_SOURCE}/${slug}/${fileName}`}
        />
      </Worker>
      {/* <div></div> */}
      <button
        className="absolute top-3 left-3"
        onClick={() => setIsModalopen(false)}
      >
        <IoCloseCircleSharp color="red" />
      </button>
    </>
  );
}

// `${process.env.NEXT_PUBLIC_FILE_SOURCE}/${slug}/${fileName}`
