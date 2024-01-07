import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Paragraph } from 'react-native-paper'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import DropDown from '../../components/MainComponents/DropDown'
import Header from '../../components/MainComponents/Header'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import { IP } from '../../constants/constants'

/**
 * @memberof ProfileCreationPartnerScreens
 * @class GenderScreen
 * @description Zuständig bei der Profilerstellung für die Eingabe des Geschlechts des Partners
 */

export default function GenderScreen ({ navigation }) {
  //Getter und Setter für Requests
  const [genderValue, setGenderValue] = useState({ value: '', error: '' })

  const options = [
    { label: 'Mann', value: 'M' },
    { label: 'Frau', value: 'W' },
    { label: 'Divers', value: 'Divers' }
  ]

  /**
   * @method onContinuePressed
   * @memberof ProfileCreationPartnerScreens.GenderScreen
   * @async
   * @description Async Methode welches die eingegebenen Werte aus der UI speichert, via
   * PUT-Request in der Datenbank speichert und zum nächsten Screen in der Proifilerstellung weiterleitet
   */

  const onContinuePressed = async () => {
    var valueToken = await AsyncStorage.getItem('token')
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10)
    console.log(valueToken)
    console.log(`Bearer ${valueToken}`)

    navigation.navigate('BirthdayScreen')

    fetch('http://' + IP + ':8080/api/v1/profil/partner/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${valueToken}`
      },
      body: JSON.stringify({
        geschlecht: genderValue
      })
    })
      .then(response => response)
      .then(data => {
        navigation.navigate('BirthdayScreen')
        return
      })
      .catch(error => console.error('Fehler:', error))
  }

  //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Header items='Profil erstellen' icon='logout'></Header>
      <Paragraph>Schritt: 2/10</Paragraph>
      <Paragraphtitel>WIE IST IHR GESCHLECHT?</Paragraphtitel>
      <View>
        <DropDown
          items={options}
          val={genderValue}
          placeh={'Geschlecht'}
          setVal={setGenderValue}
          onValueChange={value => console.log(value)}
        />
      </View>
      <Button mode='contained' onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}
