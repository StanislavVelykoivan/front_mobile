import { ImageBackground, Text } from 'react-native';
import styled from 'styled-components';

export const MainBackgroundImage = styled(ImageBackground)`
  height: 75px;
`;

export const ElemNameText = styled(Text)`
  font-size: 18px;
  color: white;
  font-weight: 400;
  margin-top: 10px;
`;

export const ElemDateText = styled(Text)`
  font-size: 14px;
  color: #6c7581;
  font-weight: 300;
  align-self: flex-end;
  flex: 1;
  margin-top: 8px;
`;

export const NormalText = styled(Text)`
  font-size: 18px;
  color: white;
  font-weight: 600;
`;
