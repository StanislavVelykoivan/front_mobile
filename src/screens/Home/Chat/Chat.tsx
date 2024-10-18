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
import { ChatGptService } from '@common/services/ChatGpt';

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

  // Функция для отправки сообщения
  const handleSendMessage = async ({
    message,
    file,
  }: {
    message?: string;
    file?: any;
  }) => {
    if (message && message.startsWith('/chatgpt')) {
      // Если сообщение начинается с /chatgpt, обрабатываем запрос к ChatGPT
      const chatGptQuery = message.replace('/chatgpt', '').trim();
      await sendChatGptMessage(chatGptQuery);
      return;
    }

    const formData = new FormData();

    // Добавляем текстовое сообщение, если оно есть
    if (message) {
      formData.append('message', message);
    }

    // Проверяем, есть ли файл
    if (file) {
      let filePath = file.uri;

      // Если URI начинается с content://, копируем файл во временное хранилище
      if (!chatInfo) {
        Alert.alert("Ошибка", "Информация о чате отсутствует.");
        return;
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

  // Функция для отправки запроса к ChatGPT
  const sendChatGptMessage = async (query: string) => {

      if (!chatInfo) {
    Alert.alert("Ошибка", "Информация о чате отсутствует.");
    return;
  }
    try {
      const response = await ChatGptService.sendMessage({
        messages: [], // Можно передать предыдущие сообщения, если нужно
        newMessage: {
          role: 'user',
          content: query,
        },
      });

      const gptResponse = response.data.chatGptResponseMessage;

      // Добавляем ответ ChatGPT в сообщения чата
      setMessages((prevState) => {
        // Проверяем, что user и chatInfo определены
        if (!user || !chatInfo) {
          console.error('User or ChatInfo is undefined');
          return prevState;
        }
      
        return [
          ...prevState,
          {
            id: gptResponse.id, // Поскольку это сообщение от ChatGPT, можно использовать фиктивное значение
            uuid: gptResponse.uuid,
            message: gptResponse.content,
            date: gptResponse.date,
            from: { 
              id: user.id, 
              uuid: user.uuid,
              nickname: user.nickname,
              email: user.email,
              phone: user.phone,
              password: '', 
              profile_url: user.profile_url,
              created_at: user.created_at, 
              updated_at: user.updated_at, 
            }, 
            toRoomUid: chatInfo.uuid,
            created_at: new Date(gptResponse.date).toISOString(), // Используем дату ответа или текущую
            updated_at: new Date(gptResponse.date).toISOString(), // Используем дату ответа или текущую
          },
        ];
      });
    } catch (error) {
      console.error('Ошибка при запросе к ChatGPT:', error);
      Alert.alert(
        'Ошибка при запросе к ChatGPT',
        error.response?.data?.message || 'Не удалось получить ответ от ChatGPT'
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
