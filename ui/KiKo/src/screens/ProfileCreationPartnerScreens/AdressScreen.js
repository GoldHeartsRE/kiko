import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { Paragraph } from 'react-native-paper'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import { IP } from '../../constants/constants'
import {
  adressValidator,
  inputValidator
} from '../../validator/ProfilePartnerValidator/inputValidator'

/**
 * @memberof ProfileCreationPartnerScreens
 * @class AdressScreen
 * @description Zuständig bei der Profilerstellung für die Eingabe der Adresse des Partners
 */

export default function AdressScreen ({ navigation }) {
  const [plz, setPLZ] = useState({ value: '', error: '' })
  const [ort, setOrt] = useState({ value: '', error: '' })
  const [strasse, setStrasse] = useState({ value: '', error: '' })
  const [nr, setNr] = useState({ value: '', error: '' })

  /**
   * @method onContinuePressed
   * @memberof ProfileCreationPartnerScreens.AdressScreen
   * @async
   * @description Async Methode welches die eingegebenen Werte aus der UI speichert, via
   * PUT-Request in der Datenbank speichert und zum nächsten Screen in der Proifilerstellung weiterleitet
   */

  const onContinuePressed = async () => {
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
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10)
    console.log(valueToken)
    console.log(`Bearer ${valueToken}`)

    navigation.navigate('PhoneNumberScreen')

    fetch('http://' + IP + ':8080/api/v1/profil/partner/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${valueToken}`
      },
      body: JSON.stringify({
        adresse: {
          plz: plz.value,
          ort: ort.value,
          strasse: strasse.value,
          nr: nr.value
        }
      })
    })
      .then(response => response)
      .then(data => {
        navigation.navigate('PhoneNumberScreen')
        return
      })
      .catch(error => console.error('Fehler:', error))
  }

  return (
    <Background>
      <Header items='Profil erstellen' icon='logout'></Header>
      <Paragraph>Schritt: 4/10</Paragraph>
      <Paragraphtitel>WIE LAUTET IHRE ADRESSE?</Paragraphtitel>
      <TextInput
        label='PLZ'
        onChangeText={text => setPLZ({ value: text, error: '' })}
        value={plz.value}
        error={!!plz.error}
        errorText={plz.error}
        returnKeyType='next'
        autoCapitalize='none'
        autoCompleteType='off'
        textContentType='none'
        keyboardType='numeric'
      />
      <TextInput
        label='Ort'
        onChangeText={text => setOrt({ value: text, error: '' })}
        value={ort.value}
        error={!!ort.error}
        errorText={ort.error}
        returnKeyType='next'
        autoCapitalize='none'
        autoCompleteType='off'
        textContentType='none'
        keyboardType='default'
      />
      <TextInput
        label='Straße'
        onChangeText={text => setStrasse({ value: text, error: '' })}
        value={strasse.value}
        error={!!strasse.error}
        errorText={strasse.error}
        returnKeyType='next'
        autoCapitalize='none'
        autoCompleteType='off'
        textContentType='none'
        keyboardType='default'
      />
      <TextInput
        label='Nr.'
        onChangeText={text => setNr({ value: text, error: '' })}
        value={nr.value}
        error={!!nr.error}
        errorText={nr.error}
        returnKeyType='done'
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
