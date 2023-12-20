import React, { useState, useEffect } from 'react';
import { Avatar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IP } from '../../constants/constants'

  /**
   * @method ProfilePicture
   * @memberof MainComponents.ProfilePicture
   * @async
   * @description ProfilePicture für die MainComponents, regelt das fetchen des Profilbilds
   */

export default function ProfilePicture() {

const [image, setImage] = useState({ value: '', error: '' });

const fetchImage = async () => {
  var valueToken = await AsyncStorage.getItem('token') 
  const valueId = parseInt(await AsyncStorage.getItem('id'), 10); 

  const res = await fetch('http://'+ IP +':8080/api/v1/profil/profilbild/' + valueId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${valueToken}`,
    },
  })

  if (res.status === 200) {
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    imageObjectURL = image.value
    // setImage(imageObjectURL);
  } else {
    setImage(null);
  }
};

useEffect(() => {
  fetchImage();
}, []);

    return (
      <View style={imageUploaderStyles.container}>
      {image ? (
        <Image source={{ uri: image.value }} style={{ width: 110, height: 110 }} />
      ) : (
        <Avatar.Icon size={110} icon="account" />
      )}
    </View>
  );
  }

  const imageUploaderStyles=StyleSheet.create({
    container:{
        height:110,
        width:110,
        borderWidth: 1,
        borderColor: 'gray',
        position:'relative',
        borderRadius: 999,
        overflow:'hidden',
    }
})