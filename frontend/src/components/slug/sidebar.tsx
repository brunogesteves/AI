"use client";
import { useChatInfo } from "@/contexts/contextChat";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface IFileProps {
  name: string;
}

export default function Sidebar() {
  const { slug } = useChatInfo();
  const [files, setFiles] = useState<IFileProps[]>([]);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    // noClick: true,
    // noKeyboard: true,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      formData.append("userId", slug);
      try {
        api
          .post("/files", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setFiles((files) => [...files, res.data.files]);
            console.log(res.data.files);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (slug) {
      console.log(slug);
      api.get(`/files/${slug}`).then((res) => {
        setFiles(res.data.files);
        console.log(res.data);
      });
    }
  }, [slug]);

  console.log(files);

  return (
    <div className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {/* <p>Drag 'n' drop some files here</p> */}
        <button type="button">Open File Dialog</button>
      </div>
      <aside>
        <h4>Files</h4>
        {files?.map((file, i) => {
          return (
            <div
              key={i}
              className="my-5 py-2  bg-green-500 text-black rounded-lg text-center cursor-pointer"
            >
              <button>{file?.name?.toLocaleUpperCase()}</button>
            </div>
          );
        })}
      </aside>
    </div>
  );
}
