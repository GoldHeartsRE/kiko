// Schritt 1 von 4 Name der Kita
import React, { useState } from 'react'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import TextInput from '../../components/KitaCreationComponents/TextInput'
import Header from '../../components/MainComponents/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NameKitaScreen({ navigation }) {

  const [name, setName] = useState({ value: '', error: '' })

  const onContinuePressed = async() => {

    var valueToken = await AsyncStorage.getItem('token')
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    fetch('http://localhost:8080/api/v1/profil/kita/1', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${valueToken}`,
      },
      body: JSON.stringify({
        name_kita: name.value,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigation.navigate('AdressKitaScreen') 
      return
    })
    .catch(error => console.error('Fehler:', error));
  }

  //TODO Header
  return (
    <Background>
      <Header items="Profil erstellen" icon="logout" logout={() => navigation.navigate('StartScreen')}></Header>
      <Paragraph>Schritt: 1/4</Paragraph>
      <Paragraphtitel>WIE HEIßT IHRE KITA?</Paragraphtitel>
      <TextInput
        label="Kita"
        returnKeyType="next"
        autoCapitalize="none"
        onChangeText={(text) => setName({ value: text, error: '' })}
        value={name.value}
        autoCompleteType="kita"
        textContentType="kita"
        keyboardType="kita"
      />
      <Button mode="contained" onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}