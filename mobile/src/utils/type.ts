export interface IContainerProps {
  children: React.ReactNode;
}

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
