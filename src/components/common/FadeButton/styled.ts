import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

export const ButtonContainer = styled(TouchableOpacity)``;

export const ButtonText = styled(Text)`
  color: #687072;
  font-size: 30px;
  font-weight: 400;
`;

export const StyledGradient = styled(ImageBackground)`
  padding: 10px 40px;
  border-radius: 30px;
`;
