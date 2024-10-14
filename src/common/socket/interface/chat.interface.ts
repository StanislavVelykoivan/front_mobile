import { TUser } from "@common/services/auth/types/common";
import { TAbstract } from "@common/types/abstract";

export interface DatabaseResponse {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string;
}

// **************************************
// ************** USER ******************
// **************************************
export interface User extends DatabaseResponse {
  nickname: string;
  email: string;
  phone: string;
  password: string;
  profile_url: string;
  chats?: Room[];
}
export interface LoginDto {
  username: string;
  password: string;
}

// **************************************
// ************* MESSAGE ****************
// **************************************
export interface Message {
  message: string;
  date: Date;
  from: string;
  to: string;
  fileUrl?: string; 
}
export interface MessageFromWS extends DatabaseResponse {
  message: string;
  fromUid: string;
  toRoomUid: string;
  to: Room;
  from: User;
  date: string;
  fileUrl?: string;
}
export interface MessageFromDB extends DatabaseResponse {
  message: string;
  date: string;
  from: User;
  files_urls?: FileUrl[];
}

export interface FileUrl extends DatabaseResponse {
  file_url: string;
}

export interface SingleChatFile {
  fileType: string,
  fileUrl: string
}

export interface MessagePayload {
  message: string;
  fromUid: string;
  toRoomUid: string;
  file?: File;
}

export interface FilePayload {
  fileName: string;
  buffer: Buffer;
  toRoomUid: string;
}

// **************************************
// ************** ROOM ******************
// **************************************
export interface Room extends DatabaseResponse {
  logo_url?: string;
  lastMessage: string;
  name: string;
  owner?: User;
  users?: User[];
}
export interface JoinRoomPayload {
  roomUid: string;
  userUid: string;
}

// **************************************
// ************** EVENTS ******************
// **************************************
export interface ServerToClientEvents {
  chat: (e: MessageFromDB) => void;
  message: (e: MessageFromWS) => void;
  joined: (e: { newUser: string }) => void;
  rooms: (newRooms: Room[]) => void;
}

export interface ClientToServerEvents {
  chat: (e: Message) => void;
  message: (e: MessagePayload) => void;
  'join-room': (e: JoinRoomPayload) => void;
  file: (e: FilePayload) => void;
  onSuccesfulLogin: (e: TUser & TAbstract) => void;
}
