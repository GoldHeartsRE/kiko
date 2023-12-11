import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PlatzhalterProfile }from '../../screens/ProfileKitaScreens';
import { ProfileKitaScreen }from '../../screens/ProfileKitaScreens';
import { SearchAngeboteScreen } from '../../screens/MarktplaceKitaScreens';

const Tab = createBottomTabNavigator();

export default function BottomNav() {

  return (
    <Tab.Navigator style={styles.test}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar style={styles.container}
          navigationState={state}
         safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
             navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Gesuch"
        component={PlatzhalterProfile}
        options={{
          tabBarLabel: 'Gesuch erstellen',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="plus" size={size} color={'black'} />;
          },
        }}
      />
      <Tab.Screen
        name="Angebot"
        component={SearchAngeboteScreen}
        options={{
          tabBarLabel: 'Angebote suchen',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account-search" size={size} color={'black'} />;
          },
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileKitaScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account" size={size} color={'black'} />;
          },
        }}
      />
      <Tab.Screen
        name="Übersicht"
        component={PlatzhalterProfile}
        options={{
          tabBarLabel: 'Übersicht',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="format-list-bulleted" size={size} color={'black'} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

// function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <Text variant="headlineMedium">Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={styles.container}>
//       <Text variant="headlineMedium">Settings!</Text>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  test: {
    backgroundColor: 'red'
  }
});
