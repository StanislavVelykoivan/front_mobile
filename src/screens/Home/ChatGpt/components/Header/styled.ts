import { Button } from '@components/buttons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

export const MainView = styled(View)`
  width: 100%;
  flex-direction: row; /* Используем flex-row для горизонтального расположения элементов */
  align-items: center; /* Центрируем элементы по вертикали */
  padding: 10px 20px; /* Отступы */
  background-color: #17212b; /* Тёмный фон */
  border-bottom-width: 1px; /* Нижняя граница */
  border-bottom-color: #1c1f22; /* Цвет границы */
`;

export const Title = styled(Text)`
  font-size: 18px;
  font-weight: 500; /* Средний вес текста */
  color: white;
  flex: 1; /* Расширяем текст на все доступное пространство */
  text-align: left; /* Текст слева */
  margin-left: 10px; /* Отступ слева от изображения */
`;

// Аватар пользователя
export const StyledImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 20px; /* Округление краев */
  background-color: #2a2f33; /* Фон для изображения */
`;

export const SendButton = styled(TouchableOpacity)`
  height: 35px;
  width: 60px;
  align-items: center;
  justify-content: center;
  background-color: red;

`;