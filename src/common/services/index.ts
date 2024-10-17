import { AuthService } from './auth';
import { ChatService } from './chat';
import { ChatGptService } from './ChatGpt';
import { UserService } from './user';

export const Service = {
  AuthService,
  UserService,
  ChatService,
  ChatGptService
};

export * from './types';
