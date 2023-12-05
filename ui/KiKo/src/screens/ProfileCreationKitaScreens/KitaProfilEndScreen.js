// Profil erstellen fertig
import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function KitaProfileEndScreen({ navigation }) {

  // Profildaten werden in AsyncStorage geladen
  const onNextPressed = async() => {
    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id') 
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);
    
    fetch('http://localhost:8080/api/v1/profil/kita/'+ valueId, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${valueToken}`,
      },
    })
    .then(response => response.json()) // Mapping auf JSON
    .then(data => {
      console.log(data);
      
      AsyncStorage.setItem('name_kita', data.name_kita);
      AsyncStorage.setItem('email', data.email);
      AsyncStorage.setItem('anrede_ansprechperson', data.anrede_ansprechperson);
      AsyncStorage.setItem('vorname_ansprechperson', data.vorname_ansprechperson);
      AsyncStorage.setItem('nachname_ansprechperson', data.nachname_ansprechperson);
      AsyncStorage.setItem('plz', data.adresse.plz);
      AsyncStorage.setItem('ort', data.adresse.ort);
      AsyncStorage.setItem('strasse', data.adresse.strasse);
      AsyncStorage.setItem('nr', data.adresse.nr);

      navigation.navigate('ProfileKitaScreen')
      return
    })
    .catch(error => console.error('Fehler:', error));
    }

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Paragraphtitel>GESCHAFFT!</Paragraphtitel>
      <Paragraph>Bitte beachten Sie, dass Sie erst nach dem Verifizierungsprozess Zugriff auf die anderen Funktionen von Kiko haben werden. 
        Bis dahin können Sie gerne ihr Profil weitergestalten.</Paragraph>
      <Button mode="contained" onPress={onNextPressed}>
        Weiter
      </Button>
    </Background>
  )
}