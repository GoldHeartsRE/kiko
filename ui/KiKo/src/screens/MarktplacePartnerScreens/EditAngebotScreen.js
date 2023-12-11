import React, { useState, useEffect } from 'react';
import { View, Dimensions, ScrollView, StyleSheet  } from 'react-native'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import TextInput from '../../components/KitaCreationComponents/TextInput'
import Header from '../../components/MainComponents/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDown from '../../components/MainComponents/DropDown'
import { wortValidator } from '../../validator/nameValidator'
import { zahlValidator } from '../../validator/zahlValidator'
import BackButton from '../../components/MainComponents/BackButton'
import { Text, SegmentedButtons  } from 'react-native-paper';
import BigTextInput from '../../components/PartnerCreationComponents/BigTextInput'

export default  function EditAngebot({ navigation }) {
    const screenWidth = Dimensions.get('window').width * 0.95;

    const [titel, setTitel] = useState({ value: '', error: '' })
    const [beschreibung, setBeschreibung] = useState({ value: '', error: '' })
    const [alterVon, setAlterVon] = useState({ value: '', error: '' })
    const [alterBis, setAlterBis] = useState({ value: '', error: '' })
    const [kinderVon, setKinderVon] = useState({ value: '', error: '' })
    const [kinderBis, setKinderBis] = useState({ value: '', error: '' })
    const [kosten, setKosten] = useState({ value: '', error: '' })
    // Segmented Buttons und überlegen wie validieren

    const onCreate = async() => {
        const titelError = wortValidator(titel.value, 'Kurstitel')
        const beschreibungError = wortValidator(beschreibung.value, 'Beschreibung')
        const alterVonError = zahlValidator(alterVon.value, 'Alter')
        const alterBisError = zahlValidator(alterBis.value, 'Alter')
        const kinderVonError = zahlValidator(kinderVon.value, 'Kinderanzahl')
        const kinderBisError = zahlValidator(kinderBis.value, 'Kinderanzahl')
        const kostenError = zahlValidator(kosten.value, 'Kosten')

        if (beschreibungError || titelError || alterVonError || alterBisError ||
            kinderVonError || kinderBisError || kostenError) {
            setBeschreibung({ ...beschreibung, error: beschreibungError })
            setTitel({ ...titel, error: titelError })
            setAlterVon({ ...alterVon, error: alterVonError })
            setAlterBis({ ...alterBis, error: alterBisError })
            setKinderVon({ ...kinderVon, error: kinderVonError })
            setKinderBis({ ...kinderBis, error: kinderBisError })
            setKosten({ ...kosten, error: kostenError })
            return
        }
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
                        onChangeText={(text) => setTitel({value: text})}
                        error={!!titel.error}
                        errorText={titel.error}
                        value={titel.value}
                        autoCompleteType="kurstitel"
                        textContentType="kurstitel"
                        keyboardType="kurstitel"
                        />  
                </View>
                {/* Kursbeschreibung */}
                <View style={{ flex: 1, alignItems:'center'}}>
                    <BigTextInput
                        label="Kursbeschreibung"
                        returnKeyType="next"
                        onChangeText={(text) => setBeschreibung({ value: text, error: '' })}
                        error={!!beschreibung.error}
                        errorText={beschreibung.error}
                        value={beschreibung.value}
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
                            onChangeText={(text) => setAlterVon({value: text})}
                            error={!!alterVon.error}
                            errorText={alterVon.error}
                            value={alterVon.value}
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
                        onChangeText={(text) => setAlterBis({value: text})}
                        error={!!alterBis.error}
                        errorText={alterBis.error}
                        value={alterBis.value}
                        autoCompleteType="bis"
                        textContentType="bis"
                        keyboardType="bis"
                        />  
                    </View>
                </View>
                {/* Anzahl Kinder */}
                <View style={{ flex: 1, alignItems:'center',flexDirection: 'row'}}>
                <View style={{ flex: 0.5, alignItems:'center'}}>
                        <Text variant='labelLarge'>Anzahl Kinder</Text>
                    </View>
                    <View style={{ flex: 0, alignItems:'center'}}>
                        <TextInput
                            label="Von"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(text) => setKinderVon({value: text})}
                            error={!!kinderVon.error}
                            errorText={kinderVon.error}
                            value={kinderVon.value}
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
                        onChangeText={(text) => setKinderBis({value: text})}
                        error={!!kinderBis.error}
                        errorText={kinderBis.error}
                        value={kinderBis.value}
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
                    <View style={{ flex: 1, alignItems:'center'}}>
                        <Text variant='labelLarge'>Wochentag</Text>
                    </View>
                    <SegmentedButtons
                        // value={value}
                        // onValueChange={setValue}
                        style={{backgroundColor: 'white'}}
                        buttons={[
                        { value: 'mo', label: 'Mo'},
                        { value: 'di', label: 'Di'},
                        { value: 'mi', label: 'Mi' },
                        { value: 'do', label: 'Do' },
                        { value: 'fr', label: 'Fr' },
                        ]}
                    /> 
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
                <View style={{ flex: 1, alignItems:'center'}}>
                    <View style={{ flex: 1, alignItems:'center'}}>
                        <TextInput
                            label="Kosten"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(text) => setKosten({value: text})}
                            error={!!kosten.error}
                            errorText={kosten.error}
                            value={kosten.value}
                            autoCompleteType="kosten"
                            textContentType="kosten"
                            keyboardType="kosten"
                        />
                    </View>
                    {/* <View style={{ flex: 1, alignItems:'center'}}>
                    <SegmentedButtons
                        // value={value}
                        // onValueChange={setValue}
                        style={{backgroundColor: 'white'}}
                        buttons={[
                        { value: 'auf Anfrage', label: 'auf Anfrage'},
                        ]}
                    />  
                    </View> */}
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
                <Button mode="contained" onPress={onCreate}>
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
