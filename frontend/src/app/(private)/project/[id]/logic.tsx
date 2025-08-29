import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import { IFileProps, IParamsId, IUserProps } from "@/utils/types";
import { api } from "@/utils/api";

export const ProjectIdLogic = (props: IParamsId) => {
  const [projectId, setProjectId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [choosedFile, setChoosedFile] = useState<string>("");
  const [isModalopen, setIsModalopen] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [contentConversation, setContentConversation] = useState<[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState();

  async function getProJectId() {
    const { id } = await props.params;
    setProjectId(Number(id));
  }

  //sidebar

  const [files, setFiles] = useState<IFileProps[]>([
    {
      name: "",
      id: 0,
    },
  ]);
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
    console.log(id);
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
      formData.append("projectId", projectId.toString());
      formData.append("userId", userId.toString());
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
    if (projectId > 0) {
      api.get(`/project/files/${projectId}`).then((res) => {
        setFiles(res.data.files[0].files);
      });
    }
  }, [projectId]);

  //modal

  function openFile(fileName: string) {
    const extension = fileName?.toLowerCase().split(".").pop();
    switch (extension) {
      case "pdf":
        return <PDFFile />;
      case "png":
        return <ImageFile />;
      case "jpg":
        return <ImageFile />;
      case "mp3":
        return <AudioFile />;
      case "xlsx":
        return <ExcelFile />;
      case "csv":
        return <ExcelFile />;
      default:
        break;
    }
  }

  function askAI(question: string) {
    console.log(question);
  }

  useEffect(() => {
    getProJectId();
    const token = Cookies.get("token");
    if (token) {
      const infoToken: IUserProps = jwtDecode(token);
      setUserId(infoToken.id ?? 0);
    }
  }, []);

  return {
    data: {
      projectId,
      files,
      choosedFile,
      isModalopen,
      fileName,
      contentConversation,
      question,
      isButtonDisabled,
    },
    methods: {
      getRootProps,
      getInputProps,
      deleteFile,
      setChoosedFile,
      setIsModalopen,
      setFileName,
      openFile,
      setContentConversation,
      setQuestion,
      askAI,
      setIsButtonDisabled,
    },
  };
};
