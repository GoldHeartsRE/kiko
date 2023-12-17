import React, { useState } from 'react';
import { View, Dimensions } from 'react-native'
import { Paragraph, Text, Card } from 'react-native-paper'
import Background from '../../components/MainComponents/Background'
import Header from '../../components/AdminComponents/HeaderAdmin'

export default function AdminPanelScreen({ navigation }) {
  const screenWidth = Dimensions.get('window').width;

//   const onEditPressed = async() => {
//     navigation.navigate('ProfileKitaEditScreen') 
//   }

  return (
    <Background>
      <Header items="AdminPanel" icon="logout" ></Header>
          <View style={{ flex: 3, marginTop: 70}}>
            <Paragraph>Willkommen im AdminPanel!</Paragraph>
          </View>
    </Background>
  )
} 