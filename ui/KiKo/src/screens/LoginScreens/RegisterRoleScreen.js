import React from 'react'
import BackButton from '../../components/BackButton'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'

export default function RegisterRoleScreen({ navigation }) {
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Paragraph>
        FÜR WELCHE ROLLE MÖCHTEN SIE SICH REGISTRIEREN?
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('RegisterPartnerScreen')}
      >
        PARTNER*IN
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('RegisterKitaScreen')}
      >
        KITA-LEITUNG
      </Button>
    </Background>
  )
}