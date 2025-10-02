export interface IInputBoxProps {
  placeholder: string;
  value: any;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  hasSecureTextEntry: boolean;
}

export interface ButtonSubmitProps {
  title: string;
  onPress: () => void;
}

export interface IConversationProps {
  role: "user" | "model";
  parts: { text: string }[];
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

export interface ICreateProjectProps {
  closeModal: (newState: boolean) => void;
  projectHasBeenCreated: (newState: boolean) => void;
  userId: number;
}

export interface IDeleteProjectProps {
  closeModal: (newState: boolean) => void;
  projectSettings: IProjectProps | undefined;
  isDeleteConfirmed: (newState: boolean) => void;
}

export interface IParamsId {
  params: Promise<{ id: string }>;
}

export interface IProjectProps {
  id: number;
  name: string;
}

export interface ProjectData {
  id?: number;
  name?: string;
}

export interface IFileProps {
  name: string;
  id: number;
}

export interface IOpenFileProps {
  fileName: string;
  projectId: number;
  userId: number;
}
