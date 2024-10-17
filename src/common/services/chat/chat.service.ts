import { EncryptedStorageService } from '@common/storage/encryptedStorage';
import { apiFormData, apiPrivate } from '../../api';
import { TGetMessages } from './types/getMessages';
import { TGetRoomInfo } from './types/getRoomInfo';
import { TPostCreateRoom } from './types/postCreateRoom';
import { TPostSendMessageRequest, TPayload } from './types/postSendMessage';

export class ChatService {
  static async postCreateRoom(
    data: FormData // Ensure this is of type FormData
  ): Promise<TPostCreateRoom['response']> {
    return apiFormData.post('/chat/create-room', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${EncryptedStorageService.getTokenSync()}`
        
      },
    });
  }

  static async getRoomInfo(
    data: TGetRoomInfo['payload']
  ): Promise<TGetRoomInfo['response']> {
    return apiPrivate.get(`/chat/${data.roomUid}`);
  }

  static async loadMessages(
    data: TGetMessages['payload']
  ): Promise<TGetMessages['response']> {
    return apiPrivate.get(`/chat/load-messages/${data.roomUid}`);
  }

  static async sendMessage(
    data: FormData
  ): Promise<TPostSendMessageRequest['response']> {
    console.log('Parsed FormData:');
    
    // Логируем данные через доступ к _parts (React Native-specific)
    if (data._parts) {
      data._parts.forEach(([key, value]) => {
        if (value && typeof value === 'object' && value.uri) {
          console.log(
            `Файл: ${value.name}, URI: ${value.uri}, Тип: ${value.type}`
          );
        } else {
          console.log(`Ключ: ${key}, Значение: ${value}`);
        }
      });
    }
  
    // Отправляем запрос через axios
    return apiFormData.post('/chat/message', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${EncryptedStorageService.getTokenSync()}`
      },
      timeout: 10000,
    });
  }
}
