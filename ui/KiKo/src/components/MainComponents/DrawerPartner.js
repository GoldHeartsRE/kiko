import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Drawer, Text } from 'react-native-paper'

/**
 * @method DrawerPartner
 * @memberof MainComponents.DrawerPartner
 * @async
 * @description DrawerPartner für die MainComponents, setzt im Profil den Drawer fest, welcher ermöglicht auf andere Komponente zu navigieren oder sich auszuloggen
 */

export default function DrawerPartner () {
  const [active, setActive] = React.useState('')
  const navigation = useNavigation()

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('id')
    } catch (e) {}
    console.log('Ausgeloggt')
    navigation.navigate('StartScreen')
  }

  return (
    <View>
      <Drawer.Section
        title={<Text style={{ fontWeight: 'bold' }}>Übersicht</Text>}
      >
        <Drawer.Item
          label='Kooperationen'
          active={active === 'first'}
          onPress={() => {
            setActive('first'),
              navigation.navigate('UebersichtPartnerKooperationen')
          }}
        />
        <Drawer.Item
          label='Eigene Angebote'
          active={active === 'second'}
          onPress={() => {
            setActive('second'), navigation.navigate('UebersichtAngeboteScreen')
          }}
        />
        <Drawer.Item
          label='Anfragen'
          active={active === 'third'}
          onPress={() => {
            setActive('third'),
              navigation.navigate('UebersichtPartnerAnfragenAngebote')
          }}
        />
      </Drawer.Section>
      <Drawer.Section>
        <Drawer.Item label='Logout' onPress={onLogout} />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  titel: {
    fontWeight: 'bold',
    fontSize: 25
  }
})
