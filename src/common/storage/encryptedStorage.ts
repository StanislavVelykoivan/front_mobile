import EncryptedStorage from 'react-native-encrypted-storage';
import * as SecureStore from 'expo-secure-store';

//TODO: get keys for storage from .env
export class EncryptedStorageService {
  static async setToken(token: string) {
    try {
      console.log(1)
      await SecureStore.setItemAsync('token', token)
      // await EncryptedStorage.setItem('token', token);
    } catch (error) {
      console.log(error)
      console.error(
        'Error while trying to save token to EncryptedStorageService!, {}'
      );
    }
  }

  static async getToken() {
    try {
      console.log(2)
      const token = await SecureStore.getItemAsync('token')
      // const token = await EncryptedStorage.getItem('token');
      if (!token) {
        // console.error('Token from EncryptedStorageService is undefined!');
        return token;
      }

      return token;
    } catch (error) {
      console.log(error)
      console.error(
        'Error while trying to get token from EncryptedStorageService!'
      );
    }
  }

  static async setRefreshToken(token: string) {
    try {
      await SecureStore.setItemAsync('refresh-token', token)
      // await EncryptedStorage.setItem('token', token);
    } catch (error) {
      console.log(error)
      console.error(
        'Error while trying to save token to EncryptedStorageService!, {}'
      );
    }
  }

  static async getRefreshToken() {
    try {
      const token = await SecureStore.getItemAsync('refresh-token')
      // const token = await EncryptedStorage.getItem('token');
      if (!token) {
        // console.error('Token from EncryptedStorageService is undefined!');
        return token;
      }

      return token;
    } catch (error) {
      console.log(error)
      console.error(
        'Error while trying to get token from EncryptedStorageService!'
      );
    }
  }

  static getRefreshTokenSync() {
    try {
      console.log(2)
      const token = SecureStore.getItem('refresh-token')
      // const token = await EncryptedStorage.getItem('token');
      if (!token) {
        // console.error('Token from EncryptedStorageService is undefined!');
        return token;
      }

      return token;
    } catch (error) {
      console.log(error)
      console.error(
        'Error while trying to get token from EncryptedStorageService!'
      );
    }
  }

  static getTokenSync() {
    try {
      console.log(2)
      const token = SecureStore.getItem('token')
      // const token = await EncryptedStorage.getItem('token');
      if (!token) {
        // console.error('Token from EncryptedStorageService is undefined!');
        return token;
      }

      return token;
    } catch (error) {
      console.log(error)
      console.error(
        'Error while trying to get token from EncryptedStorageService!'
      );
    }
  }

  // static async clearAll() {
  //   try {
  //     await EncryptedStorage.clear();
  //   } catch (error) {
  //     console.error('Error while trying to clear EncryptedStorageService!');
  //   }
  // }
}
