import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function UploadImage() {
  const [image, setImage] = useState({ value: '', error: '' });

  const addImage= async()=>{
    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
        base64: true
    });

    if (!_image.cancelled) {
      setImage(_image.assets[0].uri);
      image.value = _image.assets[0].uri;
      onSelectedPicture
    }
  };

  const onSelectedPicture = async() => {

    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id') 

  fetch('http://localhost:8080/api/v1/profil/profilbild/' + valueId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${valueToken}`,
    },
    body: JSON.stringify({
      imagedata: image.value,
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return
  })
  .catch(error => console.error('Fehler:', error));
}

  return (
            <View style={imageUploaderStyles.container}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
            </View>
  );
}
const imageUploaderStyles=StyleSheet.create({
    container:{
        height:200,
        width:200,
        borderWidth: 1,
        borderColor: 'gray',
        position:'relative',
        borderRadius: 999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'#FFFFFF',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})