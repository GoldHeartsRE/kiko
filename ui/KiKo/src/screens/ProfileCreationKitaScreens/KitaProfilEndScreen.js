// Profil erstellen fertig
import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../../constants/constants'

  /**
   * @memberof ProfileCreationKitaScreens
   * @class KitaProfileEndScreen
   * @description Der letzte Screen in der Profilerstellung vor dem Laden ins Profil
   */

export default function KitaProfileEndScreen({ navigation }) {

  /**
   * @method onNextPressed
   * @memberof ProfileCreationKitaScreens.KitaProfileEndScreen
   * @async
   * @description Async Methode welche alle Werte vor dem Laden ins Profil nochmal checkt und abholt
   * via eines GET-Requests
   */

  const onNextPressed = async() => {
    var valueToken = await AsyncStorage.getItem('token') 
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10); 
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    fetch('http://'+ IP +':8080/api/v1/profil/kita/'+ valueId, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${valueToken}`,
      },
    })
    .then(response => response.json()) // Mapping auf JSON
    .then(data => {
      AsyncStorage.setItem('name_kita', data.name_kita);
      AsyncStorage.setItem('email', data.email);
      AsyncStorage.setItem('anrede_ansprechperson', data.anrede_ansprechperson);
      AsyncStorage.setItem('vorname_ansprechperson', data.vorname_ansprechperson);
      AsyncStorage.setItem('nachname_ansprechperson', data.nachname_ansprechperson);
      AsyncStorage.setItem('plz', data.adresse.plz.toString());
      AsyncStorage.setItem('ort', data.adresse.ort);
      AsyncStorage.setItem('strasse', data.adresse.strasse);
      AsyncStorage.setItem('nr', data.adresse.nr);

      navigation.navigate('DashboardKitaScreen')
      return
    })
    .catch(error => console.error('Fehler:', error));
    }

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