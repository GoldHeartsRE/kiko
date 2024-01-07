import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CommonActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import { BottomNavigation } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  CreateAngebotScreen,
  EditAngebotScreen,
  UebersichtAngeboteScreen,
  UebersichtPartnerAnfragenAngebote,
  UebersichtPartnerKooperationen
} from '../../screens/MarktplacePartnerScreens'
import {
  ProfilePartnerEditScreen,
  ProfilePartnerScreen
} from '../../screens/ProfilePartnerScreens'

/**
 * @method BottomNavPartner
 * @memberof MainComponents
 * @async
 * @description BottomNavPartner für die MainComponents, setzt in der App die Komponente für die BottomNavigation beim Partner fest
 */

const Tab = createBottomTabNavigator()

export default function BottomNav () {
  return (
    <Tab.Navigator
      style={styles.test}
      screenOptions={{
        headerShown: false
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          style={styles.container}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            })

            if (event.defaultPrevented) {
              preventDefault()
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key
              })
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key]
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 })
            }

            return null
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key]
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title

            return label
          }}
        />
      )}
    >
      <Tab.Screen
        name='Profil'
        component={AngeboteNav}
        options={{
          headerShown: false,
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => {
            return <Icon name='account' size={size} color={'black'} />
          }
        }}
      />
      <Tab.Screen
        name='Angebot'
        component={ProfilPartnerNav}
        options={{
          headerShown: false,
          tabBarLabel: 'Angebot erstellen',
          tabBarIcon: ({ color, size }) => {
            return <Icon name='plus' size={size} color={'black'} />
          }
        }}
      />
    </Tab.Navigator>
  )
}

const PartnerNav = createNativeStackNavigator()

function AngeboteNav () {
  return (
    <PartnerNav.Navigator screenOptions={{ headerShown: false }}>
      <PartnerNav.Screen
        name='ProfilePartnerScreen'
        component={ProfilePartnerScreen}
      />
      <PartnerNav.Screen
        name='ProfilePartnerEditScreen'
        component={ProfilePartnerEditScreen}
      />
      <PartnerNav.Screen
        name='UebersichtAngeboteScreen'
        component={UebersichtAngeboteScreen}
      />
      <PartnerNav.Screen
        name='UebersichtPartnerAnfragenAngebote'
        component={UebersichtPartnerAnfragenAngebote}
      />
      <PartnerNav.Screen
        name='UebersichtPartnerKooperationen'
        component={UebersichtPartnerKooperationen}
      />
    </PartnerNav.Navigator>
  )
}

const PartnerProfilNav = createNativeStackNavigator()

function ProfilPartnerNav () {
  return (
    <PartnerProfilNav.Navigator screenOptions={{ headerShown: false }}>
      <PartnerProfilNav.Screen
        name='CreateAngebotScreen'
        component={CreateAngebotScreen}
      />
      <PartnerProfilNav.Screen
        name='EditAngebotScreen'
        component={EditAngebotScreen}
      />
      <PartnerProfilNav.Screen
        name='UebersichtAngeboteScreen'
        component={UebersichtAngeboteScreen}
      />
      <PartnerProfilNav.Screen
        name='UebersichtPartnerAnfragenAngebote'
        component={UebersichtPartnerAnfragenAngebote}
      />
      <PartnerProfilNav.Screen
        name='UebersichtPartnerKooperationen'
        component={UebersichtPartnerKooperationen}
      />
    </PartnerProfilNav.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  test: {
    backgroundColor: 'red'
  }
})
