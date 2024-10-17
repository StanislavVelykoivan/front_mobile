import { EncryptedStorageService } from '@common/storage/encryptedStorage';
import { apiFormData, apiPrivate } from '../../api';
import { TGetMessages } from './types/getMessages';
import { TGetRoomInfo } from './types/getRoomInfo';
import { TPostSendMessageRequest, TPayload } from './types/postSendMessage';

export class ChatGptService {
  // static async postCreateRoom(
  //   data: FormData // Ensure this is of type FormData
  // ): Promise<TPostCreateRoom['response']> {
  //   return apiFormData.post('/chat/create-room', data, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       "Authorization": `Bearer ${EncryptedStorageService.getTokenSync()}`
        
  //     },
  //   });
  // }

  static async clearHistory(): Promise<TGetRoomInfo['response']> {
    return apiPrivate.delete(`/chat-gpt/clear-history`,
      {
        headers: {
          "Authorization": `Bearer ${EncryptedStorageService.getTokenSync()}`
        }
      }
    );
  }

  static async loadMessages(): Promise<TGetMessages['response']> {
    return apiPrivate.get(`/chat-gpt/load-messages`, 
      {
        headers: {
          "Authorization": `Bearer ${EncryptedStorageService.getTokenSync()}`
        }
      }
    );
  }

  static async sendMessage(
    data: TPostSendMessageRequest['payload']
  ): Promise<TPostSendMessageRequest['response']> {
    
    
    console.log(`data in axios ${data}`)
    console.log(data)
    // Отправляем запрос через axios
    return apiPrivate.post('/chat-gpt/message', data, {
      headers: {
        "Authorization": `Bearer ${EncryptedStorageService.getTokenSync()}`
      },
      timeout: 20000,
    });
  }
}
