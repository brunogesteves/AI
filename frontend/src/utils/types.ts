import { RefObject } from "react";

export interface IConversationProps {
  user: string;
  ai: string;
}

export interface IChatSettingProps {
  typeText: string[];
  setTypeText: (newState: string[]) => void;
  messageAi: string;
  setMessageAi: (newState: string) => void;
  question: string;
  setQuestion: (newState: string) => void;
  isButtonDisabled: boolean;
  setIsButtonDisabled: (newState: boolean) => void;
  contentConversation: IConversationProps[];
  setContentConversation: (newState: IConversationProps[]) => void;
  projectId: string;
  setProjectId: (newState: string) => void;
  askAI: (params: string) => void;
  modalRef: RefObject<HTMLDialogElement> | null;
  isModalopen: boolean;
  setIsModalopen: (newState: boolean) => void;
  fileName: string;
  setfileName: (newState: string) => void;
  choosedFile: string;
  setChoosedFile: (newState: string) => void;
}

export interface IUserProps {
  id?: number;
  firstname: string;
  lastname: string;
  birthDate: Date;
  email: string;
  generations?: number;
}

export interface IUserSettingsProps {
  userSettings: IUserProps;
  setUserSettings: (newState: IUserProps) => void;
}

export interface ISignProps {
  isOpen: boolean;
  hasSignUp: (newState: boolean) => void;
}

export interface ISignInUser {
  email: string;
  password: string;
}

export interface IModalProps {
  projectDataToDelete?: ProjectDataToDeleteProps;
  isOpen: boolean;
  closeModal: (newState: boolean) => void;
}

export interface IProjectProps {
  id: number;
  name: string;
}

export interface ProjectDataToDeleteProps {
  id: number;
  name: string;
}
