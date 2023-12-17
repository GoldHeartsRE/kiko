import React from 'react'
import BackButton from '../../components/LoginComponents/BackButton'
import Background from '../../components/MainComponents/Background'
import Logo from '../../components/LoginComponents/Logo'
import Button from '../../components/MainComponents/Button'
import Paragraph from '../../components/LoginComponents/Paragraph'

  /**
   * @memberof LoginScreens
   * @class RegisterRoleScreen
   */

  /**
   * @method RegisterRoleScreen
   * @memberof LoginScreens.RegisterRoleScreen
   * @description Besteht hauptsächlich aus einer HTML-Komponente, welche den Benutzer je nach Auswahl zurch richtigen Registrierung führt
   */
  
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