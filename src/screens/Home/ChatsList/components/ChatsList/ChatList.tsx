import React, { useEffect } from 'react';
import { ChatListElem } from '../ChatListElem';
import { MainScrollView } from './styled';
import { TChatListProps } from './types';

export const ChatsList = ({ data }: TChatListProps) => {
  useEffect(() => {
    console.log("дата в юз эффект")
    console.log(data)
  })
  return (
    <MainScrollView>
      {data.map((room) => (
        // Проверяем, если у room есть вложенные чаты
        // room.chats ? (
        //   room.chats.map((chat) => (
        //     <ChatListElem chat={chat} key={chat.uuid} />
        //   ))
        // ) : (
          <ChatListElem chat={room} key={room.uuid} /> // Если нет вложенных чатов, используем room как chat
        // )
      ))}
    </MainScrollView>
  );
};
