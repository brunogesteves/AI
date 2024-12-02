export interface IConversation {
  ai: string;
  user: string;
}

export interface IUserProps {
  firstname: string;
  lastname: string;
  password: string;
  birthDate: Date;
  email: string;
}

export interface IChatBoxArea {
  messageAi: string;
  setMessageAi: (newState: string) => void;
  contentConversation: IConversation[];
  setContentConversation: (newState: IConversation[]) => void;
  question: string;
  setQuestion: (newState: string) => void;
  askAI: (question: string) => void;
}

export interface ISignProps {
  isOpen: boolean;
  hasSignUp: (newState: boolean) => void;
}
