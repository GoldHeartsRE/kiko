import React, { useState, useEffect } from 'react';
import { View, Dimensions, ScrollView, StyleSheet, Modal  } from 'react-native'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import TextInput from '../../components/KitaCreationComponents/TextInput'
import Header from '../../components/MainComponents/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { wortValidator } from '../../validator/nameValidator'
import { zifferValidator } from '../../validator/zahlValidator'
import { checkSelectValidatorAngebot } from '../../validator/segmentedButtonsValidator'
import BackButton from '../../components/MainComponents/BackButton'
import { Text, SegmentedButtons, HelperText } from 'react-native-paper';
import BigTextInput from '../../components/PartnerCreationComponents/BigTextInput'
import { ContactPageSharp } from '@mui/icons-material';
import { IP } from '../../constants/constants'

export default  function CreateAngebot({ navigation }) {
    const screenWidth = Dimensions.get('window').width * 0.95
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [errorSeg, setErrorSeg] = useState([''])

    const [titel, setTitel] = useState({ value: '', error: '' })
    const [beschreibung, setBeschreibung] = useState({ value: '', error: '' })
    const [alterVon, setAlterVon] = useState({ value: '', error: '' })
    const [alterBis, setAlterBis] = useState({ value: '', error: '' })
    const [kinderVon, setKinderVon] = useState({ value: '', error: '' })
    const [kinderBis, setKinderBis] = useState({ value: '', error: '' })
    const [kosten, setKosten] = useState({ value: '', error: '' })
    const [dauer, setDauer] = useState('');
    const [wochentag, setWochentag] = useState('');
    const [regel, setRegel] = useState('');   
    const [felder, setFelder] = useState('');

    useEffect(() => {
        const missingOptions = [];
        if(dauer.length === 0){
            missingOptions.push('- Maximale Dauer');
        }
        if(wochentag.length === 0){
            missingOptions.push('- Wochentag');
        }
        if(regel.length === 0){
            missingOptions.push('- Regelmäßigkeit');
        }
        setErrorSeg(missingOptions);
        console.log('errorSeg verzögert:', errorSeg);
      },[dauer,wochentag,regel])    

    const onCreate = async() => {
        //Validierung Textinput
        const titelError = wortValidator(titel.value, 'Kurstitel')
        const beschreibungError = wortValidator(beschreibung.value, 'Beschreibung')
        const alterVonError = zifferValidator(alterVon.value)
        const alterBisError = zifferValidator(alterBis.value)
        const kinderVonError = zifferValidator(kinderVon.value)
        const kinderBisError = zifferValidator(kinderBis.value)
        const kostenError = zifferValidator(kosten.value)

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

        //Validierung sekmentierte Buttons
        if (errorSeg.length > 0){
            setIsModalVisible(true)
            return
        }

        navigation.navigate('UebersichtAngeboteScreen')

        var valueToken = await AsyncStorage.getItem('token')
        var valueId = await AsyncStorage.getItem('id')  
        console.log(valueToken);
        console.log(`Bearer ${valueToken}`);
    
        fetch('http://'+ IP +':8080/api/v1/angebot/create/'+ valueId, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${valueToken}`,
          },
          body: JSON.stringify({
            kurstitel: titel.value,
            kursbeschreibung: beschreibung.value,
            altersgruppe_min: alterVon.value,
            altersgruppe_max: alterBis.value,
            anzahlKinder_min: kinderVon.value,
            anzahlKinder_max: kinderBis.value,
            dauer: dauer,
            wochentag: wochentag,
            regelmaessigkeit: regel,
            kosten: kosten.value,
            bildungsUndEntwicklungsfelder: felder
        }),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          navigation.navigate('UebersichtAngeboteScreen') 
          return
        })
        .catch(error => console.error('Fehler:', error));
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
                        autoCompleteType="off"
                        textContentType="none"
                        keyboardType="default"
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
                        autoCompleteType="off"
                        textContentType="none"
                        keyboardType="default"
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
                            autoCompleteType="off"
                            textContentType="none"
                            keyboardType="numeric"
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
                        autoCompleteType="off"
                        textContentType="none"
                        keyboardType="numeric"
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
                            autoCompleteType="off"
                            textContentType="none"
                            keyboardType="numeric"
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
                        autoCompleteType="off"
                        textContentType="none"
                        keyboardType="numeric"
                        />  
                    </View>
                </View>
                {/* Dauer */}
                <View style={{ flex: 1, alignItems:'center'}}>
                    <View style={{ flex: 1, alignItems:'center'}}>
                        <Text variant='labelLarge'>Maximale Dauer</Text>
                    </View>
                    <SegmentedButtons
                        value={dauer}
                        onValueChange={(value) => setDauer(value)}
                        style={{backgroundColor: 'white', width: screenWidth }}
                        buttons={[
                        { value: 30, label: '30'},
                        { value: 45, label: '45'},
                        { value: 60, label: '60' },
                        { value: 90, label: '90' },
                        ]}
                    />
                </View>
                {/* Wochentage */}
                <View style={{ flex: 1, alignItems:'center'}}>
                    <View style={{ flex: 1, alignItems:'center'}}>
                        <Text variant='labelLarge'>Wochentag</Text>
                    </View>
                    <SegmentedButtons
                            multiSelect
                            value={wochentag}
                            onValueChange={(value) => setWochentag(value)}
                            style={{backgroundColor: 'white'}}
                            buttons={[
                            { value: 'Montag', label: 'Montag'},
                            { value: 'Dienstag', label: 'Dienstag'},
                            { value: 'Mittwoch', label: 'Mittwoch' },
                            ]}
                        /> 
                        <SegmentedButtons
                            multiSelect
                            value={wochentag}
                            onValueChange={(value) => setWochentag(value)}
                            style={{backgroundColor: 'white'}}
                            buttons={[
                            { value: 'Donnerstag', label: 'Donnerstag' },
                            { value: 'Freitag', label: 'Freitag' },
                            ]}
                        /> 
                </View>
                {/* Regelmäßigkeit */}
                <View style={{ flex: 1, alignItems:'center'}}>
                    <View style={{ flex: 1, alignItems:'center'}}>
                        <Text variant='labelLarge'>Regelmäßigkeit</Text>
                    </View>
                    <SegmentedButtons
                        value={regel}
                        onValueChange={(value) => setRegel(value)}
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
                            autoCompleteType="off"
                            textContentType="none"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                {/* Bildungs- und Entwicklungsfelder */}
                <View style={{ flex: 1, alignItems:'stretch'}}>
                    <View style={{ flex: 1, alignItems:'center'}}>
                        <Text variant='labelLarge'>Bildungs- und Entwicklungsfelder</Text>
                    </View>
                        <SegmentedButtons
                            multiSelect
                            value={felder}
                            onValueChange={(value) => setFelder(value)}
                            style={{backgroundColor: 'white'}}
                            buttons={[
                            { value: 'Koerper', label: 'Körper'},
                            { value: 'Sinne', label: 'Sinne'},
                            { value: 'Sprache', label: 'Sprache' },
                            { value: 'Denken', label: 'Denken' },
                            ]}
                        /> 
                        <SegmentedButtons
                            multiSelect
                            value={felder}
                            onValueChange={(value) => setFelder(value)}
                            style={{backgroundColor: 'white'}}
                            buttons={[
                            { value: 'Gefuehl_und_Mitgefuehl', label: 'Gefühle und Mitgefühl'},
                            { value: ' Sinn_Werte_und_Religion', label: 'Sinne, Werte und Religion'},
                            ]}
                        /> 
                </View>
                <Button mode="contained" onPress={onCreate}>
                 Angebot erstellen
                </Button>
                
                {/* PopUp um Validierung der Segmented Buttons zu zeigen */}
                <Modal visible={isModalVisible} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                        <Text>Sie müssen noch folgenden Optionen auswählen:</Text>
                        {errorSeg.map(option => (
                            <Text key={option}>{option}</Text>
                        ))}
                        <Button mode="contained" onPress={() => setIsModalVisible(false)}>
                            Ok
                        </Button>
                        </View>
                    </View>
                </Modal>
            
            </ScrollView>
        </View>
    </Background>
    )
} 

const styles = StyleSheet.create({
    scrollViewContent: {
      flexDirection: 'column',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
      },
  });
