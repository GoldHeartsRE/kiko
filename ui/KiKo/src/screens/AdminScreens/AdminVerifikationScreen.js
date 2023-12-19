import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView  } from 'react-native'
import { Text, DataTable, Checkbox } from 'react-native-paper'
import Background from '../../components/MainComponents/Background'
import Header from '../../components/AdminComponents/HeaderAdmin'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { IP } from '../../constants/constants'

export default function AdminVerifikationScreen({}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [admin, setAdmin] = useState([]);
  const navigation = useNavigation();

  // const fetchUser = async () => {
  //   var valueToken = await AsyncStorage.getItem('token') 
  //   var valueId = await AsyncStorage.getItem('id') 
  
  //   const res = await fetch('http://localhost:8080/api/v1/auth/unverifiedUsers', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${valueToken}`,
  //     },
  //   }).then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     // admin = data;
  //     admin.value = data
  //     test = data
  //     console.log(admin.value);
  //     console.log(test);

  //   })
  //   .catch(error => console.error('Fehler:', error));
  // };
  
  // useEffect(() => {
  //   setTimeout(() => {
  //     fetchUser();
  //   }, 100);
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      var valueToken = await AsyncStorage.getItem('token') 
  
      fetch('http://' + IP + ':8080/api/v1/auth/unverifiedUsers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${valueToken}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        setAdmin(data);
        console.log(data);
        admin.value = data
        console.log(admin.value);
      })
      .catch(error => console.error('Fehler:', error));
      }
    setTimeout(() => {
      fetchUser();
    }, 1);
  }, []);

  // const users = [
  //   { id: 1, vorname: 'Walter', email: 'walter@yahoo.de' ,nachname: 'Fritsch', telefon: '0152374626', verifiziert: true },
  //   { id: 2, vorname: 'Sibille', email: 'sibille@yahoo.de' , nachname: 'Truthahn', telefon: '0152022535', verifiziert: false },
  //   { id: 4, vorname: 'Max', nachname: 'Mustermann', email: 'max.mustermann@example.com', telefon: '0123456789', verifiziert: true },
  //   { id: 5, vorname: 'Anna', nachname: 'Schmidt', email: 'anna.schmidt@example.com', telefon: '9876543210', verifiziert: false },
  //   { id: 6, vorname: 'Tom', nachname: 'Müller', email: 'tom.mueller@example.com', telefon: '6549873210', verifiziert: true },
  //   { id: 7, vorname: 'Laura', nachname: 'Fischer', email: 'laura.fischer@example.com', telefon: '1234567890', verifiziert: false },
  //   { id: 8, vorname: 'Paul', nachname: 'Wagner', email: 'paul.wagner@example.com', telefon: '4567891230', verifiziert: true },
  //   { id: 9, vorname: 'Sophie', nachname: 'Koch', email: 'sophie.koch@example.com', telefon: '7890123456', verifiziert: false },
  //   { id: 10, vorname: 'Hans', nachname: 'Schneider', email: 'hans.schneider@example.com', telefon: '5555555555', verifiziert: true },
  //   { id: 11, vorname: 'Julia', nachname: 'Bauer', email: 'julia.bauer@example.com', telefon: '1111111111', verifiziert: false },
  //   { id: 12, vorname: 'Felix', nachname: 'Schulz', email: 'felix.schulz@example.com', telefon: '2222222222', verifiziert: true },
  // ];

  const onUserClick = (userData) => {
    setSelectedUser(userData);
    console.log('Selected User:', userData);
    // AsyncStorage.setItem('userid', userData.id);
    // console.log(userData.role);

    // if (userData.role == 'PARTNER' ) {
    //   navigation.navigate('EditUserPartnerScreen')
    // }

    // if (userData.role == 'KITA' ) {
    //   navigation.navigate('StartScreen')
    // }
  };

  const CheckboxToggle = async(userData) => {
    userData.verified = !userData.verified;

    setSelectedUser(userData);
    console.log('Checkbox Toggled for User:', userData);
    var valueToken = await AsyncStorage.getItem('token') 
  
    fetch('http://' + IP + ':8080/api/v1/auth/verify/' + userData.id, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${valueToken}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error('Fehler:', error));
  };

  return (
    <Background>
      <Header items="AdminPanel" icon="logout" ></Header>
          <View style={{ flex: 3}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}} contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
            <Text>Usertabelle:</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={styles.largeCell}>Email</DataTable.Title>
                <DataTable.Title>Rolle</DataTable.Title>
                <DataTable.Title style={styles.largeCell}>Verifiziert?</DataTable.Title>
              </DataTable.Header>
                {admin?.map((user) => (
              <DataTable.Row key={user.id} onPress={() => onUserClick(user)}>
                <DataTable.Cell style={styles.largeCell}>{user.email}</DataTable.Cell>
                <DataTable.Cell>{user.role}</DataTable.Cell>
                <DataTable.Cell style={styles.largeCell}>{user.verified}</DataTable.Cell>
                <DataTable.Cell>
                  <Checkbox status={user.verified ? 'checked' : 'unchecked'} onPress={() => CheckboxToggle(user)}/>
                </DataTable.Cell>
              </DataTable.Row>
                ))}
            </DataTable>
            </View>
            </ScrollView>
          </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 150,
  },
  largeCell: {
    width: 300, // Adjust the flex value to change the cell width
  },
  scrollViewContent: {
    flexDirection: 'column',
},
});