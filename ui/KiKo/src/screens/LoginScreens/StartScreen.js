import React from 'react'
import Background from '../../components/LoginComponents/Background'
import Logo from '../../components/LoginComponents/Logo'
import Header from '../../components/LoginComponents/Header'
import Button from '../../components/LoginComponents/Button'
import Paragraph from '../../components/LoginComponents/Paragraph'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Header>KIKO</Header>
      <Logo></Logo>
      <Paragraph>
        Zusammen sind wir mehr!
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Anmelden
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('RegisterRoleScreen')}
      >
        Registrieren
      </Button>
    </Background>
  )
}