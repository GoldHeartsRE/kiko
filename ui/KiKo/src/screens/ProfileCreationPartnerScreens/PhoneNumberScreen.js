import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { Paragraph } from 'react-native-paper'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import { IP } from '../../constants/constants'
import { inputValidator } from '../../validator/ProfilePartnerValidator/inputValidator'

/**
 * @memberof ProfileCreationPartnerScreens
 * @class PhoneNumberScreen
 * @description Zuständig bei der Profilerstellung für die Eingabe der Telefonnummer des Partners
 */

export default function PhoneNumberScreen ({ navigation }) {
  const [number, setNumber] = useState({ value: '', error: '' })

  /**
   * @method onContinuePressed
   * @memberof ProfileCreationPartnerScreens.PhoneNumberScreen
   * @async
   * @description Async Methode welches die eingegebenen Werte aus der UI speichert, via
   * PUT-Request in der Datenbank speichert und zum nächsten Screen in der Proifilerstellung weiterleitet
   */

  const onContinuePressed = async () => {
    const numberError = inputValidator(number.value)
    if (numberError) {
      setNumber({ ...number, error: numberError })
      return
    }

    navigation.navigate('OccupationScreen')

    var valueToken = await AsyncStorage.getItem('token')
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10)
    console.log(valueToken)
    console.log(`Bearer ${valueToken}`)

    fetch('http://' + IP + ':8080/api/v1/profil/partner/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${valueToken}`
      },
      body: JSON.stringify({
        telefon: number.value
      })
    })
      .then(response => response)
      .then(data => {
        navigation.navigate('OccupationScreen')
        return
      })
      .catch(error => console.error('Fehler:', error))
  }

  return (
    <Background>
      <Header items='Profil erstellen' icon='logout'></Header>
      <Paragraph>Schritt: 5/10</Paragraph>
      <Paragraphtitel>WIE LAUTET IHRE TELEFONNUMMER?</Paragraphtitel>
      <TextInput
        label='Telefonnummer'
        onChangeText={text => setNumber({ value: text, error: '' })}
        value={number.value}
        error={!!number.error}
        errorText={number.error}
        returnKeyType='next'
        autoCapitalize='none'
        autoCompleteType='off'
        textContentType='none'
        keyboardType='numeric'
      />
      <Button mode='contained' onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}
