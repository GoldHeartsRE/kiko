import React from 'react'
import { Dimensions, View } from 'react-native'
import { Paragraph } from 'react-native-paper'
import Header from '../../components/AdminComponents/HeaderAdmin'
import Background from '../../components/MainComponents/Background'

export default function AdminPanelScreen ({ navigation }) {
  const screenWidth = Dimensions.get('window').width

  //   const onEditPressed = async() => {
  //     navigation.navigate('ProfileKitaEditScreen')
  //   }

  return (
    <Background>
      <Header items='AdminPanel' icon='logout'></Header>
      <View style={{ flex: 3, marginTop: 70 }}>
        <Paragraph>Willkommen im AdminPanel!</Paragraph>
      </View>
    </Background>
  )
}
