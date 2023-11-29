import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import ProfilePic from '../../components/PartnerCreationComponents/ProfilePic'
import Header from '../../components/MainComponents/Header'

export default function ProfilePictureScreen({ navigation }) {

    const options = [
        { label: 'Student', value: 'Student' },
        { label: 'Berufstätig', value: 'Berufstätig' },
        { label: 'Mitglied in einem Verein', value: 'Mitglied in einem Verein' },
      ];

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DAA
      //https://www.waldo.com/blog/add-an-image-picker-react-native-app
      //https://github.com/react-native-share/react-native-share/issues/1414
  return (
    <Background>
      <Header items="Profil erstellen" icon="logout" logout={() => navigation.navigate('StartScreen')}></Header>
      <Paragraph>Schritt: 9/10</Paragraph>
      <Paragraphtitel>FÜGEN SIE EIN BILD VON SICH EIN.</Paragraphtitel>
      <ProfilePic/>
      <Button mode="contained" onPress={() => navigation.navigate('DescriptionScreen')}>
        NÄCHSTER SCHRITT
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('DescriptionScreen')}>
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}