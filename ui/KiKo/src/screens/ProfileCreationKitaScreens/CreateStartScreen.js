//Start Profilerstellen, vor Schritt 1
import React from 'react'
import Background from '../../components/KitaCreationComponents/Background'
import Logo from '../../components/KitaCreationComponents/Logo'
import Button from '../../components/KitaCreationComponents/Button'
import Paragraph from '../../components/KitaCreationComponents/Paragraph'

export default function CreateStartScreen({ navigation }) {
  return (
    <Background>
      <Paragraph>Wilkommen bei KIKO</Paragraph>
      <Logo></Logo>
      <Paragraph>
        Gemeinsam Bringen
        Wir Kitas und
        Externe
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