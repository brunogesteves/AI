import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import { api } from "@/utils/api";
import { useChatInfo } from "@/contexts/contextChat";
import {
  useInfoIUserSettingsInfo,
  UserSettingsProvider,
} from "@/contexts/contextUser";

interface FileProps {
  id: number;
  name: string;
}

export const ModalFilesLogic = () => {
  const { projectId, setChoosedFile, choosedFile } = useChatInfo();
  const { userSettings } = useInfoIUserSettingsInfo();
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadtFiles, seUploadtFiles] = useState<
    DocumentPicker.DocumentPickerAsset[]
  >([]);
  const [files, setFiles] = useState<FileProps[]>([]);
  const [image, setImage] = useState<string | null>(null);

  async function getfiles() {
    try {
      await api.get(`/project/files/${projectId}`).then((res) => {
        setFiles(res.data.files[0].files);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadDocs() {
    try {
      const docs = await DocumentPicker.getDocumentAsync({
        multiple: true,
        copyToCacheDirectory: true,
        type: ["*/*"],
      });

      if (docs.assets) {
        for (let index = 0; index < docs?.assets.length; index++) {
          seUploadtFiles([...uploadtFiles, docs.assets[index]]);
          getfiles();
        }
      }
    } catch (error) {
      console.log("error doc");
    }
  }

  async function deleteFile(id: number, filename: string) {
    await api
      .delete(`/files/${id}`, {
        params: { userId: userSettings.id, filename: filename },
      })
      .then((res) => {
        if (res.data.status) {
          setFiles(files.filter((file) => file.id !== id));
        }
      });
  }

  useEffect(() => {
    for (let index = 0; index < uploadtFiles.length; index++) {
      const formData = new FormData();
      const uniqueFile = uploadtFiles[index];
      const fileSettfings = {
        name: uniqueFile.name,
        uri: uniqueFile.uri,
        type: uniqueFile.mimeType,
        size: uniqueFile?.size,
      };
      formData.append("file", fileSettfings as any);
      formData.append("userId", userSettings.id as any);
      formData.append("projectId", projectId as any);
      try {
        api
          .post("/files", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setFiles((files) => [...files, res.data.files]);
            seUploadtFiles([]);
          });
      } catch (error) {
        console.log(error);
      }
    }
    getfiles();
  }, [uploadtFiles]);

  useEffect(() => {
    if (modalVisible) {
      getfiles();
    }
  }, [modalVisible]);

  return {
    data: { modalVisible, files, image, choosedFile },
    methods: {
      setModalVisible,
      setFiles,
      setImage,
      getfiles,
      uploadDocs,
      deleteFile,
      setChoosedFile,
    },
  };
};
