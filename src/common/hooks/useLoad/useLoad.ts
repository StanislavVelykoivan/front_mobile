import socket from '@common/socket/connection';
import { useAuth } from '../useAuth';
import { Service } from '@common/services';

export const useLoad = () => {
  const { setUserData, setChats } = useAuth();

  const loadUserAndChats = async () => {
    const user = await Service.UserService.getUserByToken();
    console.log()
    console.log(user)
    if (!user.data) {
      throw new Error("Can't fetch user!");
    }
    console.log("pre set user data")
    setUserData(user.data);
    console.log("post set user data")
    //TODO: load chats
    const chatsRes = await Service.UserService.getMyRooms();
    console.log('------------------')
    console.log("чатс рес")
    // console.log(chatsRes.data[0].chats[0].messages)
    console.log("перед сет чатс")
    setChats(chatsRes.data);
    console.log("после сет чатс")
    console.log(chatsRes.data)
  };

  return { loadUserAndChats };
};
