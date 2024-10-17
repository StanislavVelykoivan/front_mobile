import { Images } from '@assets/Images.ts';
import { useAuth } from '@common/hooks/useAuth';
import { Button } from '@components/buttons';
import { Position } from '@components/positions';
import { ETab } from '@navigation/tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { useUserData } from '../../../store/tools';
import { ChatsList as ChatsListComponent } from './components/ChatsList';
import { LoadingChatsContainer, MainBackgroundImage } from './styled';
import { Row } from '@components/common';
import { useLoad } from '@common/hooks/useLoad';
import RoundButton from '@components/telegramStaff/RoundButton/RoundButton';
import MenuIcon from '@assets/icons/Menu/MenuIcon';
import PencilIcon from '@assets/icons/Pencil/PencilIcon';
import useSocketEvents from '@common/hooks/useSocketEvents/useSocketEvents';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ChatGptElem } from './components/ChatGptElem';

export const ChatsList = () => {
  useSocketEvents(); // Use the custom hook to listen to socket events

  const { clearToken, clearUserData } = useAuth();
  const navigation = useNavigation<any>();
  const { loadUserAndChats } = useLoad();
  const { chats, chatGpt } = useUserData();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Initial loading effect - only runs once when component is mounted
  useEffect(() => {
    console.log("chatsList start")
    const loadData = async () => {
      console.log(isLoading)
      if (!isLoading) return; // Prevent multiple loading
      try {
        console.log("chatsList loading start")
        await loadUserAndChats();
        console.log('user and chats loaded');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
    console.log("чаты в чат лист")
    console.log(chats)
  }, [isLoading, loadUserAndChats]);

  const refreshChats = useCallback(() => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    loadUserAndChats()
      .then(() => console.log('user and chats refreshed'))
      .finally(() => setIsRefreshing(false));
  }, [isRefreshing, loadUserAndChats]);

  const handleLogIn = () => {
    navigation.navigate(ETab.Auth);
  };

  const handleCreateChat = () => {
    navigation.navigate('ChatsStack', { screen: 'CreateChat' });
  };

  return (
    <MainBackgroundImage>
      <Row
        style={{
          alignItems: 'center',
          height: 50,
          backgroundColor: '#222e3e',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 50 },
          shadowOpacity: 0.25,
          shadowRadius: 5.84,
        }}
      >
        <TouchableOpacity onPress={handleLogIn} style={{ marginLeft: 20 }}>
          <MenuIcon />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          Сообщения
        </Text>
        <View style={{ width: 35 }} />
      </Row>
          
      {isLoading ? (
        <LoadingChatsContainer>
          <ActivityIndicator size={'large'} color={'#fff'} />
        </LoadingChatsContainer>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshChats}
            />
          }
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <ChatGptElem data={chatGpt}/>
          <ChatsListComponent data={chats} />
        </ScrollView>
      )}

      <View style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 10 }}>
        <RoundButton
          Icon={PencilIcon}
          size={50}
          onPress={handleCreateChat}
          backgroundColor="#639fd8"
          iconColor="#ffffff"
        />
      </View>
      
    </MainBackgroundImage>
  );
};
