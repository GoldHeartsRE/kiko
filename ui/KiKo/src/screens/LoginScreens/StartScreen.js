import React from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'

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