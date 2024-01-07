import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Checkbox, DataTable, Text } from 'react-native-paper'
import Header from '../../components/AdminComponents/HeaderAdmin'
import Background from '../../components/MainComponents/Background'
import { IP } from '../../constants/constants'

/**
 * @memberof AdminScreens
 * @class AdminVerifikationScreen
 * @description Adminverifikationsscreen, neue User werden hier angezeigt und lassen sich mittels Checkbox bestätigen
 */

export default function AdminVerifikationScreen ({}) {
  //Getter und Setter für Requests
  const [selectedUser, setSelectedUser] = useState(null)
  const [admin, setAdmin] = useState([])

  /**
   * @method fetchUser
   * @memberof AdminScreens.AdminVerifikationScreen
   * @async
   * @description Async Methode, um alle Unverifizierten User mittels GET-Request abzuholen
   */
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

  /**
   * @method onUserClick
   * @memberof AdminScreens.AdminVerifikationScreen
   * @description Gibt die Daten über einen User in der Konsole aus
   */
  const onUserClick = userData => {
    setSelectedUser(userData)
    console.log('Selected User:', userData)
  }

  /**
   * @method CheckboxToggle
   * @memberof AdminScreens.AdminVerifikationScreen
   * @description Verifiziert mit Klick den User via einem GET-Request zum Backend
   */
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
