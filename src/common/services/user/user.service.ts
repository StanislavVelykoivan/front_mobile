import { TUser } from '@common/types/user';
import { apiPrivate } from '../../api';
import { TResponse } from '../types';
import { TGetMyRoomsRequest } from './types/getMyRooms';
import { EncryptedStorageService } from '@common/storage/encryptedStorage';

export class UserService {
  static async getUserByToken(): Promise<TResponse<TUser>> {
    console.log("111")
    return apiPrivate.get('/user',
      {
        headers: {
          "Authorization": `Bearer ${EncryptedStorageService.getTokenSync()}`
        }
      }
    );
  }

  static async refresh(): Promise<TResponse<TUser>> {
    return apiPrivate.get('/auth/refresh-token',
      {
        headers: {
          "refresh_token": `${EncryptedStorageService.getRefreshTokenSync()}`
        }
      }
    );
  }

  static async getAllUsers(): TResponse<Array<TUser>> {
    return apiPrivate.get('/user/findAll');
  }

  static async getMyRooms(): Promise<TGetMyRoomsRequest['response']> {
    return apiPrivate.get('/user/my-rooms',
      {
        headers: {
          "Authorization": `Bearer ${EncryptedStorageService.getTokenSync()}`
        }
      }
    );
  }
}
