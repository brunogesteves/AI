"use client";
import { useChatInfo } from "@/contexts/contextChat";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface IFileProps {
  name: string;
  id: number;
}

export const SidebarLogic = () => {
  const { slug } = useChatInfo();
  const [files, setFiles] = useState<IFileProps[]>([]);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    // noClick: true,
    // noKeyboard: true,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "text/pdf": [".pdf"],
      "text/csv": [".csv"],
      "audio/mpeg3": [".mp3"],
    },
  });

  function deleteFile(id: number) {
    api.delete(`/files/${id}`).then((res) => {
      if (res.data.status) {
        setFiles(files.filter((file) => file.id !== id));
      }
    });
  }

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
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (slug) {
      api.get(`/files/${slug}`).then((res) => {
        setFiles(res.data.files);
      });
    }
  }, [slug]);

  return {
    data: { files },
    methods: { getRootProps, getInputProps, deleteFile },
  };
};
