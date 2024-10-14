import {ImageBackground, Text, View} from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

export const MainBackgroundImage = styled(View)`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #202b36;
`;

export const MainBackgroundView = styled(View)`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  align-items: center;
  justify-content: center;
`;

export const LoadingChatsContainer = styled(View)`
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
`;
