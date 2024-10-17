import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TInitialState } from './types';
import { EStoreReducer } from '../../types';
import { TUser } from '@common/types/user';
import { TChat } from '@common/types/chat';
import { Room } from '@common/socket/interface/chat.interface';
import { TChatGpt, TChatGptMessage } from '@common/types/chatGPT';

const initialState: TInitialState = {
  user: null,
  chats: [],
  chatGpt: {
    messages: []
  },
  isAuthed: false,
};

export const slice = createSlice({
  name: EStoreReducer.user,
  initialState,
  reducers: {
    setIsAuthed(state, action: PayloadAction<boolean>) {
      state.isAuthed = action.payload;
    },

    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },

    setChats(state, action: PayloadAction<Array<Room>>) {
      state.chats = action.payload;
    },
    pushChat(state, action: PayloadAction<Room>) {
      state.chats.push(action.payload);
    },
    removeChat(state, action: PayloadAction<TChat>) {
      state.chats = state.chats.filter(
        (chat) => chat.uuid !== action.payload.uuid
      );
    },

    setChatGpt(state, action: PayloadAction<TChatGpt>) {
      state.chatGpt = action.payload;
    },
  },
});

export const userSliceActions = slice.actions;

export default slice.reducer;
