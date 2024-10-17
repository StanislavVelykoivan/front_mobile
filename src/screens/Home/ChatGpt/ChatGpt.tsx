import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { ActivityIndicatorContainer, MainContainer } from './styles';
import { TChatGptProps } from './types';
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
import { TChatGptMessage } from '@common/types/chatGPT';

export const ChatGpt = ({ route, navigation }: TChatGptProps) => {
  const { user } = useUserData();
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(true);
  const [isChatInfoLoading, setIsChatInfoLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<TChatGptMessage[]>([]);
  const [chatInfo, setChatInfo] = useState<Room | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await Service.ChatGptService.loadMessages();
        setMessages(res.data.messages);
      } catch (err) {
        Alert.alert('Ошибка при загрузке сообщений');
      } finally {
        setIsMessagesLoading(false);
      }
    };

    loadMessages();
  }, [route.params]);

  useEffect(() => {
    if (!user) return;

    const handleNewMessage = (message: TChatGptMessage) => {
      setMessages((prevState) => {
        if (prevState.some((msg) => msg.uuid === message.uuid)) {
          return prevState;
        }
        return [...prevState, message];
      });
    };

    
  }, [user, route.params]);

  const handleSendMessage = async ({ message }: { message?: any; }) => {  
    // Добавляем текстовое сообщение, если оно есть
    console.log(11111)
    if (!message) {
      return
    }
  
    console.log(typeof message)
    try {
      // Отправляем запрос с использованием FormData
      console.log(22222)
      const res = await Service.ChatGptService.sendMessage({
        messages: messages,
        newMessage: {
          role: "user",
          content: message
        }
      });
      console.log(33333)
      setMessages((prevState) => {
        if (prevState.some((msg) => msg.uuid === res.data.userMessage.uuid)) {
          return prevState;
        }
        return [...prevState, res.data.userMessage];
      });
      setMessages((prevState) => {
        if (prevState.some((msg) => msg.uuid === res.data.chatGptResponseMessage.uuid)) {
          return prevState;
        }
        return [...prevState, res.data.chatGptResponseMessage];
      });
      console.log(44444)
      console.log(res.data);
    } catch (error: any) {
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
        setMessages={setMessages}
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
