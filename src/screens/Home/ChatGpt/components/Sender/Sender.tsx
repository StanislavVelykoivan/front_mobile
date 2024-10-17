import React, { useState } from 'react';
import { TSenderProps } from './types.ts';
import {
  MainView,
  SendButton,
  SenderContainer,
  StyledInput,
  FileButton,
} from './styled.ts';
import { Image, Keyboard, Platform, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Для загрузки изображений
import * as DocumentPicker from 'expo-document-picker';
import { Images } from '@assets/Images.ts';

export const Sender = ({ onSend }: TSenderProps) => {
  const [text, setText] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<any | null>(null);

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleSend = () => {
    // Проверяем, что есть текст или файл
    console.log('---------------------------')
    console.log(selectedFile)
    onSend({ message: text || ' ', file: selectedFile });
    setText('');
    setSelectedFile(null); // Очищаем файл после отправки
    Keyboard.dismiss();
  };

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: true
      }); 
      console.log(result.assets)
      setSelectedFile(result.assets);
    } catch (err) {
      // if (DocumentPicker.canceled(err)) {
      //   console.log('Пользователь отменил выбор файла');
      // } else {
      //   console.error('Ошибка при выборе файла: ', err);
      // }
    }
  };

  return (
    <MainView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SenderContainer>
        <StyledInput
          value={text}
          keyboardAppearance="dark"
          onChangeText={handleTextChange}
          placeholder="Введите сообщение"
          placeholderTextColor={'#6d7883'}
        />
        
        <SendButton onPress={handleSend}>
          <Image
            source={Images.ArrowUp}
            resizeMode="contain"
            style={{ width: 24 }}
          />
        </SendButton>
      </SenderContainer>
    </MainView>
  );
};
