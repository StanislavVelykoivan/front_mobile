import { Room } from '@common/socket/interface/chat.interface';
import { TRequest } from '../../types';

export type TGetRoomInfo = TRequest<TPayload, null>;

type TPayload = {
  roomUid: string;
};
