import { View } from 'react-native';
import styled from 'styled-components';

// Основной контейнер чата
export const MainContainer = styled(View)`
  flex: 1;
  background-color: #2a2f33; /* Темный фон, похожий на Telegram */

`;

// Контейнер для индикатора активности (при загрузке сообщений)
export const ActivityIndicatorContainer = styled(View)`
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;
  background-color: #2a2f33; /* Темный фон */
`;
