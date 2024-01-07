import AsyncStorage from '@react-native-async-storage/async-storage'
import * as DocumentPicker from 'expo-document-picker'
import React, { useCallback, useState } from 'react'
import { Paragraph } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import DocumentPickerSingle from '../../components/MainComponents/DocumentPickerSingle'
import Header from '../../components/MainComponents/Header'
import { IP } from '../../constants/constants'

/**
 * @memberof ProfileCreationKitaScreens
 * @class VerificationKitaScreen
 * @description Zuständig bei der Profilerstellung für das Hochladen der Verifikationsdateien der Kita
 */

export default function VerificationKitaScreen ({ navigation }) {
  //Getter und Setter für Extensions und Komponenten
  const [fileResponse, setFileResponse] = useState([])

  //Getter und Setter für Requests
  const [name, setName] = useState({ value: '', error: '' })

  /**
   * @method onContinuePressed
   * @memberof ProfileCreationKitaScreens.VerificationKitaScreen
   * @async
   * @description Async Methode welches das gespeichterte Dokument aus "handleDocumentSelection"
   * in die Datenbank mittels Formdata hochlädt
   */

  const onContinuePressed = async () => {
    var valueToken = await AsyncStorage.getItem('token')
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10)
    console.log(valueToken)
    console.log(`Bearer ${valueToken}`)

    navigation.navigate('KitaProfilEndScreen')

    const formData = new FormData()
    formData.append('file', fileResponse.value)

    fetch('http://' + IP + ':8080/api/v1/profil/qualifikation/' + valueId, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${valueToken}`
      },
      body: formData
    })
      .then(response => response)
      .then(data => {
        navigation.navigate('KitaProfilEndScreen')
        return
      })
      .catch(error => console.error('Fehler:', error))
  }

  /**
   * @method handleDocumentSelection
   * @memberof ProfileCreationKitaScreens.VerificationKitaScreen
   * @async
   * @description Async Methode welches ermöglicht, durch Buttonclick in seinen eigenen
   * Dokumenten eine Datei auszuwählen.
   */

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false
      })
      name.value = response.assets[0].name
      fileResponse.value = response.output[0]
      console.log(fileResponse.value)
      // setFileResponse();
    } catch (err) {
      console.warn(err)
    }
  }, [])

  return (
    <Background>
      <Header items='Profil erstellen' icon='logout'></Header>
      <Paragraph>Schritt: 4/4</Paragraph>
      <Paragraphtitel>
        LADEN SIE BITTE DIE ERFORDERLICHE DOKUMENTE HOCH.
      </Paragraphtitel>
      <DocumentPickerSingle mode='contained' onPress={handleDocumentSelection}>
        Hochladen
      </DocumentPickerSingle>
      <Button mode='contained' onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
      <Button
        mode='outlined'
        onPress={() => navigation.navigate('KitaProfilEndScreen')}
      >
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}
