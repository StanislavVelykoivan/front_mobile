import { useState } from 'react';
import { Form } from './components/Form';
import { BackgroundImage, Row, Title } from './styles';
import { TForm } from './components/Form/types';
import { Header, FadeButton, Submit } from '@components/common';
import { Images } from '@assets/Images';
import { useNavigation } from '@react-navigation/native';
import { EScreens } from '@navigation/screens';
import { Service } from '@common/services';
import { Loading } from '@components/common/Loading/Loading';
import { EncryptedStorageService } from '@common/storage/encryptedStorage';
import { useAuth } from '@common/hooks/useAuth';
import { ETab } from '@navigation/tabs';
import socket from '../../../common/socket/connection';

export const Authorization = () => {
  const { setUserData, setIsAuthed, setChats } = useAuth();
  const navigate = useNavigation<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TForm>({ login: '', password: '' });

  const handleMoveToSignUp = () => {
    navigate.navigate(EScreens.AuthRegistration);
  };

  const handleLogin = () => {
    setIsLoading(true);
    console.log("start login")
    Service.AuthService.postSignIn({
      nickname: formData.login,
      password: formData.password,
    })
      .then(async (res) => {
        setIsLoading(false);

        // Проверьте, что res содержит данные
        console.log('Response:', res);

        if (res && res.data) {
          console.log('Response data:', res.data);

          // save all data
          EncryptedStorageService.setToken(res.data.tokens.accessToken);
          console.log('AccessToken:', res.data.tokens.accessToken);

          console.log(res.data.user)
          socket.emit('onSuccesfulLogin', res.data.user);
          console.log('---------------------------------------------------------------------')

          setUserData(res.data.user);
          setIsAuthed(true);
          const chatsRes = await Service.UserService.getMyRooms();
          // console.log(chatsRes.data[0].chats[0].messages)
          setChats(chatsRes.data);
          navigate.navigate(ETab.Main);
        } else {
          console.error('Response data is undefined or null');
        }
      })
      .catch((e) => {
        console.log("sddddddddddddddddddddddddddddddddddddddd")
        console.log(e.errorCode);
        setIsLoading(false);
      });
  };

  return (
    <BackgroundImage source={Images.AuthBackground}>
      {isLoading && <Loading />}

      <Header />
      <Row>
        <FadeButton
          text="Sign up"
          onClick={handleMoveToSignUp}
          direction="rightToLeft"
          startColor={'#0f3945'}
        />
        <Title>Login</Title>
      </Row>

      <Form setFormData={setFormData} />

      <Submit
        buttonText="Login"
        onSubmitClick={handleLogin}
        bottomText="Don't have an account?"
        bottomRedirectText="Sign up"
        onRedirectClick={handleMoveToSignUp}
      />
    </BackgroundImage>
  );
};
