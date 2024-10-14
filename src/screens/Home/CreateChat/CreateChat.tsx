import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';
import { Service } from '@common/services';
import { useUserData } from '../../../store/tools';
import { useDispatch } from 'react-redux';
import { userSliceActions } from '../../../store/modules/user/reducer'; // Adjust this import as per your file structure
import { FormView, Input, MainView, NextButton, Title } from './styled';
import * as ImagePicker from 'expo-image-picker';

type TItem = {
  label: string;
  value: string;
};

export const CreateChat = () => {
  const { user } = useUserData();
  const dispatch = useDispatch();
  const [users, setUsers] = useState<Array<TItem>>([]);
  const [chatName, setChatName] = useState<string>('');
  const [dropdownValue, setDropdownValue] = useState<Array<string>>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    Service.UserService.getAllUsers().then((res) =>
      setUsers(
        res.data.map((user) => ({
          label: user.nickname,
          value: user.uuid,
        }))
      )
    );
  }, []);

  const handlePickImage = async () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImageUri(result.assets[0].uri)


    // launchImageLibrary(options, (response) => {
    //   if (response.didCancel) {
    //     Alert.alert('Image selection canceled');
    //   } else if (response.errorCode) {
    //     Alert.alert('ImagePicker Error', response.errorMessage || 'Unknown error');
    //   } else if (response.assets && response.assets.length > 0) {
    //     setImageUri(response.assets[0].uri);
    //     Alert.alert('Image selected', 'You have selected an image for the chat.');
    //   }
    // });
  };

  const handleCreateChat = () => {
    if (!user?.uuid) {
      Alert.alert("Can't create room, because User UUID is not found!");
      return;
    }
    if (dropdownValue.length === 0) {
      Alert.alert("Can't create room, because you didn't pick any users!");
      return;
    }
    if (!imageUri) {
      Alert.alert("Please select an image for the chat!");
      return;
    }
  
    const formData = new FormData();
    formData.append('name', chatName);
    dropdownValue.forEach((uuid) => {
      formData.append('users', uuid);
    });
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg', // Adjust the type based on the selected image type
      name: 'chat_image.jpg',
    });
  
    Service.ChatService.postCreateRoom(formData)
      .then((res) => {
        console.log(res.data);
        Alert.alert(`Chat ${chatName} created successfully`);
      })
      .catch((e) => {
        console.log(e.response);
        Alert.alert("Error creating chat", e.response?.data?.message || "An unexpected error occurred");
      });
  };

  return (
    <MainView>
      <Title>Create Chat</Title>

      <FormView>
        <Input
          placeholder="Chat name"
          value={chatName}
          onChangeText={setChatName}
        />

        <DropDownPicker
          multiple={true}
          open={dropdownOpen}
          value={dropdownValue}
          items={users}
          setOpen={setDropdownOpen}
          setValue={setDropdownValue}
          setItems={setUsers}
        />

        <NextButton onPress={handlePickImage}>
          <Text>Select Image</Text>
        </NextButton>

        <NextButton onPress={handleCreateChat}>
          <Text>Create</Text>
        </NextButton>
      </FormView>

      {imageUri && (
        <View style={{ marginTop: 20 }}>
          <Text>Selected Image: {imageUri}</Text>
        </View>
      )}
    </MainView>
  );
};
