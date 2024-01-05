import React from 'react'
import Logo from '../../components/KitaCreationComponents/Logo'
import Paragraph from '../../components/KitaCreationComponents/Paragraph'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'

/**
 * @memberof ProfileCreationKitaScreens
 * @class CreateStartScreen
 * @description Die Begrüßung als Start in die Profilerstellung
 */

export default function CreateStartScreen ({ navigation }) {
  return (
    <Background>
      <Paragraph>Wilkommen bei KIKO</Paragraph>
      <Logo></Logo>
      <Paragraph>
        Gemeinsam bringen wir Kitas und externe Partner*innen zusammen
      </Paragraph>
      <Paragraph>Legen Sie bitte ein Profil an um Kiko zu starten</Paragraph>
      <Button
        mode='contained'
        onPress={() => navigation.navigate('NameKitaScreen')}
      >
        Profil erstellen
      </Button>
    </Background>
  )
}
