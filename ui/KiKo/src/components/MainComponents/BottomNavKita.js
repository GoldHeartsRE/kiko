import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileKitaScreen, ProfileKitaEditScreen }from '../../screens/ProfileKitaScreens';
import { SearchAngeboteScreen, ShowAngeboteScreen, UebersichtKitaAnfragenAngebote, UebersichtKitaKooperationen } from '../../screens/MarktplaceKitaScreens';

  /**
   * @method BottomNavKita
   * @memberof MainComponents.BottomNavKita
   * @async
   * @description BottomNavKita für die MainComponents, setzt in der App die Komponente für die BottomNavigation beim Kita fest
   */

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
        name="Profil"
        component={ProfilKitaNav}
        options={{ headerShown: false,
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account" size={size} color={'black'} />;
          },
        }}
      />
      <Tab.Screen
        name="Angebot"
        component={AngeboteNav}
        options={{ headerShown: false,
          tabBarLabel: 'Angebote suchen',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="magnify" size={size} color={'black'} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const KitaNav = createNativeStackNavigator();

function AngeboteNav() {
  return (
    <KitaNav.Navigator screenOptions={{ headerShown: false }}>
      <KitaNav.Screen name="SearchAngeboteScreen" component={SearchAngeboteScreen}/>
      <KitaNav.Screen name="ShowAngeboteScreen" component={ShowAngeboteScreen}/>
      <KitaNav.Screen name="UebersichtKitaAnfragenAngebote" component={UebersichtKitaAnfragenAngebote}/>
      <KitaNav.Screen name="UebersichtKitaKooperationen" component={UebersichtKitaKooperationen}/>
    </KitaNav.Navigator>
  );
}

const KitaProfilNav = createNativeStackNavigator();

function ProfilKitaNav() {
  return (
    <KitaProfilNav.Navigator screenOptions={{ headerShown: false }}>
      <KitaProfilNav.Screen name="ProfileKitaScreen" component={ProfileKitaScreen}/>
      <KitaProfilNav.Screen name="ProfileKitaEditScreen"component={ProfileKitaEditScreen}/>
      <KitaProfilNav.Screen name="UebersichtKitaAnfragenAngebote" component={UebersichtKitaAnfragenAngebote}/>
      <KitaProfilNav.Screen name="UebersichtKitaKooperationen" component={UebersichtKitaKooperationen}/>
    </KitaProfilNav.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  test: {
    backgroundColor: 'red'
  }
});
