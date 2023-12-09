import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PartnerProfileEndScreen({ navigation }) {

    // const options = [
    //     { label: 'Student', value: 'Student' },
    //     { label: 'Berufstätig', value: 'Berufstätig' },
    //     { label: 'Mitglied in einem Verein', value: 'Mitglied in einem Verein' },
    //   ];

  // Profildaten werden in AsyncStorage geladen
  const onNextPressed = async() => {
    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id') 
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);
    
    fetch('http://localhost:8080/api/v1/profil/partner/'+ valueId, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${valueToken}`,
      },
    })
    .then(response => response.json()) // Mapping auf JSON
    .then(data => {
      console.log(data);
      
      AsyncStorage.setItem('email', data.email);
      AsyncStorage.setItem('anrede', data.anrede);
      AsyncStorage.setItem('vorname', data.vorname);
      AsyncStorage.setItem('nachname', data.nachname);
      AsyncStorage.setItem('geschlecht', data.geschlecht);
      AsyncStorage.setItem('geburtsdatum', data.geburtsdatum);
      AsyncStorage.setItem('plz', data.adresse.plz);
      AsyncStorage.setItem('ort', data.adresse.ort);
      AsyncStorage.setItem('strasse', data.adresse.strasse);
      AsyncStorage.setItem('nr', data.adresse.nr);
      AsyncStorage.setItem('telefon', data.telefon);
      AsyncStorage.setItem('taetigkeit', data.taetigkeit);
      AsyncStorage.setItem('organisation', data.organisation);
      AsyncStorage.setItem('beschreibung', data.beschreibung);

      navigation.navigate('DashboardPartnerScreen')
      return
    })
    .catch(error => console.error('Fehler:', error));
    }

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Paragraphtitel>GESCHAFFT!</Paragraphtitel>
      <Paragraph>Bitte Beachten Sie, dass sie erst nach dem Verifizierungsprozess zugriff auf die anderen funktionen von Kiko haben werden. 
        Bis dahin können sie gerne ihr Profil weitergestalten.</Paragraph>
      <Button mode="contained" onPress={onNextPressed}>
        Weiter
      </Button>
    </Background>
  )
}