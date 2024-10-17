import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Row } from '@components/common';
import { ElemDateText, ElemNameText, NormalText } from './styled';
import { TChatGptElemProps } from './types';
import { useNavigation } from '@react-navigation/native';
import ProfileDefaultIcon from '@assets/icons/ProfileDefault/ProfileDefaultIcon';

export const ChatGptElem = ({ data }: TChatGptElemProps) => {
  const navigation = useNavigation<any>();

  const handleMoveToChat = () => {
    navigation.navigate('ChatGpt', "ChatGpt");
  };

  return (
    <TouchableOpacity onPress={handleMoveToChat}>
      <Row
        style={{
          height: 75,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}
      >
        {/* Проверяем наличие аватарки, если её нет, используем аватар по умолчанию */}
        
          <Image
            source={require('src/assets/icons/ChatGpt/ChatGPT_logo.svg.png')} // Используем URL аватарки
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          />
        

        {/* Название чата и последнее сообщение */}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <ElemNameText>{'ChatGpt помощник'}</ElemNameText>
          {/* <NormalText numberOfLines={1} style={{ color: '#7d8b97' }}>
            {chat.lastMessage || 'Нет сообщений'}
          </NormalText> */}
        </View>

        {/* Время последнего сообщения */}
        {/* <View style={{ alignItems: 'flex-end' }}>
          <ElemDateText>
            {chat.updated_at
              ? new Date(chat.updated_at).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })
              : ''}
          </ElemDateText>
        </View> */}
      </Row>

      {/* Разделительная линия */}
      <View
        style={{
          marginLeft: 60,
          borderBottomWidth: 1,
          borderBottomColor: '#16202c',
        }}
      />
    </TouchableOpacity>
  );
};
