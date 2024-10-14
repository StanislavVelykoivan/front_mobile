import { jest } from '@jest/globals';
import { NativeModules } from 'react-native';

const RNEncryptedStorage = {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve('{ "foo": 1 }')),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
};
  
export default RNEncryptedStorage;