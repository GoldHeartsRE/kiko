import React from 'react'
import Background from '../../components/LoginComponents/Background'
import Logo from '../../components/LoginComponents/Logo'
import Header from '../../components/LoginComponents/Header'
import Paragraph from '../../components/LoginComponents/Paragraph'
import Button from '../../components/LoginComponents/Button'
import Appbar from '../../components/Appbar'

export default function Dashboard({ navigation }) {
  return (
    // <Background>
    //   <Logo />
    //   <Paragraph>
    //     Profilbeginn oder so
    //   </Paragraph>
    //   <Button
    //     mode="outlined"
    //     onPress={() =>
    //       navigation.reset({
    //         index: 0,
    //         routes: [{ name: 'StartScreen' }],
    //       })
    //     }
    //   >
    //     Logout
    //   </Button>
    // </Background>
    <Appbar></Appbar>
  )
}