import axios, { AxiosRequestConfig } from 'axios';
import { HOST } from '@env';
import { EncryptedStorageService } from '@common/storage/encryptedStorage';

// Проверка корректности переменной окружения HOST
if (!HOST) {
  console.error(
    'HOST is not defined! Please check your environment variables.'
  );
}

console.log('HOST => ', HOST);

const privateInstance = axios.create({
  baseURL: HOST,
  withCredentials: true, // Для авторизованных запросов
  headers: {
    'Access-Control-Allow-Origin': '*', // Временно разрешить все источники
  },
});

const formDataInstance = axios.create({
  baseURL: HOST,
  withCredentials: false, // Для запросов с формами, например загрузка файлов
  // Позволяем Axios автоматически устанавливать заголовки для FormData
  headers: {
    'Access-Control-Allow-Origin': '*'  // Временно разрешить все источники
  }
});

// Перехватчик для добавления токена авторизации
const setAuthToken = async (config: AxiosRequestConfig) => {
  try {
    const token = await EncryptedStorageService.getToken();
    console.log('Retrieved token:', token);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return config; // Возвращаем конфиг даже в случае ошибки, чтобы запрос всё равно прошёл
  }
};

// Логирование запросов для отладки
formDataInstance.interceptors.request.use((request) => {
  console.log('Starting Request:', request);
  return request;
});

// Логирование ответа и обработка ошибок для FormData
formDataInstance.interceptors.response.use(
  (response) => {
    console.log(
      `Response: ${response.status} ${response.config.url}`,
      response.data
    );
    return response;
  },
  (error) => {
    if (error.response) {
      // Выводим тело ответа с сервера, чтобы понять, что он ожидает
      console.error('Response Error:', error.response.data);
    } else {
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Логирование ответа и обработка ошибок для privateInstance (если нужны другие настройки)
privateInstance.interceptors.response.use(
  (response) => {
    console.log(
      `Response: ${response.status} ${response.config.url}`,
      response.data
    );
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `Response Error ${error.response.status}: ${error.response.data}`
      );
    } else {
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const apiPrivate = privateInstance;
export const apiFormData = formDataInstance;
