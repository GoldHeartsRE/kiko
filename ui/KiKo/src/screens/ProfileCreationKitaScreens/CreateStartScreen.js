//Start Profilerstellen, vor Schritt 1
import React from 'react'
import Background from '../../components/MainComponents/Background'
import Logo from '../../components/KitaCreationComponents/Logo'
import Button from '../../components/MainComponents/Button'
import Paragraph from '../../components/KitaCreationComponents/Paragraph'

export default function CreateStartScreen({ navigation }) {
  return (
    <Background>
      <Paragraph>Wilkommen bei KIKO</Paragraph>
      <Logo></Logo>
      <Paragraph>
        Gemeinsam bringen
        wir Kitas und
        externe
        Partner*innen
        zusammen
      </Paragraph>
      <Paragraph>
        Legen Sie bitte ein 
        Profil an um
        Kiko zu starten
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('NameKitaScreen')}
      >
        Profil erstellen
      </Button>
    </Background>
  )
}