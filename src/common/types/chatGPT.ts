import { TAbstract } from './abstract';
import { TChat } from './chat';

export type TChatGpt = {
  messages: TChatGptMessage[]
}

export type TChatGptMessage = {
    role: string,
    content: string,
} & TAbstract;

export type TChatGptMessageIntoDB = {
  role: string,
  content: string,
}
