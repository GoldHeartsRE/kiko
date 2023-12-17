import React, { useState } from 'react';
import Background from '../../components/MainComponents/Background'
import Header from '../../components/MainComponents/Header'
import Paragraph from '../../components/KitaMarktplaceComponents/Paragraph'
import ParagraphTitel from '../../components/KitaMarktplaceComponents/ParagraphTitel'
import Description from '../../components/KitaMarktplaceComponents/Description'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { Text, Card } from 'react-native-paper'
import BackButton from '../../components/MainComponents/BackButton'

  /**
   * @memberof MarktplatzKitaScreens
   * @class ShowAngeboteScreen
   * @description Genaueres Inspinzieren eines Angebots
   */

export default  function ShowAngeboteScreen({ navigation }) {
    const screenWidth = Dimensions.get('window').width * 0.95;

    const [kurstitel, setKurstitel] = useState(null) 
    const [altersgruppe_min, setAlterMin] = useState(null)
    const [altersgruppe_max, setAlterMax] = useState(null)
    const [anzahlKinder_min, setKinderMin] = useState(null)
    const [anzahlKinder_max, setKinderMax] = useState(null)
    const [wochentag, setWochentag] = useState(null)
    const [dauer, setDauer] = useState(null)
    const [kosten, setKosten] = useState(null)

  /**
   * @method fetchData
   * @memberof MarktplatzKitaScreens.ShowAngeboteScreen
   * @async
   * @description Async Methode welche die Werte des Angebots abspeichert um sie dann anzuzeigen
   */
    useFocusEffect(() => {
        const fetchData = async () => {
          try {
            const kurstitel = await AsyncStorage.getItem('kurstitel');
            const altersgruppe_min = await AsyncStorage.getItem('altersgruppe_min');
            const altersgruppe_max = await AsyncStorage.getItem('altersgruppe_max');
            const anzahlKinder_min = await AsyncStorage.getItem('anzahlKinder_min');
            const anzahlKinder_max = await AsyncStorage.getItem('anzahlKinder_max');
            const wochentag = await AsyncStorage.getItem('wochentag');
            const dauer = await AsyncStorage.getItem('dauer');
            const kosten = await AsyncStorage.getItem('kosten');
            setNameKita(kurstitel);
            setEmailKita(altersgruppe_min);
            setAnredeKita(altersgruppe_max);
            setVornameKita(anzahlKinder_min);
            setNachnameKita(anzahlKinder_max);
            setStraßeKita(wochentag);
            setOrtKita(dauer);
            setplzKita(kosten);
          } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
          }
        };
        fetchData();
      })

    return (
        <Background>
            <Header items="Angebote" icon="logout" ></Header>
            <View style={{ flex: 1, width: screenWidth, zIndex: -100 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}} contentContainerStyle={styles.scrollViewContent}>
                    {/* Abstandhalter für den Header */}
                    <View>
                        <BackButton goBack={navigation.goBack} />
                    </View>
                    <View style={{ marginTop: '10%', marginLeft: '5%'}}>
                        <ProfilePicture></ProfilePicture>    
                    </View>
                    <View >
                        <Text style={styles.profileName}>Lea Meier</Text>
                        <Text style={styles.profile}>Studiert an der HKA</Text>                    
                    </View>
                    <ParagraphTitel>Angebot {kurstitel}:</ParagraphTitel>
                    <Paragraph>Kursbeschreibung:</Paragraph>  
                    <Description>Platzhalter Beschreibung oder so</Description>
                    <Paragraph>Infos:</Paragraph>                  
                    <Card style={styles.cards}>
                    <Card.Content>
                        <Text variant="bodyMedium">Altersgruppe: {altersgruppe_min} - {altersgruppe_max}</Text>
                        <Text variant="bodyMedium">Gruppengröße: {anzahlKinder_min} - {anzahlKinder_max}</Text>
                        <Text variant="bodyMedium">Wochentag: {wochentag}</Text>
                        <Text variant="bodyMedium">Dauer: {wochentag}</Text>
                        <Text variant="bodyMedium">Kosten: {kosten}</Text>
                    </Card.Content>
                    </Card>     
                </ScrollView>
            </View>
        </Background>
    ) 
} 

const styles = StyleSheet.create({
    scrollViewContent: {
        flexDirection: 'column',
    },
    profileName: {
        marginLeft: '30%',
        bottom: 120,
        fontSize: 20,
        lineHeight: 35,
    },
    profile: {
        marginLeft: '30%',
        bottom: 120,
        fontSize: 20,
        lineHeight: 35,
    },
  });
