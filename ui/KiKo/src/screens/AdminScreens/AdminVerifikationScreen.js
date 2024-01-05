import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Checkbox, DataTable, Text } from 'react-native-paper'
import Header from '../../components/AdminComponents/HeaderAdmin'
import Background from '../../components/MainComponents/Background'
import { IP } from '../../constants/constants'

export default function AdminVerifikationScreen ({}) {
  const [selectedUser, setSelectedUser] = useState(null)
  const [admin, setAdmin] = useState([])
  const navigation = useNavigation()

  // const fetchUser = async () => {
  //   var valueToken = await AsyncStorage.getItem('token')
  //   const valueId = parseInt(await AsyncStorage.getItem('id'), 10);

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
          Authorization: `Bearer ${valueToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setAdmin(data)
          console.log(data)
          admin.value = data
          console.log(admin.value)
        })
        .catch(error => console.error('Fehler:', error))
    }
    setTimeout(() => {
      fetchUser()
    }, 1)
  }, [])

  const onUserClick = userData => {
    setSelectedUser(userData)
    console.log('Selected User:', userData)
    // AsyncStorage.setItem('userid', userData.id);
    // console.log(userData.role);

    // if (userData.role == 'PARTNER' ) {
    //   navigation.navigate('EditUserPartnerScreen')
    // }

    // if (userData.role == 'KITA' ) {
    //   navigation.navigate('StartScreen')
    // }
  }

  const CheckboxToggle = async userData => {
    userData.verified = !userData.verified

    setSelectedUser(userData)
    console.log('Checkbox Toggled for User:', userData)
    var valueToken = await AsyncStorage.getItem('token')

    fetch('http://' + IP + ':8080/api/v1/auth/verify/' + userData.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${valueToken}`
      }
    })
      .then(response => response)
      .then(data => {})
      .catch(error => console.error('Fehler:', error))
  }

  return (
    <Background>
      <Header items='AdminPanel' icon='logout'></Header>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.container}>
            <Text>Nicht verifizierte User:</Text>
            <DataTable style={styles.table}>
              <DataTable.Header>
                <DataTable.Title>Email</DataTable.Title>
                <DataTable.Title>Rolle</DataTable.Title>
                <DataTable.Title>Verifizieren?</DataTable.Title>
              </DataTable.Header>
              {admin?.map(user => (
                <DataTable.Row key={user.id} onPress={() => onUserClick(user)}>
                  <DataTable.Cell>{user.email}</DataTable.Cell>
                  <DataTable.Cell>{user.role}</DataTable.Cell>
                  <DataTable.Cell>{user.verified}</DataTable.Cell>
                  <DataTable.Cell>
                    <Checkbox
                      status={user.verified ? 'checked' : 'unchecked'}
                      onPress={() => CheckboxToggle(user)}
                    />
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
    marginTop: 70
  },
  scrollViewContent: {
    flexDirection: 'column'
  },
  table: {
    width: 350
  }
})
