import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as DocumentPicker from 'expo-document-picker'
import React, { useCallback, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import { IP } from '../../constants/constants'

/**
 * @memberof ProfileCreationPartnerScreens
 * @class ProfilePictureScreen
 * @description Zuständig bei der Profilerstellung für das Hochladen des Profilbilds des Partners
 */

export default function ProfilePictureScreen ({ navigation }) {
  //Getter und Setter für Extensions und Komponenten
  const [image, setImage] = useState({ value: '', error: '' })
  
  //Getter und Setter für Requests
  const [picture, setPicture] = useState([])

  /**
   * @method handleDocumentSelection
   * @memberof ProfileCreationPartnerScreens.ProfilePictureScreen
   * @async
   * @description Async Methode welches das gespeichterte Dokument aus "onSelectedPicture"
   * in die Datenbank mittels Formdata und DocumentPicker hochlädt
   */

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false
      })
      console.log(response)
      setImage(response.assets[0].uri)
      picture.value = response.output[0]
      console.log(picture.value)
      // setFileResponse();
    } catch (err) {
      console.warn(err)
    }
  }, [])

  /**
   * @method onSelectedPicture
   * @memberof ProfileCreationPartnerScreens.ProfilePictureScreen
   * @async
   * @description Async Methode welches ermöglicht, durch Buttonclick in seinen eigenen
   * Dokumenten ein Foto auszuwählen.
   */

  const onSelectedPicture = async () => {
    var valueToken = await AsyncStorage.getItem('token')
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10)

    const formData = new FormData()
    formData.append('file', picture.value)

    navigation.navigate('DescriptionScreen')

    fetch('http://' + IP + ':8080/api/v1/profil/profilbild/' + valueId, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${valueToken}`
      },
      body: formData
    })
      .then(response => response)
      .then(data => {
        console.log(data)
        navigation.navigate('DescriptionScreen')
        return
      })
      .catch(error => console.error('Fehler:', error))
  }

  return (
    <Background>
      <Header items='Profil erstellen' icon='logout'></Header>
      <Paragraph>Schritt: 9/10</Paragraph>
      <Paragraphtitel>FÜGEN SIE EIN BILD VON SICH EIN.</Paragraphtitel>
      <View style={imageUploaderStyles.container}>
        {image && (
          <Image
            source={{ uri: image.value }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <ProfilePicture></ProfilePicture>
        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity
            onPress={handleDocumentSelection}
            style={imageUploaderStyles.uploadBtn}
          >
            <Text>{image ? 'Edit' : 'Upload'} Image</Text>
            <AntDesign name='camera' size={20} color='black' />
          </TouchableOpacity>
        </View>
      </View>
      <Button mode='contained' onPress={onSelectedPicture}>
        NÄCHSTER SCHRITT
      </Button>
      <Button
        mode='outlined'
        onPress={() => navigation.navigate('DescriptionScreen')}
      >
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden'
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '25%'
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
