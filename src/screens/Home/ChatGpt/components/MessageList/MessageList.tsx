import React, { useEffect, useRef } from 'react';
import { TMessageListProps } from './types.ts';
import { StyledScrollView } from './styled.ts';
import { useUserData } from '@store/tools.ts';
import { Message } from '../Message/Message.tsx';

export const MessageList = ({ messages }: TMessageListProps) => {
  const scrollViewRef = useRef();
  return (
    <StyledScrollView 
    
    >
      {messages.map((message) => {
        return (
          <Message
            key={message.uuid}
            message={message}
            type={message.role === "user" ? 'my' : 'other'}
          />
        );
      })}
      
    </StyledScrollView>
  );
};
