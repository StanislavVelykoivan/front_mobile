import { TChatMainParamList } from 'src/screens/Home/Chat/types';
import { EScreens } from '../../screens';
import { TChatGptParamList } from 'src/screens/Home/ChatGpt/types';

export type TChatsStack = {
  [EScreens.ChatsList]: undefined;
  [EScreens.CreateChat]: undefined;
  [EScreens.ChatMain]: TChatMainParamList;
  [EScreens.ChatGpt]: TChatGptParamList;
};