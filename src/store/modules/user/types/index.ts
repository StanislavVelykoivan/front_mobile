import { Room } from '@common/socket/interface/chat.interface';
import { TAbstract } from '@common/types/abstract';
import { TChatGpt } from '@common/types/chatGPT';
import { TUser } from '@common/types/user';

export type TInitialState = {
  user: (TUser & TAbstract) | null;
  chats: Array<Room>;
  chatGpt: TChatGpt;
  isAuthed: boolean;
};
