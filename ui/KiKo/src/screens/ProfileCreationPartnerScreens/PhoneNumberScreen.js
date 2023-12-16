import React, { useState } from 'react'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import { inputValidator } from '../../validator/ProfilePartnerValidator/inputValidator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/MainComponents/Header'
import { IP } from '../../constants/constants'

export default function PhoneNumberScreen({ navigation }) {

  // Value DTO for HTTP Request
  const [number, setNumber] = useState({ value: '', error: '' })

  const onContinuePressed = async() => {

    const numberError = inputValidator(number.value)
    if (numberError) {
      setNumber({ ...number, error: numberError })
      return
    }

    navigation.navigate('OccupationScreen') 

    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id') 
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    fetch('http://'+ IP +':8080/api/v1/profil/partner/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${valueToken}`,
      },
      body: JSON.stringify({
        telefon: number.value
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigation.navigate('OccupationScreen') 
      return
    })
    .catch(error => console.error('Fehler:', error));
  }

  return (
    <Background>
      <Header items="Profil erstellen" icon="logout"  ></Header>
      <Paragraph>Schritt: 5/10</Paragraph>
      <Paragraphtitel>WIE LAUTET IHRE TELEFONNUMMER?</Paragraphtitel>
      <TextInput
        label="Telefonnummer"
        onChangeText={(text) => setNumber({ value: text, error: '' })}
        value={number.value}
        error={!!number.error}
        errorText={number.error}
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="off"
        textContentType="none"
        keyboardType="numeric"
      />
      <Button mode="contained" onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}