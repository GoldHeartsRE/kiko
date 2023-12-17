import React, { useState } from 'react';
import { View, StyleSheet, ScrollView  } from 'react-native'
import { Text, DataTable, Checkbox } from 'react-native-paper'
import Background from '../../components/MainComponents/Background'
import Header from '../../components/AdminComponents/HeaderAdmin'

export default function AdminVerifikationScreen({}) {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, vorname: 'Walter', email: 'walter@yahoo.de' ,nachname: 'Fritsch', telefon: '0152374626', verifiziert: true },
    { id: 2, vorname: 'Sibille', email: 'sibille@yahoo.de' , nachname: 'Truthahn', telefon: '0152022535', verifiziert: false },
    { id: 4, vorname: 'Max', nachname: 'Mustermann', email: 'max.mustermann@example.com', telefon: '0123456789', verifiziert: true },
    { id: 5, vorname: 'Anna', nachname: 'Schmidt', email: 'anna.schmidt@example.com', telefon: '9876543210', verifiziert: false },
    { id: 6, vorname: 'Tom', nachname: 'Müller', email: 'tom.mueller@example.com', telefon: '6549873210', verifiziert: true },
    { id: 7, vorname: 'Laura', nachname: 'Fischer', email: 'laura.fischer@example.com', telefon: '1234567890', verifiziert: false },
    { id: 8, vorname: 'Paul', nachname: 'Wagner', email: 'paul.wagner@example.com', telefon: '4567891230', verifiziert: true },
    { id: 9, vorname: 'Sophie', nachname: 'Koch', email: 'sophie.koch@example.com', telefon: '7890123456', verifiziert: false },
    { id: 10, vorname: 'Hans', nachname: 'Schneider', email: 'hans.schneider@example.com', telefon: '5555555555', verifiziert: true },
    { id: 11, vorname: 'Julia', nachname: 'Bauer', email: 'julia.bauer@example.com', telefon: '1111111111', verifiziert: false },
    { id: 12, vorname: 'Felix', nachname: 'Schulz', email: 'felix.schulz@example.com', telefon: '2222222222', verifiziert: true },
  ];

  const onUserClick = (userData) => {
    setSelectedUser(userData);
    console.log('Selected User:', userData);
  };

  const CheckboxToggle = (userData) => {
    userData.verifiziert = !userData.verifiziert;
    console.log('Checkbox Toggled for User:', userData);
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
                <DataTable.Title>Vorname</DataTable.Title>
                <DataTable.Title>Nachname</DataTable.Title>
                <DataTable.Title>E-Mail</DataTable.Title>
                <DataTable.Title>Telefonnummer</DataTable.Title>
                <DataTable.Title>Verifiziert?</DataTable.Title>
              </DataTable.Header>
                {users.map((user) => (
              <DataTable.Row key={user.id} onPress={() => onUserClick(user)}>
                <DataTable.Cell>{user.vorname}</DataTable.Cell>
                <DataTable.Cell>{user.nachname}</DataTable.Cell>
                <DataTable.Cell style={styles.largeCell}>{user.email}</DataTable.Cell>
                <DataTable.Cell style={styles.largeCell}>{user.telefon}</DataTable.Cell>
                <DataTable.Cell>
                  <Checkbox status={user.verifiziert ? 'checked' : 'unchecked'} onPress={() => CheckboxToggle(user)}/>
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