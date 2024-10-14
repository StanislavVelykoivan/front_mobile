import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { ActivityIndicatorContainer, MainContainer } from './styles';
import { TChatMainProps } from './types';
import {
  MessageFromDB,
  MessageFromWS,
  Room,
} from '@common/socket/interface/chat.interface';
import { Service } from '@common/services';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { Sender } from './components/Sender';
import { useUserData } from '@store/tools';
import socket from '@common/socket/connection';
import RNBlobUtil from 'react-native-blob-util';
import { Platform } from 'react-native';
// import RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';

export const Chat = ({ route, navigation }: TChatMainProps) => {
  const { user } = useUserData();
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(true);
  const [isChatInfoLoading, setIsChatInfoLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<MessageFromDB[]>([]);
  const [chatInfo, setChatInfo] = useState<Room | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await Service.ChatService.loadMessages({
          roomUid: route.params.roomUid,
        });
        setMessages(res.data);
      } catch (err) {
        Alert.alert('Ошибка при загрузке сообщений');
      } finally {
        setIsMessagesLoading(false);
      }
    };

    const loadChatInfo = async () => {
      try {
        const res = await Service.ChatService.getRoomInfo({
          roomUid: route.params.roomUid,
        });
        setChatInfo(res.data);
      } catch (err) {
        Alert.alert('Ошибка при загрузке информации о чате');
      } finally {
        setIsChatInfoLoading(false);
      }
    };

    loadMessages();
    loadChatInfo();
  }, [route.params.roomUid]);

  useEffect(() => {
    if (!user) return;

    socket.emit('join-room', {
      userUid: user?.uuid,
      roomUid: route.params.roomUid,
    });

    const handleNewMessage = (message: MessageFromWS) => {
      setMessages((prevState) => {
        if (prevState.some((msg) => msg.uuid === message.uuid)) {
          return prevState;
        }
        return [...prevState, message];
      });
    };

    socket.on('message', handleNewMessage);

    return () => {
      socket.off('message', handleNewMessage);
    };
  }, [user, route.params.roomUid]);

  // const logFormData = (formData: FormData) => {
  //   console.log('Parsed FormData:');
  //   formData._parts.forEach(([key, value]) => {
  //     console.log(`Key: ${key}, Value: ${JSON.stringify(value)}`);
  //     if (value && typeof value === 'object' && value.uri) {
  //       console.log(
  //         `This is a file: ${value.name}, URI: ${value.uri}, Type: ${value.type}`
  //       );
  //     } else {
  //       console.log(`This is a string: ${value}`);
  //     }
  //   });
  // };

  // const copyFileToTemporaryDirectory = async (
  //   uri: string,
  //   fileName: string
  // ) => {
  //   try {
  //     // Запрос разрешений для Android 6.0 и выше
  //     if (Platform.OS === 'android' && Platform.Version >= 23) {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //         {
  //           title: 'Доступ к файлам',
  //           message: 'Приложению требуется доступ к файлам',
  //           buttonNeutral: 'Позже',
  //           buttonNegative: 'Отмена',
  //           buttonPositive: 'OK',
  //         }
  //       );
  //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //         Alert.alert(
  //           'Ошибка',
  //           'Разрешение на доступ к хранилищу не предоставлено'
  //         );
  //         return null;
  //       }
  //     }

  //     // Временная директория
  //     const destPath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;

  //     // Копирование файла
  //     await RNFS.copyFile(uri, destPath);

  //     return destPath; // Возвращаем путь к скопированному файлу
  //   } catch (error) {
  //     console.error('Ошибка копирования файла:', error);
  //     return null;
  //   }
  // };

  const handleSendMessage = async ({ message, file }: { message?: string; file?: any; }) => {
    const formData = new FormData();
  
    // Добавляем текстовое сообщение, если оно есть
    if (message) {
      formData.append('message', message);
    }
  
    // Проверяем, есть ли файл
    if (file) {
      let filePath = file.uri;
  
      // Если URI начинается с content://, копируем файл во временное хранилище
      if (file.uri.startsWith('content://')) {
        try {
          // const realPath = await copyFileToTemporaryDirectory(file.uri, file.name);
          // if (!realPath) {
          //   Alert.alert('Ошибка', 'Не удалось скопировать файл');
          //   return;
          // }
          filePath = file.uri; // Подготавливаем путь для отправки
        } catch (error) {
          console.error('Ошибка обработки файла:', error);
          return;
        }
      }
  
      // Добавляем файл в FormData
      formData.append('file', {
        uri: filePath,
        name: file.name,
        type: file.type,
      });
    }
  
    // Добавляем обязательные параметры отправителя и комнаты
    formData.append('fromUid', user.uuid);
    formData.append('toRoomUid', chatInfo.uuid);
  
    try {
      // Отправляем запрос с использованием FormData
      const res = await Service.ChatService.sendMessage(formData);
  
      console.log(res.data);
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert(
        'Ошибка отправки сообщения',
        error.response?.data?.message || 'Произошла непредвиденная ошибка'
      );
    }
  };

  return (
    <MainContainer>
      <Header
        title={chatInfo?.name || 'Чат'}
        avatar_url={chatInfo?.users?.[0]?.profile_url}
      />

      {isMessagesLoading ? (
        <ActivityIndicatorContainer>
          <ActivityIndicator size={'large'} color={'#fff'} />
        </ActivityIndicatorContainer>
      ) : (
        <MessageList messages={messages} />
      )}

      <Sender onSend={handleSendMessage} />
    </MainContainer>
  );
};
