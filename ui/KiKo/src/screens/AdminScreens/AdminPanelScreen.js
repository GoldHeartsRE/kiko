import React from 'react'
import { Dimensions, View } from 'react-native'
import { Paragraph } from 'react-native-paper'
import Header from '../../components/AdminComponents/HeaderAdmin'
import Background from '../../components/MainComponents/Background'

/**
 * @memberof AdminScreens
 * @class AdminPanelScreen
 * @description Der erste Bildschirm im AdminPanelScreen, ist nur eime Willkommensnachricht
 */

export default function AdminPanelScreen ({ navigation }) {
  const screenWidth = Dimensions.get('window').width

  return (
    <Background>
      <Header items='AdminPanel' icon='logout'></Header>
      <View style={{ flex: 3, marginTop: 70 }}>
        <Paragraph>Willkommen im AdminPanel!</Paragraph>
      </View>
    </Background>
  )
}
