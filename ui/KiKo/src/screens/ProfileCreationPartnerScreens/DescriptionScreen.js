import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import BigTextInput from '../../components/PartnerCreationComponents/BigTextInput'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../../constants/constants'

  /**
   * @memberof ProfileCreationPartnerScreens
   * @class DescriptionScreen
   * @description Zuständig bei der Profilerstellung für die Eingabe der Beschreibung über den Partner
   */

export default function DescriptionScreen({ navigation }) {

  const [beschreibung, setBeschreibung] = useState({ value: '', error: '' })

    /**
   * @method onContinuePressed
   * @memberof ProfileCreationPartnerScreens.DescriptionScreen
   * @async
   * @description Async Methode welches die eingegebenen Werte aus der UI speichert, via 
   * PUT-Request in der Datenbank speichert und zum nächsten Screen in der Proifilerstellung weiterleitet
   */

  const onContinuePressed = async() => {

    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id') 
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    navigation.navigate('PartnerProfileEndScreen') 

    fetch('http://'+ IP +':8080/api/v1/profil/partner/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${valueToken}`,
      },
      body: JSON.stringify({
        beschreibung: beschreibung.value,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigation.navigate('PartnerProfileEndScreen') 
      return
    })
    .catch(error => console.error('Fehler:', error));
  }

  return (
    <Background>
      <Header items="Profil erstellen" icon="logout"  ></Header>
      <Paragraph>Schritt: 10/10</Paragraph>
      <Paragraphtitel>FÜGEN SIE EINE KURZE BESCHREIBUNG ZU IHNEN EIN.</Paragraphtitel>
      <BigTextInput
        label="Hallo, ich bin..."
        returnKeyType="next"
        onChangeText={(text) => setBeschreibung({ value: text, error: '' })}
        value={beschreibung.value}
        autoCapitalize="none"
        autoCompleteType="off"
        textContentType="none"
        keyboardType="default"
      />
      <Button mode="contained" onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('PartnerProfileEndScreen')}>
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}