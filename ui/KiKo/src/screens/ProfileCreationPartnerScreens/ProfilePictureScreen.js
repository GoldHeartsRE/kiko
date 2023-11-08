import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import Background from '../../components/PartnerCreationComponents/Background'
import Button from '../../components/PartnerCreationComponents/Button'
import ProfilePic from '../../components/PartnerCreationComponents/ProfilePic'
export default function ProfilePictureScreen({ navigation }) {

    const options = [
        { label: 'Student', value: 'Student' },
        { label: 'Berufstätig', value: 'Berufstätig' },
        { label: 'Mitglied in einem Verein', value: 'Mitglied in einem Verein' },
      ];

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
      //https://www.waldo.com/blog/add-an-image-picker-react-native-app
  return (
    <Background>
      <Paragraph>Schritt: 9/10</Paragraph>
      <Paragraphtitel>FÜGEN SIE EIN BILD VON SICH EIN.</Paragraphtitel>
      <ProfilePic/>
      <Button mode="contained">
        BILD AUSWÄHLEN
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('DescriptionScreen')}>
        NÄCHSTER SCHRITT
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('DescriptionScreen')}>
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}