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
   * @class VerificationScreen
   * @description Zuständig bei der Profilerstellung für das Hochladen der Verifikation des Partners
   * inklusive Masernschutz
   */

export default function VerificationScreen({ navigation }) {

  const [fileResponse1, setFileResponse] = useState([]);
  const [fileResponse2, setFileResponse2] = useState([]);

  const [name1, setName1] = useState({ value: '', error: '' })
  const [name2, setName2] = useState({ value: '', error: '' })

    /**
   * @method handleDocumentSelection1
   * @memberof ProfileCreationPartnerScreens.VerificationScreen
   * @async
   * @description Async Methode welches ermöglicht, durch Buttonclick in seinen eigenen 
   * Dokumenten ein Dokument auszuwählen.
   */

  const handleDocumentSelection1 = useCallback(async () => {
    try {
      const response1 = await DocumentPicker.getDocumentAsync({
        type:'*/*',
        copyToCacheDirectory: false,
      });
      fileResponse1.value = response1.output[0]
      console.log(fileResponse1.value)             
    } catch (err) {
      console.warn(err);
    }
  }, []);

  /**
   * @method handleDocumentSelection2
   * @memberof ProfileCreationPartnerScreens.VerificationScreen
   * @async
   * @description Async Methode welches ermöglicht, durch Buttonclick in seinen eigenen 
   * Dokumenten ein Dokument auszuwählen.
   */

  const handleDocumentSelection2 = useCallback(async () => {
    try {
      const response2 = await DocumentPicker.getDocumentAsync({
        type:'*/*',
        copyToCacheDirectory: false,
      });
      fileResponse2.value = response2.output[0]
      console.log(fileResponse2.value)             
    } catch (err) {
      console.warn(err);
    }
  }, []);

  /**
   * @method onFirstPressed
   * @memberof ProfileCreationPartnerScreens.VerificationScreen
   * @async
   * @description Async Methode welches das gespeichterte Dokument aus "handleDocumentSelection1" aka Führungzeugnis 
   * in die Datenbank mittels Formdata und Documentpicker hochlädt
   */

  const onFirstPressed = async() => {

    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id') 
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    const formData = new FormData();
    formData.append('file', fileResponse1.value);

    fetch('http://'+ IP +':8080/api/v1/profil/qualifikation/' + valueId, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${valueToken}`,
      },
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return
    })
    .catch(error => console.error('Fehler:', error));
  }

    /**
   * @method onSecondPressed
   * @memberof ProfileCreationPartnerScreens.VerificationScreen
   * @async
   * @description Async Methode welches das gespeichterte Dokument aus "handleDocumentSelection1" aka Nachweis zum Masernsschutz 
   * in die Datenbank mittels Formdata und Documentpicker hochlädt
   */

  const onSecondPressed = async() => {

    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id') 
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    navigation.navigate('ProfilePictureScreen')

    const formData = new FormData();
    formData.append('file', fileResponse2.value);

    fetch('http://'+ IP +':8080/api/v1/profil/qualifikation/' + valueId, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${valueToken}`,
      },
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigation.navigate('ProfilePictureScreen') 
      return
    })
    .catch(error => console.error('Fehler:', error));
  }

  return (
    <Background>
      <Header items="Profil erstellen" icon="logout"  ></Header>
      <Paragraph>Schritt: 8/10</Paragraph>
      <Paragraphtitel>LADEN SIE BITTE DIE ERFORDERLICHE DOKUMENTE HOCH.</Paragraphtitel>
      
      <DocumentPickerSingle mode="contained" onPress={handleDocumentSelection1}>Erweitertes Führungszeugnis</DocumentPickerSingle>
      <Paragraph>{fileResponse1.name}</Paragraph>
      
      <DocumentPickerSingle mode="contained" onPress={handleDocumentSelection2}>Nachweis zum Masernschutz</DocumentPickerSingle>
      <Paragraph>{name.value}</Paragraph>


      <Button mode="contained"  onPress={() => { onFirstPressed(); onSecondPressed(); }}>
        NÄCHSTER SCHRITT
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('ProfilePictureScreen')}>
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}