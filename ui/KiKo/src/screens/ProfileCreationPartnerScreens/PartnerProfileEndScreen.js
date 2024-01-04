import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Paragraph } from 'react-native-paper'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import { IP } from '../../constants/constants'

/**
 * @memberof ProfileCreationPartnerScreens
 * @class PartnerProfileEndScreen
 * @description Der letzte Screen in der Profilerstellung vor dem Laden ins Profil des Partners
 */

export default function PartnerProfileEndScreen ({ navigation }) {
  /**
   * @method onNextPressed
   * @memberof ProfileCreationPartnerScreens.PartnerProfileEndScreen
   * @async
   * @description Async Methode welche alle Werte vor dem Laden ins Profil nochmal checkt und abholt
   * via eines GET-Requests
   */

  const onNextPressed = async () => {
    var valueToken = await AsyncStorage.getItem('token')
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10)
    console.log(valueToken)
    console.log(`Bearer ${valueToken}`)

    fetch('http://' + IP + ':8080/api/v1/profil/partner/' + valueId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${valueToken}`
      }
    })
      .then(response => response.json()) // Mapping auf JSON
      .then(data => {
        console.log(data)

        AsyncStorage.setItem('email', data.email)
        AsyncStorage.setItem('anrede', data.anrede)
        AsyncStorage.setItem('vorname', data.vorname)
        AsyncStorage.setItem('nachname', data.nachname)
        AsyncStorage.setItem('geschlecht', data.geschlecht)
        AsyncStorage.setItem('geburtsdatum', data.geburtsdatum)
        AsyncStorage.setItem('plz', data.adresse.plz.toString())
        AsyncStorage.setItem('ort', data.adresse.ort)
        AsyncStorage.setItem('strasse', data.adresse.strasse)
        AsyncStorage.setItem('nr', data.adresse.nr)
        AsyncStorage.setItem('telefon', data.telefon)
        AsyncStorage.setItem('taetigkeit', data.taetigkeit)
        AsyncStorage.setItem('organisation', data.organisation)
        AsyncStorage.setItem('beschreibung', data.beschreibung)

        navigation.navigate('DashboardPartnerScreen')
        return
      })
      .catch(error => console.error('Fehler:', error))
  }

  return (
    <Background>
      <Paragraphtitel>GESCHAFFT!</Paragraphtitel>
      <Paragraph>
        Bitte Beachten Sie, dass sie erst nach dem Verifizierungsprozess zugriff
        auf die anderen funktionen von Kiko haben werden. Bis dahin können sie
        gerne ihr Profil weitergestalten.
      </Paragraph>
      <Button mode='contained' onPress={onNextPressed}>
        Weiter
      </Button>
    </Background>
  )
}
