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
import { IP } from '../../constants/constants'

  /**
   * @memberof ProfileCreationPartnerScreens
   * @class QualificationScreen
   * @description Zuständig bei der Profilerstellung für das Hochladen der Qualifikation des Partners
   */

export default function QualificationScreen({ navigation }) {

  const [fileResponse, setFileResponse] = useState([]);

  const [name, setName] = useState({ value: '', error: '' })

  /**
   * @method onContinuePressed
   * @memberof ProfileCreationPartnerScreens.QualificationScreen
   * @async
   * @description Async Methode welches das gespeichterte Dokument aus "handleDocumentSelection" 
   * in die Datenbank mittels Formdata und Documentpicker hochlädt
   */

  const onContinuePressed = async() => {

    var valueToken = await AsyncStorage.getItem('token') 
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10); 
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    navigation.navigate('VerificationScreen')

    const formData = new FormData();
    formData.append('file', fileResponse.value);

    fetch('http://'+ IP +':8080/api/v1/profil/qualifikation/' + valueId, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${valueToken}`,
      },
      body: formData,
    })
    .then(response => response)
    .then(data => {
      navigation.navigate('VerificationScreen') 
      return
    })
    .catch(error => console.error('Fehler:', error));
  }

  /**
   * @method handleDocumentSelection
   * @memberof ProfileCreationPartnerScreens.ProfilePictureScreen
   * @async
   * @description Async Methode welches ermöglicht, durch Buttonclick in seinen eigenen 
   * Dokumenten ein Dokument auszuwählen.
   */

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type:'*/*',
        copyToCacheDirectory: false,
      });
      name.value = response.assets[0].name;
      fileResponse.value = response.output[0]
      console.log(fileResponse.value)
      // setFileResponse();
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