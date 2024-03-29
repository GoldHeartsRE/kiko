import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph } from 'react-native-paper'
import { DatePickerInput } from 'react-native-paper-dates'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import { IP } from '../../constants/constants'
import { theme } from '../../theme/theme'

/**
 * @memberof ProfileCreationPartnerScreens
 * @class Birthdaycreen
 * @description Zuständig bei der Profilerstellung für die Eingabe des Geburtstag des Partners mithilfe eines Datepickers
 */

export default function Birthdaycreen ({ navigation }) {
  //Getter und Setter für Extensions und Komponenten
  const [inputDate, setInputDate] = React.useState(undefined)

  /**
   * @method onContinuePressed
   * @memberof ProfileCreationPartnerScreens.Birthdaycreen
   * @async
   * @description Async Methode welches die eingegebenen Werte aus der UI speichert, via
   * PUT-Request in der Datenbank speichert und zum nächsten Screen in der Proifilerstellung weiterleitet
   */

  const onContinuePressed = async () => {
    console.log(inputDate)

    navigation.navigate('AdressScreen')

    var valueToken = await AsyncStorage.getItem('token')
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10)

    fetch('http://' + IP + ':8080/api/v1/profil/partner/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${valueToken}`
      },
      body: JSON.stringify({
        geburtsdatum: inputDate
      })
    })
      .then(response => response)
      .then(data => {
        navigation.navigate('AdressScreen')
        return
      })
      .catch(error => console.error('Fehler:', error))
  }

  return (
    <Background>
      <Header items='Profil erstellen' icon='logout'></Header>
      <View style={styles.container}>
        <Paragraph style={styles.text1}>Schritt: 3/10</Paragraph>
        <Paragraphtitel style={styles.text2}>
          WANN IST IHR GEBURTSTAG?
        </Paragraphtitel>
        <SafeAreaProvider>
          <View style={styles.container}>
            <DatePickerInput
              style={styles.design}
              label='Geburtsdatum'
              value={inputDate}
              onChange={d => setInputDate(d)}
              inputMode='start'
              locale='de'
            />
          </View>
        </SafeAreaProvider>
        <Button
          mode='contained'
          style={styles.button}
          onPress={onContinuePressed}
        >
          NÄCHSTER SCHRITT
        </Button>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  design: {
    backgroundColor: theme.colors.surface
  },
  container: {
    width: '105%',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  button: {
    marginTop: 50
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
    top: 180
  },
  text1: {
    fontWeight: 'bold',
    textAlign: 'center',
    top: 180
  }
})
