import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { Paragraph } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import TextInput from '../../components/KitaCreationComponents/TextInput'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'
import { IP } from '../../constants/constants'
import { kitaNameValidator } from '../../validator/nameValidator'

/**
 * @memberof ProfileCreationKitaScreens
 * @class NameKitaScreen
 * @description Zuständig bei der Profilerstellung für die Eingabe des Namens der Kita
 */

export default function NameKitaScreen ({ navigation }) {
  //Getter und Setter für Requests
  const [kitaName, setName] = useState({ value: '', error: '' })

  /**
   * @method onContinuePressed
   * @memberof ProfileCreationKitaScreens.NameKitaScreen
   * @async
   * @description Async Methode welches die eingegebenen Werte aus der UI speichert, via
   * PUT-Request in der Datenbank speichert und zum nächsten Screen in der Proifilerstellung weiterleitet
   */

  const onContinuePressed = async () => {
    const nameError = kitaNameValidator(kitaName.value)
    if (nameError) {
      setName({ ...kitaName, error: nameError })
      return
    }
    navigation.navigate('AdressKitaScreen')

    var valueToken = await AsyncStorage.getItem('token')
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10)
    console.log(valueToken)
    console.log(`Bearer ${valueToken}`)

    fetch('http://' + IP + ':8080/api/v1/profil/kita/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${valueToken}`
      },
      body: JSON.stringify({
        name_kita: kitaName.value
      })
    })
      .then(response => response)
      .then(data => {
        navigation.navigate('AdressKitaScreen')
        return
      })
      .catch(error => console.error('Fehler:', error))
  }

  //TODO Header
  return (
    <Background>
      <Header items='Profil erstellen' icon='logout'></Header>
      <Paragraph>Schritt: 1/4</Paragraph>
      <Paragraphtitel>WIE HEIßT IHRE KITA?</Paragraphtitel>
      <TextInput
        label='Kita'
        returnKeyType='next'
        autoCapitalize='none'
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!kitaName.error}
        errorText={kitaName.error}
        value={kitaName.value}
        autoCompleteType='off'
        textContentType='none'
        keyboardType='default'
      />
      <Button mode='contained' onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}
