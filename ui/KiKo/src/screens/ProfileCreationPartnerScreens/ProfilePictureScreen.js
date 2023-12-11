import React, { useState, useCallback } from 'react';
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, View, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


export default function ProfilePictureScreen({ navigation }) {

  const [image, setImage] = useState({ value: '', error: '' });

  const [picture, setPicture] = useState([]);


  const addImage= async()=>{
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
      base64: true
  });
  console.log(_image);
  setImage(_image.assets[0].uri);
  picture.value = _image.assets[0];
  console.log(picture.value);
  console.log(_image);
  }

  const onSelectedPicture = async() => {

    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id')

    const formData = new FormData();
    formData.append('photo', picture.value);

  fetch('http://localhost:8080/api/v1/profil/profilbild/' + valueId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${valueToken}`,
    },
    body: JSON.stringify({
      body: formData,
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return
  })
  .catch(error => console.error('Fehler:', error));
}

  // const [fileResponse, setFileResponse] = useState([]);

  // const [name, setName] = useState({ value: '', error: '' })

  // const onContinuePressed = async() => {

  //   var valueToken = await AsyncStorage.getItem('token') 
  //   var valueId = await AsyncStorage.getItem('id') 
  //   console.log(valueToken);
  //   console.log(`Bearer ${valueToken}`);

  //   navigation.navigate('VerificationScreen')

  //   const formData = new FormData();
  //   formData.append('file', fileResponse.value);

  //   fetch('http://localhost:8080/api/v1/profil/profilbild/' + valueId, {
  //     method: 'PUT',
  //     headers: {
  //       'Authorization': `Bearer ${valueToken}`,
  //     },
  //     body: formData,
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     navigation.navigate('VerificationScreen') 
  //     return
  //   })
  //   .catch(error => console.error('Fehler:', error));
  // }

  // const handleDocumentSelection = useCallback(async () => {
  //   try {
  //     const response = await DocumentPicker.getDocumentAsync({
  //       type:'image/png',
  //       copyToCacheDirectory: false,
  //     });
  //     name.value = response.assets[0].uri;
  //     fileResponse.value = response.output[0]
  //     console.log(fileResponse.value)
  //     // setFileResponse();
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }, []);

  return (
    <Background>
      <Header items="Profil erstellen" icon="logout"  ></Header>
      <Paragraph>Schritt: 9/10</Paragraph>
      <Paragraphtitel>FÜGEN SIE EIN BILD VON SICH EIN.</Paragraphtitel>
      <View style={imageUploaderStyles.container}>
                {
                    image && <Image source={{ uri: image  }} style={{ width: 200, height: 200 }} />
                }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
            </View>
      <Button mode="contained" onPress={onSelectedPicture}>
        NÄCHSTER SCHRITT
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('DescriptionScreen')}>
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
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