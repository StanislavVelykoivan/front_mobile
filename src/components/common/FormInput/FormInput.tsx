import React, { useEffect, useRef, useState } from 'react';
import { TFormInputProps } from './types.ts';
import {
  InputIcon,
  Row,
  StyledBackgroundImage,
  StyledBottomImage,
  StyledFormInput,
  StyledInactiveInput,
} from './styled.ts';
import { TextInput } from 'react-native';
import { Images } from '@assets/Images.ts';

export const FormInput = ({
  placeholder,
  onTextChange,
  iconActive,
  iconInactive,
  keyboardType = 'default',
  isSensitive = false,
}: TFormInputProps) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleIsFocused = () => {
    console.log('Is focused!');
    setIsFocused(true);
    
    
  };

  const handleOffFocused = () => {
    setIsFocused(false);
  };

  const handleTextChange = (newText: string) => {
    setValue(newText);
    onTextChange(newText);
  };

  useEffect(() => {
    if (inputRef.current) {
      isFocused ? inputRef.current.focus() : inputRef.current.blur();
    }
  }, [isFocused]);

  return isFocused ? (
    <StyledBackgroundImage source={Images.ActiveInputBg}>
      <Row>
        <StyledFormInput
          ref={inputRef}
          placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
          value={value}
          onChangeText={handleTextChange}
          onFocus={handleIsFocused}
          onBlur={handleOffFocused}
          secureTextEntry={isSensitive}
          keyboardType={keyboardType}
          placeholder={placeholder}
        />
        <InputIcon
          source={isFocused ? iconActive : iconInactive}
          resizeMode="contain"
        />
      </Row>
    </StyledBackgroundImage>
  ) : (
    <StyledInactiveInput>
      <Row>
        <StyledFormInput
          placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
          onFocus={handleIsFocused}
          value={value}
          secureTextEntry={isSensitive}
          placeholder={placeholder}
        />
        <InputIcon source={iconInactive} resizeMode="contain" />
      </Row>
      <StyledBottomImage source={Images.InactiveInputBg} resizeMode="contain" />
    </StyledInactiveInput>
  );
};
