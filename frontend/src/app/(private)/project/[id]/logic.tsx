import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import {
  IConversationProps,
  IFileProps,
  IParamsId,
  IUserProps,
} from "@/utils/types";
import { api } from "@/utils/api";
import PDFFile from "@/components/project/files/pdf";
import ImageFile from "@/components/project/files/image";
import AudioFile from "@/components/project/files/audio";
import ExcelFile from "@/components/project/files/excel";

export const ProjectIdLogic = (props: IParamsId) => {
  const router = useRouter();

  const [projectId, setProjectId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);

  const [isModalopen, setIsModalopen] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [conversation, setConversation] = useState<IConversationProps[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [historicHasBeenReloaded, setHistoricHasBeenReloaded] =
    useState<boolean>(false);
  const [files, setFiles] = useState<IFileProps[]>([]);
  const [choosedFile, setChoosedFile] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function getProJectId() {
    const { id } = await props.params;
    setProjectId(Number(id));
  }

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    // noClick: true,
    // noKeyboard: true,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "text/pdf": [".pdf"],
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

  function openFile(fileName: string) {
    const extension = fileName?.toLowerCase().split(".").pop();

    switch (extension) {
      case "pdf":
        return (
          <PDFFile fileName={fileName} projectId={projectId} userId={userId} />
        );
      case "png":
        return (
          <ImageFile
            fileName={fileName}
            projectId={projectId}
            userId={userId}
          />
        );
      case "jpg":
        return (
          <ImageFile
            fileName={fileName}
            projectId={projectId}
            userId={userId}
          />
        );
      case "mp3":
        return (
          <AudioFile
            fileName={fileName}
            projectId={projectId}
            userId={userId}
          />
        );
      case "xlsx":
        return (
          <ExcelFile
            fileName={fileName}
            projectId={projectId}
            userId={userId}
          />
        );
      case "csv":
        return (
          <ExcelFile
            fileName={fileName}
            projectId={projectId}
            userId={userId}
          />
        );
      default:
        break;
    }
  }

  async function askAI(question: string) {
    console.log("perguntou para AI");
    try {
      setLoading(true);
      setHistoricHasBeenReloaded(true);

      setConversation((prev) => {
        const newcontent: IConversationProps[] = [
          { role: "user", parts: [{ text: question }] },
          { role: "model", parts: [{ text: "" }] },
        ];
        const updated = [...prev, ...newcontent];

        return updated;
      });

      api
        .post(`/askai`, { question, choosedFile, projectId, userId })
        .then((res) => {
          if (res.data.status) {
            setLoading(false);
            setConversation(res.data.answer.history);
            setQuestion("");
          }
        });
    } catch (error) {
      console.log(error);
    }
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
    api.get(`/askai/historyChat/${projectId}`).then((res) => {
      if (res.data.status) setConversation(res.data.chatHistory);
    });
  }, [projectId]);

  useEffect(() => {
    getProJectId();
    const token = Cookies.get("token");
    if (token) {
      const infoToken: IUserProps = jwtDecode(token);
      setUserId(infoToken.id ?? 0);
    }
  }, []);

  // console.log(conversation);
  return {
    data: {
      projectId,
      files,
      isModalopen,
      fileName,
      conversation,
      question,
      historicHasBeenReloaded,
      loading,
      router,
    },
    methods: {
      getRootProps,
      getInputProps,
      deleteFile,
      setChoosedFile,
      setIsModalopen,
      setFileName,
      openFile,
      setHistoricHasBeenReloaded,
      setQuestion,
      askAI,
    },
  };
};
