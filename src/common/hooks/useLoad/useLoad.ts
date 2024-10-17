import socket from '@common/socket/connection';
import { useAuth } from '../useAuth';
import { Service } from '@common/services';
import { ETab } from '@navigation/tabs/tabs';
import { useNavigation } from '@react-navigation/native';

export const useLoad = () => {
  const { setUserData, setChats, setChatGpt } = useAuth();
  const navigation = useNavigation<any>();

  const loadUserAndChats = async () => {
    Service.UserService.getUserByToken()
      .then(async (res) => {
        const user = res
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
        const chatGpt = await Service.ChatGptService.loadMessages()
        setChatGpt(chatGpt.data)
      })
      .catch((e) => {
        console.log(e.errorCode);
        navigation.navigate(ETab.Auth);
      });
    
  };

  return { loadUserAndChats };
};
