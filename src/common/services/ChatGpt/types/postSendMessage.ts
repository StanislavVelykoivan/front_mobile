import { TChatGptMessage, TChatGptMessageIntoDB } from '@common/types/chatGPT';
import { TRequest } from '../../types';

// Экспорт TPayload отдельно
export type TPayload = {
  messages: TChatGptMessage[],
  newMessage: TChatGptMessageIntoDB
};

export type TResponse = {
  userMessage: TChatGptMessage,
  chatGptResponseMessage: TChatGptMessage
}

// Используем TPayload в TPostSendMessageRequest
export type TPostSendMessageRequest = TRequest<TPayload, TResponse>;
