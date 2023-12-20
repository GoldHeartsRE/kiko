import React, { useState, useEffect } from 'react';
import Background from '../../components/MainComponents/Background'
import Header from '../../components/MainComponents/Header'
import Paragraph from '../../components/KitaMarktplaceComponents/Paragraph'
import ParagraphTitel from '../../components/KitaMarktplaceComponents/ParagraphTitel'
import Description from '../../components/KitaMarktplaceComponents/Description'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { Text, Card } from 'react-native-paper'
import BackButton from '../../components/MainComponents/BackButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IP } from '../../constants/constants'

  /**
   * @memberof MarktplatzKitaScreens
   * @class ShowAngeboteScreen
   * @description Genaueres Inspinzieren eines Angebots
   */

export default  function ShowAngeboteScreen({ navigation }) {
    const screenWidth = Dimensions.get('window').width * 0.95;

    const [angebote, setAngebote] = useState([]);

  /**
   * @method fetchData
   * @memberof MarktplatzKitaScreens.ShowAngeboteScreen
   * @async
   * @description Async Methode welche die Werte des Angebots abspeichert um sie dann anzuzeigen
   */
  useEffect(() => {
    const fetchData = async () => {
      var valueToken = await AsyncStorage.getItem('token') 
      var angebotId = await AsyncStorage.getItem('angebotId') 
  
      fetch('http://'+ IP +':8080/api/v1/angebot/' + angebotId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${valueToken}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAngebote(data);
      })
      .catch(error => console.error('Fehler:', error));
      }
    // Temporäre Lösung, da der Post länger dauert als das Get und dadurch nicht alles gezogen wird
    setTimeout(() => {
      fetchData();
    }, 1);
  }, []);

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
                    <ParagraphTitel>Angebot: {angebote.kurstitel}</ParagraphTitel>
                    <Paragraph>Kursbeschreibung:</Paragraph>  
                    <Description>{angebote.kursbeschreibung}</Description>
                    <Paragraph>Infos:</Paragraph>                  
                    <Card style={styles.cards}>
                    <Card.Content>
                        <Text variant="bodyMedium">Altersgruppe: {angebote.altersgruppe_min} - {angebote.altersgruppe_max} Jahre</Text>
                        <Text variant="bodyMedium">Gruppengröße: {angebote.anzahlKinder_min} - {angebote.anzahlKinder_max} Kinder</Text>
                        <Text variant="bodyMedium">Wochentag: {angebote.wochentag}s</Text>
                        <Text variant="bodyMedium">Regelmäßigkeit: {angebote.regelmaessigkeit}</Text>
                        <Text variant="bodyMedium">Dauer: {angebote.dauer} Minuten</Text>
                        <Text variant="bodyMedium">Kosten: {angebote.kosten}€</Text>
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
