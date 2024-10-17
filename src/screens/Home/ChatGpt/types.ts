import { EScreens } from '@navigation/screens';
import { TChatsStack } from '@navigation/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TChatGptParamList = {
};

export type TChatGptProps = NativeStackScreenProps<
  TChatsStack,
  EScreens.ChatGpt
>;
