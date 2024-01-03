import React, { useState, useEffect } from 'react';
import Background from '../../components/MainComponents/Background'
import Header from '../../components/MainComponents/Header'
import Paragraph from '../../components/KitaMarktplaceComponents/Paragraph'
import ParagraphTitel from '../../components/KitaMarktplaceComponents/ParagraphTitel'
import Description from '../../components/KitaMarktplaceComponents/Description'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'
import { View, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import { Text, Card } from 'react-native-paper'
import BackButton from '../../components/MainComponents/BackButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IP } from '../../constants/constants'
import { Button } from 'react-native-paper'

/**
 * @memberof MarktplatzKitaScreens
 * @class ShowAngeboteScreen
 * @description Genaueres Inspinzieren eines Angebots
 */

export default function ShowAngeboteScreen({ navigation }) {
    const screenWidth = Dimensions.get('window').width * 0.95;
    const [isModalVisible, setIsModalVisible] = useState(false)

    const [angebote, setAngebote] = useState([]);
    const [wochentags, setWochentags] = useState([]);

    /**
     * @method fetchData
     * @memberof MarktplatzKitaScreens.ShowAngeboteScreen
     * @async
     * @description Async Methode welche die Werte des Angebots abspeichert um sie dann anzuzeigen
     */
    useEffect(() => {
        const fetchData = async () => {
            var valueToken = await AsyncStorage.getItem('token')
            const angebotId = parseInt(await AsyncStorage.getItem('angebotId'), 10);

            fetch('http://' + IP + ':8080/api/v1/angebot/' + angebotId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${valueToken}`,
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(data => {
                    if (data && Object.keys(data).length > 0) {
                        console.log(data);
                        setAngebote(data);
                        setWochentags(data.wochentag)
                    } else {
                        console.log('Die Antwort ist leer.');
                    }
                })
                .catch(error => console.error('Fehler:', error));
        }
        // Temporäre Lösung, da der Post länger dauert als das Get und dadurch nicht alles gezogen wird
        setTimeout(() => {
            fetchData();
        }, 500);
    }, []);

    const onRequestOffer = async () => {
        var valueToken = await AsyncStorage.getItem('token')
        var valueId = parseInt(await AsyncStorage.getItem('id'), 10);  

        fetch('http://' + IP + ':/api/v1/profil/verifikationsstatus/' + valueId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${valueToken}`,
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                if (data && Object.keys(data).length > 0) {
                    console.log(data);
                    requestOffer()
                } else {
                    console.log('Die Antwort ist leer.');
                    setIsModalVisible(true)
                }
            })
            .catch(error => console.error('Fehler:', error));
        setIsModalVisible(true)
        requestOffer()
    }

    const requestOffer = async () => {
        var valueToken = await AsyncStorage.getItem('token')
        const userid = parseInt(await AsyncStorage.getItem('id'), 10);
        const angebotId = parseInt(await AsyncStorage.getItem('angebotId'), 10);

        fetch('http://' + IP + `:8080/api/v1/anfrage/create/${userid}/1/${angebotId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${valueToken}`,
            },
            body: JSON.stringify({}),
        })
            // .then(response => response.json())
            .then(data => {
                navigation.navigate('SearchAngeboteScreen')
                return
            })
            .catch(error => console.error('Fehler:', error));
    }


    return (
        <Background>
            <Header items="Angebote" icon="logout" ></Header>
            <View style={{ flex: 1, width: screenWidth, zIndex: -100 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={styles.scrollViewContent}>
                    {/* Abstandhalter für den Header */}
                    <View>
                        <BackButton goBack={navigation.goBack} />
                    </View>
                    <View style={{ marginTop: '20%', marginLeft: '5%' }}>
                        <ProfilePicture></ProfilePicture>
                    </View>
                    <View >
                        <Text style={styles.profileName}>Lea Meier</Text>
                        <Text style={styles.profile}>Studiert an der HKA</Text>
                    </View>
                    <ParagraphTitel>{angebote.kurstitel}</ParagraphTitel>
                    <Card style={styles.cards}>
                        <Card.Content>
                            <Text variant="titleLarge">Kursbeschreibung:</Text>
                            <Text variant="bodyMedium">{angebote.kursbeschreibung}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={styles.cards}>
                        <Card.Content>
                            <Text variant="titleLarge">Infos:</Text>
                            <Text variant="bodyMedium">Altersgruppe: {angebote.altersgruppe_min} - {angebote.altersgruppe_max} Jahre</Text>
                            <Text variant="bodyMedium">Gruppengröße: {angebote.anzahlKinder_min} - {angebote.anzahlKinder_max} Kinder</Text>
                            <Text variant="bodyMedium">Wochentag: {wochentags.join(', ')}</Text>
                            <Text variant="bodyMedium">Regelmäßigkeit: {angebote.regelmaessigkeit}</Text>
                            <Text variant="bodyMedium">Dauer: {angebote.dauer} Minuten</Text>
                            <Text variant="bodyMedium">Kosten: {angebote.kosten}</Text>
                        </Card.Content>
                    </Card>
                    <View style={{ height: 10 }} />
                    <Button mode="contained" onPress={onRequestOffer}>
                        Angebot anfragen
                    </Button>
                    <Modal visible={isModalVisible} transparent={true} animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text>Sie können Angebote erst anfragen sobald Sie verifiziert sind.</Text>
                                <View style={{ height: 10 }} />
                                <Button mode='outlined'
                                    onPress={() => setIsModalVisible(false)}>
                                    OK
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
    profileName: {
        marginLeft: '40%',
        bottom: 80,
        fontSize: 20,
        lineHeight: 35,
    },
    profile: {
        marginLeft: '40%',
        bottom: 80,
        fontSize: 20,
        lineHeight: 35,
    },
    cards: {
        marginTop: 10
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
