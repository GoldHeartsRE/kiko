import React, { useState } from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import DropDown from '../../components/MainComponents/DropDown'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/MainComponents/Header'
import { IP } from '../../constants/constants'

  /**
   * @memberof ProfileCreationPartnerScreens
   * @class GenderScreen
   * @description Zuständig bei der Profilerstellung für die Eingabe des Geschlechts des Partners
   */

export default function GenderScreen({ navigation }) {

  const [genderValue, setGenderValue] = useState({ value: '', error: '' })

    const options = [
        { label: 'Mann', value: 'M' },
        { label: 'Frau', value: 'W' },
        { label: 'Divers', value: 'Divers' },
      ];
    
  /**
   * @method onContinuePressed
   * @memberof ProfileCreationPartnerScreens.GenderScreen
   * @async
   * @description Async Methode welches die eingegebenen Werte aus der UI speichert, via 
   * PUT-Request in der Datenbank speichert und zum nächsten Screen in der Proifilerstellung weiterleitet
   */

  const onContinuePressed = async() => {

    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id') 
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    navigation.navigate('BirthdayScreen') 

    fetch('http://'+ IP +':8080/api/v1/profil/partner/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${valueToken}`,
      },
      body: JSON.stringify({
        geschlecht: genderValue,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigation.navigate('BirthdayScreen') 
      return
    })
    .catch(error => console.error('Fehler:', error));
  }

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Header items="Profil erstellen" icon="logout"  ></Header>
      <Paragraph>Schritt: 2/10</Paragraph>
      <Paragraphtitel>WIE IST IHR GESCHLECHT?</Paragraphtitel>
      <View>
        <DropDown  items={options} val={genderValue} placeh={'Geschlecht'} setVal={setGenderValue} onValueChange={(value) => console.log(value)} />
      </View>
      <Button mode="contained" onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}