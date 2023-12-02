import React, { useState } from 'react'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import { inputValidator, adressValidator } from '../../validator/ProfilePartnerValidator/inputValidator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/MainComponents/Header'

export default function AdressScreen({ navigation }) {

  // Value DTO for HTTP Request
  const [plz, setPLZ] = useState({ value: '', error: '' })
  const [ort, setOrt] = useState({ value: '', error: '' })
  const [strasse, setStrasse] = useState({ value: '', error: '' })
  const [nr, setNr] = useState({ value: '', error: '' })

  const onContinuePressed = async() => {

    const plzError = adressValidator(plz.value)
    const ortError = inputValidator(ort.value)
    const strasseError = inputValidator(strasse.value)
    const nrError = inputValidator(nr.value)
    if (plzError || ortError || strasseError || nrError) {
      setPLZ({ ...plz, error: plzError })
      setOrt({ ...ort, error: ortError })
      setStrasse({ ...strasse, error: strasseError })
      setNr({ ...nr, error: nrError })
      return
    }
    
    var valueToken = await AsyncStorage.getItem('token')
    var valueId = await AsyncStorage.getItem('id')  
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    navigation.navigate('PhoneNumberScreen') 

    fetch('http://localhost:8080/api/v1/profil/partner/'+ valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${valueToken}`,
      },
      body: JSON.stringify({
        adresse: {
          plz: plz.value,
          ort: ort.value,
          strasse: strasse.value,
          nr: nr.value
        }
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigation.navigate('PhoneNumberScreen') 
      return
    })
    .catch(error => console.error('Fehler:', error));
  }

  return (
    <Background>
      <Header items="Profil erstellen" icon="logout"  ></Header>
      <Paragraph>Schritt: 4/10</Paragraph>
      <Paragraphtitel>WIE LAUTET IHRE ADRESSE?</Paragraphtitel>
      <TextInput
        label="PLZ"
        onChangeText={(text) => setPLZ({ value: text, error: '' })}
        value={plz.value}
        error={!!plz.error}
        errorText={plz.error}
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="plz"
        textContentType="plz"
        keyboardType="plz"
      />
       <TextInput
        label="Ort"
        onChangeText={(text) => setOrt({ value: text, error: '' })}
        value={ort.value}
        error={!!ort.error}
        errorText={ort.error}
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="ort"
        textContentType="ort"
        keyboardType="ort"
      />
       <TextInput
        label="Straße"
        onChangeText={(text) => setStrasse({ value: text, error: '' })}
        value={strasse.value}
        error={!!strasse.error}
        errorText={strasse.error}
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="straße"
        textContentType="straße"
        keyboardType="straße"
      />
      <TextInput
        label="Nr."
        onChangeText={(text) => setNr({ value: text, error: '' })}
        value={nr.value}
        error={!!nr.error}
        errorText={nr.error}
        returnKeyType="done"
      />
      <Button mode="contained" onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}