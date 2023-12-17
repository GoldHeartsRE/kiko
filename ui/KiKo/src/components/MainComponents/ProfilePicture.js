import React, { useState, useEffect } from 'react';
import { Avatar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';

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
  var valueId = await AsyncStorage.getItem('id') 

  const res = await fetch('http://localhost:8080/api/v1/profil/profilbild/' + valueId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${valueToken}`,
    },
  })
  const imageBlob = await res.blob();
  const imageObjectURL = URL.createObjectURL(imageBlob);
  setImage(imageObjectURL);
};

useEffect(() => {
  fetchImage();
}, []);

    return (
        // <Avatar.Icon size={180} icon="account"/>
        <View style={imageUploaderStyles.container}>
        {
            image  && <Image source={{ uri: image }} style={{ width: 180, height: 180 }} />
        }
        </View>
    )
  }

  const imageUploaderStyles=StyleSheet.create({
    container:{
        height:180,
        width:180,
        borderWidth: 1,
        borderColor: 'gray',
        position:'relative',
        borderRadius: 999,
        overflow:'hidden',
    }
})