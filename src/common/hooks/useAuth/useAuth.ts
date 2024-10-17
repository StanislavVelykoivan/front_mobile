import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { userSliceActions } from '../../../store/modules/user/reducer';
import { TUser } from '@common/types/user';
import { EncryptedStorageService } from '@common/storage/encryptedStorage';
import { Room } from '@common/socket/interface/chat.interface';
import { TChatGpt } from '@common/types/chatGPT';

export const useAuth = () => {
  const dispatch = useDispatch();

  const setToken = async (token: string) => {
    EncryptedStorageService.setToken(token);
    console.log(`token saved successful!`);
  };

  const getToken = async () => {
    try {
      console.log(2222222222222222222222)
      const token = await EncryptedStorageService.getToken();
      if (!token) {
        return null;
      }

      return token;
    } catch (error) {
      console.log('[ERROR] Failed to retrieve the token. ', error);
    }
  };

  const clearToken = async () => {
    try {
      console.log('Token deleted');
      return await EncryptedStorageService.setToken('');
    } catch (error) {
      console.error('Error deleting credentials for service Token', error);
    }
  };

  const setUserData = useCallback(
    (user: TUser) => {
      dispatch(userSliceActions.setUser(user));
    },
    [dispatch]
  );

  const setChats = useCallback(
    (chats: Array<Room>) => {
      if (chats === undefined) chats = [];
      dispatch(userSliceActions.setChats(chats));
    },
    [dispatch]
  );

  const setChatGpt = useCallback(
    (chats: TChatGpt) => {
      dispatch(userSliceActions.setChatGpt(chats));
    },
    [dispatch]
  );

  const clearUserData = useCallback(() => {
    console.log('User data deleted');
    dispatch(userSliceActions.clearUser());
  }, [dispatch]);

  const setIsAuthed = useCallback(
    (state: boolean) => {
      dispatch(userSliceActions.setIsAuthed(state));
    },
    [dispatch]
  );

  return {
    setUserData,
    clearUserData,
    setToken,
    getToken,
    clearToken,
    setIsAuthed,
    setChats,
    setChatGpt
  };
};
