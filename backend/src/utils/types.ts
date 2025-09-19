export interface IHistoryChat {
  ai: string;
  user: string;
}

export interface IChatHistoryProps {
  role: string;
  parts: [{ text: string }];
}

export interface IFileProps {
  question: string;
  projectId: string;
  userId: string;
  fileName: string;
}

export interface IHistoryChat {
  ai: string;
  user: string;
}
