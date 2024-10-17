import axios from 'axios';
import { apiPrivate } from '../../api';
import { TPostUserSignInRequest } from './types/postSignIn';
import { TPostUserSignUpRequest } from './types/postSignUp';

export class AuthService {
  static async postSignUp(
    data: TPostUserSignUpRequest['payload']
  ): Promise<TPostUserSignUpRequest['response']> {
    const formDataPayload = new FormData();
    formDataPayload.append('nickname', data.nickname);
    formDataPayload.append('phone', data.phone);
    formDataPayload.append('email', data.email);
    formDataPayload.append('password', data.password);
    formDataPayload.append('confirmPassword', data.confirmPassword);
    formDataPayload.append('avatar', {
      uri: data.avatar?.uri,
      name: data.avatar?.fileName,
      type: data.avatar?.type,
    });

    return apiPrivate.post('/auth/register', formDataPayload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static async postSignIn(
    data: TPostUserSignInRequest['payload']
  ): Promise<TPostUserSignInRequest['response']> {
    return apiPrivate.post('/auth/login', data);
  }
}
