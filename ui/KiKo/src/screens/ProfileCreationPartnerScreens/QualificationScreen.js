import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import DocumentPickerSingle from '../../components/MainComponents/DocumentPickerSingle'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';


export default function QualificationScreen({ navigation }) {

  const [fileResponse, setFileResponse] = useState([]);

  const [name, setName] = useState({ value: '', error: '' })
  const [type, setType] = useState({ value: '', error: '' })
  const [uri, setUri] = useState({ value: '', error: '' })

  const onContinuePressed = async() => {

    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id') 
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    navigation.navigate('VerificationScreen') 

    fetch('http://localhost:8080/api/v1/profil/qualifikation/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${valueToken}`,
      },
      body: JSON.stringify({
        file_name: name.value,
        type: type.value,
        filedata: uri.value 
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigation.navigate('VerificationScreen') 
      return
    })
    .catch(error => console.error('Fehler:', error));
  }

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type:'*/*',
        copyToCacheDirectory: false,
      });
      console.log(response);
      name.value = response.assets[0].name;
      type.value = response.assets[0].mimeType;
      uri.value = response.assets[0].uri
      setFileResponse(response.assets.name);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <Background>
      <Header items="Profil erstellen" icon="logout"  ></Header>
      <Paragraph>Schritt: 7/10</Paragraph>
      <Paragraphtitel>HABEN SIE DOKUMENTE ZUM NACHWEIS?</Paragraphtitel>
      <DocumentPickerSingle mode="contained" onPress={handleDocumentSelection}>Hochladen</DocumentPickerSingle>
      <Button mode="contained" onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('VerificationScreen')}>
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
} 