export interface IConversation {
  ai: string;
  user: string;
}

export interface IUserProps {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
  birthDate: Date;
  email: string;
  generations?: number;
}

export interface IChatBoxArea {
  // messageAi: string;
  // setMessageAi: (newState: string) => void;
  // contentConversation: IConversation[];
  // setContentConversation: (newState: IConversation[]) => void;
  // question: string;
  // setQuestion: (newState: string) => void;
  // askAI: (newState: string) => void;
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

export interface IModalCreateUpdateProps {
  isOpen: boolean;
  closeModal: (newState: boolean) => void;
}

export interface IProjectProps {
  id: number;
  name: string;
}
