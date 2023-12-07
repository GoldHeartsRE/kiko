
import React, { useState, useEffect } from 'react';
import { View, Dimensions, ScrollView, StyleSheet  } from 'react-native'
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
import { Text, SegmentedButtons  } from 'react-native-paper';
import BigTextInput from '../../components/PartnerCreationComponents/BigTextInput'

export default  function ProfileKitaEditScreen({ navigation }) {
    const screenWidth = Dimensions.get('window').width * 0.95;

    //Dropdowns
    const [open, setOpen] = useState(false);
    const [selectedWochentag, setSelectedWochentag] = useState([        
      { label: 'Montag', value: 'Montag' },
      { label: 'Dienstag', value: 'Dienstag' },
      { label: 'Mittwoch', value: 'Mittwoch' },
      { label: 'Donnerstag', value: 'Donnerstag' },
      { label: 'Freitag', value: 'Freitag' },
    ]);

    const onBackPressed = async() => {
        navigation.navigate('ProfileKitaScreen') 
    }

    return (
        <Background>
            <Header items="Neues Angebot" icon="logout" ></Header>
            <View style={{ flex: 1, width: screenWidth, zIndex: -100 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}} contentContainerStyle={styles.scrollViewContent}>
                    {/* Abstandhalter für den Header */}
                    <View style={{ flex: 1,height: 125}}>
                        <BackButton goBack={navigation.goBack} />
                    </View>
                    {/* Kurstitel */}
                    <View style={{ flex: 1, alignItems:'center'}}>
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
                    {/* Kursbeschreibung */}
                    <View style={{ flex: 1, alignItems:'center'}}>
                        {/* <Text variant='labelLarge'>Kursbeschreibung</Text> */}
                        <BigTextInput
                            label="Kursbeschreibung"
                            returnKeyType="next"
                            // onChangeText={(text) => setBeschreibung({ value: text, error: '' })}
                            // value={beschreibung.value}
                            autoCapitalize="none"
                            autoCompleteType="beschreibung"
                            textContentType="beschreibung"
                            keyboardType="beschreibung"
                        />
                    </View>
                    {/* Altersgruppe */}
                    <View style={{ flex: 1, alignItems:'center',flexDirection: 'row'}}>
                        <View style={{ flex: 0.5, alignItems:'center'}}>
                            <Text variant='labelLarge'>Altersgruppe</Text>
                        </View>
                        <View style={{ flex: 0, alignItems:'center'}}>
                            <TextInput
                                label="Von"
                                returnKeyType="next"
                                autoCapitalize="none"
                                //   onChangeText={(text) => setNameKita({value: text})}
                                //   error={!!name_kita.error}
                                //   errorText={name_kita.error}
                                //   value={name_kita.value}
                                autoCompleteType="von"
                                textContentType="von"
                                keyboardType="von"
                            />
                        </View>
                        <View style={{ flex: 0.4, alignItems:'center'}}>
                            <Text variant='displayMedium'>-</Text>
                        </View>
                        <View style={{ flex: 0, alignItems:'center'}}>
                            <TextInput
                            label="Bis"
                            returnKeyType="next"
                            autoCapitalize="none"
                            //   onChangeText={(text) => setNameKita({value: text})}
                            //   error={!!name_kita.error}
                            //   errorText={name_kita.error}
                            //   value={name_kita.value}
                            autoCompleteType="bis"
                            textContentType="bis"
                            keyboardType="bis"
                            />  
                        </View>
                    </View>
                    {/* Anzahl Kinder */}
                    <View style={{ flex: 1, alignItems:'stretch',flexDirection: 'row'}}>
                    <View style={{ flex: 0.5, alignItems:'center'}}>
                            <Text variant='labelLarge'>Anzahl Kinder</Text>
                        </View>
                        <View style={{ flex: 0, alignItems:'center'}}>
                            <TextInput
                                label="Von"
                                returnKeyType="next"
                                autoCapitalize="none"
                                //   onChangeText={(text) => setNameKita({value: text})}
                                //   error={!!name_kita.error}
                                //   errorText={name_kita.error}
                                //   value={name_kita.value}
                                autoCompleteType="von"
                                textContentType="von"
                                keyboardType="von"
                            />
                        </View>
                        <View style={{ flex: 0.4, alignItems:'center'}}>
                            <Text variant='displayMedium'>-</Text>
                        </View>
                        <View style={{ flex: 0, alignItems:'center'}}>
                            <TextInput
                            label="Bis"
                            returnKeyType="next"
                            autoCapitalize="none"
                            //   onChangeText={(text) => setNameKita({value: text})}
                            //   error={!!name_kita.error}
                            //   errorText={name_kita.error}
                            //   value={name_kita.value}
                            autoCompleteType="bis"
                            textContentType="bis"
                            keyboardType="bis"
                            />  
                        </View>
                    </View>
                    {/* Dauer */}
                    <View style={{ flex: 1, alignItems:'center'}}>
                        <View style={{ flex: 1, alignItems:'center'}}>
                            <Text variant='labelLarge'>Dauer</Text>
                        </View>
                        <SegmentedButtons
                            // value={value}
                            // onValueChange={setValue}
                            style={{backgroundColor: 'white'}}
                            buttons={[
                            { value: '30', label: '30'},
                            { value: '45', label: '45'},
                            { value: '60', label: '60' },
                            { value: '90', label: '90' },
                            ]}
                        />                      
                    </View>
                    {/* Wochentage */}
                    <View style={{ flex: 1, alignItems:'center'}}>
                        <DropDown   items={selectedWochentag} 
                                    placeh={'Wochentag'} 
                                    // val={anrede_kita} 
                                    open={open} 
                                    // setVal={setAnredeKita} 
                                    setItems={setSelectedWochentag} 
                                    setOpen={setOpen} />
                    </View>
                    {/* Regelmäßigkeit */}
                    <View style={{ flex: 1, alignItems:'center'}}>
                        <View style={{ flex: 1, alignItems:'center'}}>
                            <Text variant='labelLarge'>Regelmäßigkeit</Text>
                        </View>
                        <SegmentedButtons
                            // value={value}
                            // onValueChange={setValue}
                            style={{backgroundColor: 'white'}}
                            buttons={[
                            { value: 'einmalig', label: 'Einmalig'},
                            { value: 'woechentlich', label: 'Wöchentlich'},
                            ]}
                        />  
                    </View>
                    {/* Kosten  */}
                    <View style={{ flex: 1, alignItems:'stretch',flexDirection: 'row'}}>
                        <View style={{ flex: 1, alignItems:'center'}}>
                            <TextInput
                                label="Kosten"
                                returnKeyType="next"
                                autoCapitalize="none"
                                //   onChangeText={(text) => setNameKita({value: text})}
                                //   error={!!name_kita.error}
                                //   errorText={name_kita.error}
                                //   value={name_kita.value}
                                autoCompleteType="kosten"
                                textContentType="kosten"
                                keyboardType="kosten"
                            />
                        </View>
                        <View style={{ flex: 1, alignItems:'center'}}>
                        <SegmentedButtons
                            // value={value}
                            // onValueChange={setValue}
                            style={{backgroundColor: 'white'}}
                            buttons={[
                            { value: 'auf Anfrage', label: 'auf Anfrage'},
                            ]}
                        />  
                        </View>
                    </View>
                    {/* Bildungs- und Entwicklungsfelder */}
                    <View style={{ flex: 1, alignItems:'stretch'}}>
                        <View style={{ flex: 1, alignItems:'center'}}>
                            <Text variant='labelLarge'>Bildungs- und Entwicklungsfelder</Text>
                        </View>
                            <SegmentedButtons
                                // value={value}
                                // onValueChange={setValue}
                                style={{backgroundColor: 'white'}}
                                buttons={[
                                { value: 'koerper', label: 'Körper'},
                                { value: 'sinne', label: 'Sinne'},
                                { value: 'sprache', label: 'Sprache' },
                                { value: 'denken', label: 'Denken' },
                                ]}
                            /> 
                            <SegmentedButtons
                                // value={value}
                                // onValueChange={setValue}
                                style={{backgroundColor: 'white'}}
                                buttons={[
                                { value: 'g', label: 'Gefühle und Mitgefühl'},
                                { value: 'swr', label: 'Sinne, Werte und Religion'},
                                ]}
                            /> 
                    </View>
                    <Button mode="contained" onPress={''}>
                     Angebot erstellen
                    </Button>
                </ScrollView>
            </View>
        </Background>
    )
} 

const styles = StyleSheet.create({
    scrollViewContent: {
      flexDirection: 'column',
    },
  });
