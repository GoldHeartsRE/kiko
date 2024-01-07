import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CommonActions } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { BottomNavigation } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  AdminPanelScreen,
  AdminVerifikationScreen
} from '../../screens/AdminScreens'

/**
 * @method BottomNavAdmin
 * @memberof MainComponents
 * @async
 * @description BottomNavAdmin für die MainComponents, setzt in der App die Komponente für die BottomNavigation beim Admin fest
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
        name='AdminPanel'
        component={AdminPanelScreen}
        options={{
          tabBarLabel: 'Admin Panel',
          tabBarIcon: ({ color, size }) => {
            return <Icon name='alert-box-outline' size={size} color={'white'} />
          }
        }}
      />
      <Tab.Screen
        name='Verifikation'
        component={AdminVerifikationScreen}
        options={{
          tabBarLabel: 'Verifikation',
          tabBarIcon: ({ color, size }) => {
            return <Icon name='badge-account' size={size} color={'white'} />
          }
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5882FA'
  }
})
