import { MessageFromDB, Room } from '@common/socket/interface/chat.interface';
import { TRequest } from '../../types';
import { TChatGpt } from '@common/types/chatGPT';

export type TGetMessages = TRequest<TPayload, TChatGpt>;

type TPayload = {
  roomUid: string;
};
