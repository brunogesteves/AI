export interface IConversation {
  ai: string;
  user: string;
}

export interface IUserProps {
  content: string;
}

export interface IAiProps {
  content: string;
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
