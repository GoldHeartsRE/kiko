import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
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
    const screenWidth = Dimensions.get('window').width * 0.95;

    const onBackPressed = async() => {
        navigation.navigate('ProfileKitaScreen') 
    }

    return (
        <Background>
            <Header items="Neues Angebot" icon="logout" ></Header>
            <BackButton goBack={navigation.goBack} />
            <View style={{ flex: 1, top: 100, width: screenWidth }}>
                {/* Kurstitel */}
                <View style={{ flex: 1, alignItems:'stretch',flexDirection: 'row'}}>
                    <View style={{ flex: 1, alignItems: 'center',justifyContent: 'space-around'}}>
                        <Text variant='labelLarge'>Kurstitel</Text>
                    </View>

                    <View style={{ flex: 4,alignItems: 'center',justifyContent: 'space-around'}}>
                        <TextInput
                        label="Kurstitel"
                        returnKeyType="next"
                        autoCapitalize="none"
                        //   onChangeText={(text) => setNameKita({value: text})}
                        //   error={!!name_kita.error}
                        //   errorText={name_kita.error}
                        //   value={name_kita.value}
                        autoCompleteType="kurstitel"
                        textContentType="kurstitel"
                        keyboardType="kurstitel"
                        />  
                    </View>
                </View>
                {/* Kursbeschreibung */}
                <View style={{ flex: 1, alignItems:'stretch',flexDirection: 'row'}}>

                </View>
                {/* Altersgruppe */}
                <View style={{ flex: 1, alignItems:'stretch',flexDirection: 'row'}}>

                </View>
                {/* Anzahl Kinder */}
                <View style={{ flex: 1, alignItems:'stretch',flexDirection: 'row'}}>

                </View>
                {/* Dauer */}
                <View style={{ flex: 1, alignItems:'stretch',flexDirection: 'row'}}>

                </View>
                {/* Wochentage */}
                <View style={{ flex: 1, alignItems:'stretch',flexDirection: 'row'}}>

                </View>
                {/* Regelmäßigkeit */}
                <View style={{ flex: 1, alignItems:'stretch',flexDirection: 'row'}}>

                </View>
                {/* Kosten  */}
                <View style={{ flex: 1, alignItems:'stretch',flexDirection: 'row'}}>

                </View>
                {/* Bildungs- und Entwicklungsfelder */}
                <View style={{ flex: 1, alignItems:'stretch',flexDirection: 'row'}}>

                </View>
            </View>
            <Button mode="contained" onPress={''}>
              Angebot erstellen
            </Button>
        </Background>
    )
} 