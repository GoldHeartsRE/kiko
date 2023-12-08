import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/ProfileButton'
import TextInput from '../../components/KitaCreationComponents/TextInput'
import Header from '../../components/MainComponents/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { plzValidator, ortValidator, straßeValidator, nummerValidator } from '../../validator/adressValidator'
import { kitaNameValidator, vornameValidator, nachnameValidator } from '../../validator/nameValidator'
import { emailValidator } from '../../validator/emailValidator'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'
import DropDown from '../../components/MainComponents/DropDown'
import BackButton from '../../components/MainComponents/BackButton'
import { Text } from 'react-native-paper';

export default  function ProfileKitaEditScreen({ navigation }) {

  const onBackPressed = async() => {
    navigation.navigate('ProfileKitaScreen') 
  }

  return (
    <Background>
      <Header items="Neues Angebot" icon="logout" ></Header>
      <BackButton goBack={navigation.goBack} />
      <Text variant='labelLarge'>TEST</Text>
    </Background>
  )
} 