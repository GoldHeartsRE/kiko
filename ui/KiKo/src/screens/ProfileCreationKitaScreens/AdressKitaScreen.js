// Schritt 2 von 4 Adresse Kita
import React, { useState } from 'react'
import { Paragraph } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import TextInput from '../../components/KitaCreationComponents/TextInput'
import Header from '../../components/MainComponents/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { plzValidator, ortValidator, straßeValidator, nummerValidator } from '../../validator/adressValidator'

export default function AdressKitaScreen({ navigation }) {
  const [plz, setPlz] = useState({ value: '', error: '' })
  const [ort, setOrt] = useState({ value: '', error: '' })
  const [straße, setStraße] = useState({ value: '', error: '' })
  const [nummer, setNummer] = useState({ value: '', error: '' })

  const onNextPressed = async() => {
    const plzError = plzValidator(plz.value)
    const ortError = ortValidator(ort.value)
    const straßeError = straßeValidator(straße.value)
    const nummerError = nummerValidator(nummer.value)
    if (plzError || ortError || straßeError || nummerError) {
      setPlz({ ...plz, error: plzError })
      setOrt({ ...ort, error: ortError })
      setStraße({ ...straße, error: straßeError })
      setNummer({ ...nummer, error: nummerError })
      return
    }
    navigation.navigate('AnsprechpartnerScreen')

    var valueToken = await AsyncStorage.getItem('token')
    var valueId = await AsyncStorage.getItem('id')  
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    fetch('http://localhost:8080/api/v1/profil/kita/'+ valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${valueToken}`,
      },
      body: JSON.stringify({
        adresse: {
          plz: plz.value,
          ort: ort.value,
          strasse: straße.value,
          nr: nummer.value
        }
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigation.navigate('AnsprechpartnerScreen') 
      return
    })
    .catch(error => console.error('Fehler:', error));
}

  return (
    <Background>
      <Header items="Profil erstellen" icon="logout"  ></Header>
      <Paragraph>Schritt: 2/4</Paragraph>
      <Paragraphtitel>WO BEFINDET SICH IHRE KITA?</Paragraphtitel>
      <TextInput
        label="PLZ"
        returnKeyType="next"
        value={plz.value}
        onChangeText={(text) => setPlz({ value: text, error: '' })}
        error={!!plz.error}
        errorText={plz.error}
        autoCapitalize="none"
        autoCompleteType="off"
        textContentType="none"
        keyboardType="numeric"
      />
       <TextInput
        label="Ort"
        returnKeyType="next"
        value={ort.value}
        onChangeText={(text) => setOrt({ value: text, error: '' })}
        error={!!ort.error}
        errorText={ort.error}
        autoCapitalize="none"
        autoCompleteType="off"
        textContentType="none"
        keyboardType="default"
      />
       <TextInput
        label="Straße"
        returnKeyType="next"
        value={straße.value}
        onChangeText={(text) => setStraße({ value: text, error: '' })}
        error={!!straße.error}
        errorText={straße.error}
        autoCapitalize="none"
        autoCompleteType="off"
        textContentType="none"
        keyboardType="default"
      />
      <TextInput
        label="Nr."
        returnKeyType="done"
        value={nummer.value}
        onChangeText={(text) => setNummer({ value: text, error: '' })}
        error={!!nummer.error}
        errorText={nummer.error}
        autoCompleteType="off"
        textContentType="none"
        keyboardType="numeric"
      />
      <Button mode="contained" onPress={onNextPressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}