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
      
        // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = _image.assets[0].uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('photo', { uri: localUri, name: filename, type });

    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id') 

  fetch('http://localhost:8080/api/v1/profil/profilbild/' + valueId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${valueToken}`,
    },
    body: JSON.stringify({
      imagedata: formData,
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return
  })
  .catch(error => console.error('Fehler:', error));
    }
  };

  const onSelectedPicture = async() => {

    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id') 

  fetch('http://localhost:8080/api/v1/profil/profilbild/' + valueId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
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