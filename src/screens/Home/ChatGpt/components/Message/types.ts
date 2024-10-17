import { MessageFromDB } from '@common/socket/interface/chat.interface';
import { TChatGptMessage } from '@common/types/chatGPT';

export type TMessageProps = {
  message: TChatGptMessage;
  type: 'my' | 'other';
};
