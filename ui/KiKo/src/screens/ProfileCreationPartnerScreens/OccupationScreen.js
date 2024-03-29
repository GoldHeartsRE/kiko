import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph } from 'react-native-paper'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import DropDown from '../../components/MainComponents/DropDown'
import Header from '../../components/MainComponents/Header'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import { IP } from '../../constants/constants'

/**
 * @memberof ProfileCreationPartnerScreens
 * @class OccupationScreen
 * @description Zuständig bei der Profilerstellung für die Eingabe der Beschäftigung des Partners,
 * wie z. B. Student oder festes Arbeitsverhältnis
 */

export default function OccupationScreen ({ navigation }) {
  //Getter und Setter für Requests
  const [feld1, setFeld1] = useState({ value: '', error: '' })
  const [feld2, setFeld2] = useState({ value: '', error: '' })

  const [value, setValue] = useState(null)
  const [selectedItem, setSelectedItem] = useState([
    { label: 'Student', value: 'Student' },
    { label: 'Berufstätig', value: 'berufstaetig' },
    { label: 'Mitglied in einem Verein', value: 'Vereinsmitglied' }
  ])

  /**
   * @method onContinuePressed
   * @memberof ProfileCreationPartnerScreens.OccupationScreen
   * @async
   * @description Async Methode welches die eingegebenen Werte aus der UI speichert, via
   * PUT-Request in der Datenbank speichert und zum nächsten Screen in der Proifilerstellung weiterleitet
   */

  const onContinuePressed = async () => {
    var valueToken = await AsyncStorage.getItem('token')
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10)
    console.log(valueToken)
    console.log(`Bearer ${valueToken}`)

    navigation.navigate('QualificationScreen')

    fetch('http://' + IP + ':8080/api/v1/profil/partner/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${valueToken}`
      },
      body: JSON.stringify({
        organisation: feld1.value,
        taetigkeit: feld2.value
      })
    })
      .then(response => response)
      .then(data => {
        navigation.navigate('QualificationScreen')
        return
      })
      .catch(error => console.error('Fehler:', error))
  }

  const DisplayInputs = text => {
    console.log(text)
    switch (text) {
      case 'Student':
        return (
          <View style={styles.container}>
            <TextInput
              label='Name der Uni/Hochschule'
              returnKeyType='next'
              onChangeText={text => setFeld1({ value: text, error: '' })}
              value={feld1.value}
              autoCapitalize='none'
              autoCompleteType='off'
              textContentType='none'
              keyboardType='default'
            />
            <TextInput
              label='Studiengang'
              onChangeText={text => setFeld2({ value: text, error: '' })}
              value={feld2.value}
              returnKeyType='done'
              autoCompleteType='off'
              textContentType='none'
              keyboardType='default'
            />
          </View>
        )
      case 'berufstaetig':
        return (
          <View style={styles.container}>
            <TextInput
              label='Name des Unternehmen'
              returnKeyType='next'
              onChangeText={text => setFeld1({ value: text, error: '' })}
              value={feld1.value}
              autoCapitalize='none'
              autoCompleteType='Name des Unternehmen'
              textContentType='Name des Unternehmen'
              keyboardType='Name des Unternehmen'
            />
            <TextInput
              label='Berufsbezeichnung'
              onChangeText={text => setFeld2({ value: text, error: '' })}
              value={feld2.value}
              returnKeyType='done'
              autoCompleteType='off'
              textContentType='none'
              keyboardType='default'
            />
          </View>
        )
      case 'Vereinsmitglied':
        return (
          <View style={styles.container}>
            <TextInput
              label='Name des Vereins'
              returnKeyType='next'
              onChangeText={text => setFeld1({ value: text, error: '' })}
              value={feld1.value}
              autoCapitalize='none'
              autoCompleteType='off'
              textContentType='none'
              keyboardType='default'
            />
            <TextInput
              label='Tätigkeitsbereich/Zweck des Vereins'
              onChangeText={text => setFeld2({ value: text, error: '' })}
              value={feld2.value}
              returnKeyType='done'
              autoCompleteType='off'
              textContentType='none'
              keyboardType='default'
            />
          </View>
        )
      default:
        return undefined
    }
  }

  //TO-DO: HEADER und VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Header items='Profil erstellen' icon='logout'></Header>
      <Paragraph>Schritt: 6/10</Paragraph>
      <Paragraphtitel>IN WELCHEM BEREICH SIND SIE TÄTIG?</Paragraphtitel>
      <View>
        <DropDown
          items={selectedItem}
          val={value}
          setVal={setValue}
          placeh={'Tätigkeit'}
          setItems={setSelectedItem}
        />
      </View>
      {DisplayInputs(value)}
      <Button mode='contained' onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
      <Button
        mode='outlined'
        onPress={() => navigation.navigate('QualificationScreen')}
      >
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: -5
  }
})
