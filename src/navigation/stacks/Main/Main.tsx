import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import MainTab from '../../tabs/Main/Main';
import { ETab } from '../../tabs/tabs';
import { AuthStack } from '../Auth';
import { ScreenNavigationOptions } from '../options';
import { TMainStack } from './types';
import { useUserData } from '../../../store/tools';
// import { useLoad } from '@common/hooks/useLoad';
import { useAuth } from '@common/hooks/useAuth';
import { EncryptedStorageService } from '@common/storage/encryptedStorage';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator<TMainStack>();

const MainStack = () => {
  const { setIsAuthed } = useAuth();
  const { isAuthed } = useUserData();
  // const { loadUserAndChats } = useLoad();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation<any>();

  let currentTab;
  useEffect(() => {
    const fetch = async () => {
      console.log("App start 1111111111111")
      const token = await EncryptedStorageService.getToken();
      //       const token = await EncryptedStorageService.getRefreshToken();
      console.log(token);
      console.log(isAuthed)
      if (token) {
        // loadUserAndChats();
        console.log("asdasddasasdasdasd");
        setIsAuthed(true);
        setIsLoading(false);
        // navigation.navigate(ETab.Auth);
        // currentTab = ETab.Main;
      } else {
        console.log("123123123123123");
        setIsLoading(false);
        navigation.navigate(ETab.Auth);
      }
    };

    fetch();
  }, [isAuthed]);

  return isLoading ? (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}
    >
      <Text style={{ color: 'white', fontSize: 30 }}>Loading</Text>
    </View>
  ) : (
    <Stack.Navigator
      screenOptions={ScreenNavigationOptions}
      initialRouteName={currentTab}
    >
      <Stack.Screen name={ETab.Main} component={MainTab} />
      <Stack.Screen name={ETab.Auth} component={AuthStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
