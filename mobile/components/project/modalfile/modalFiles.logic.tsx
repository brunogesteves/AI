import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import { api } from "@/utils/api";
import { useChatInfo } from "@/contexts/contextChat";

interface FileProps {
  id: number;
  name: string;
}

export const ModalFilesLogic = () => {
  const { projectId } = useChatInfo();
  const [modalVisible, setModalVisible] = useState(false);
  const [tempfiles, seTemptFiles] = useState<
    DocumentPicker.DocumentPickerAsset[]
  >([]);
  const [files, setFiles] = useState<FileProps[]>([]);
  const [image, setImage] = useState<string | null>(null);

  async function getfiles() {
    console.log("chamou arquivos");
    try {
      await api.get(`/project/files/${projectId}`).then((res) => {
        setFiles(res.data.files[0].files);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getDocs() {
    try {
      const docs = await DocumentPicker.getDocumentAsync({
        multiple: true,
        copyToCacheDirectory: true,
        type: ["*/*"],
      });

      if (docs.assets) {
        for (let index = 0; index < docs?.assets.length; index++) {
          console.log("chegou arquivcos");
          seTemptFiles([...tempfiles, docs.assets[index]]);
        }
      }
    } catch (error) {
      console.log("erro doc");
    }
  }

  console.log(files);

  useEffect(() => {
    console.log("ver files", tempfiles);
    console.log("ver files", tempfiles.length);
    const formData = new FormData();
    for (let index = 0; index < tempfiles.length; index++) {
      const uniqueFile = tempfiles[index];
      const fileSettfings = {
        name: uniqueFile.name,
        uri: uniqueFile.uri,
        type: uniqueFile.mimeType,
        size: uniqueFile?.size,
      };
      formData.append("file", fileSettfings as any);
      formData.append("userId", projectId);
    }
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
  }, [tempfiles]);

  useEffect(() => {
    if (modalVisible) {
      getfiles();
    }
  }, [modalVisible]);

  return {
    data: { modalVisible, files, image },
    methods: {
      setModalVisible,
      setFiles,
      setImage,
      getfiles,
      getDocs,
    },
  };
};
