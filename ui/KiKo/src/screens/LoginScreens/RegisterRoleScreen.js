import React from 'react'
import BackButton from '../../components/LoginComponents/BackButton'
import Background from '../../components/LoginComponents/Background'
import Logo from '../../components/LoginComponents/Logo'
import Button from '../../components/LoginComponents/Button'
import Paragraph from '../../components/LoginComponents/Paragraph'

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