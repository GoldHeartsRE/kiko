import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Provider } from 'react-native-paper'
import {
  AdminPanelScreen,
  AdminVerifikationScreen,
  DashboardAdminScreen,
  EditUserPartnerScreen
} from './src/screens/AdminScreens'
import {
  LoginScreen,
  RegisterKitaScreen,
  RegisterPartnerScreen,
  RegisterRoleScreen,
  ResetPasswordScreen,
  StartScreen,
} from './src/screens/LoginScreens'
import {
  SearchAngeboteScreen,
  ShowAngeboteScreen,
  UebersichtKitaAnfragenAngebote,
  UebersichtKitaKooperationen
} from './src/screens/MarktplaceKitaScreens'
import {
  CreateAngebotScreen,
  EditAngebotScreen,
  UebersichtAngeboteScreen,
  UebersichtPartnerAnfragenAngebote,
  UebersichtPartnerKooperationen
} from './src/screens/MarktplacePartnerScreens'
import {
  AdressKitaScreen,
  AnsprechpartnerScreen,
  CreateStartScreen,
  KitaProfilEndScreen,
  NameKitaScreen,
  VerificationKitaScreen
} from './src/screens/ProfileCreationKitaScreens'
import {
  AdressScreen,
  BirthdayScreen,
  CreateNameScreen,
  CreateProfileStartScreen,
  DescriptionScreen,
  GenderScreen,
  OccupationScreen,
  PartnerProfileEndScreen,
  PhoneNumberScreen,
  ProfilePictureScreen,
  QualificationScreen,
  VerificationScreen
} from './src/screens/ProfileCreationPartnerScreens'
import {
  DashboardKitaScreen,
  ProfileKitaEditScreen,
  ProfileKitaScreen
} from './src/screens/ProfileKitaScreens'
import {
  DashboardPartnerScreen,
  ProfilePartnerEditScreen,
  ProfilePartnerScreen,
} from './src/screens/ProfilePartnerScreens'
import { theme } from './src/theme/theme'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SearchAngeboteScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Login und Registrierung */}
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterRoleScreen" component={RegisterRoleScreen} />
          <Stack.Screen name="RegisterKitaScreen" component={RegisterKitaScreen} />
          <Stack.Screen name="RegisterPartnerScreen" component={RegisterPartnerScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />

          {/* Profil-Erstellung Partner */}
          <Stack.Screen name="CreateProfileStartScreen" component={CreateProfileStartScreen} />
          <Stack.Screen name="CreateNameScreen" component={CreateNameScreen} />
          <Stack.Screen name="GenderScreen" component={GenderScreen} />
          <Stack.Screen name="BirthdayScreen" component={BirthdayScreen} />
          <Stack.Screen name="AdressScreen" component={AdressScreen} />
          <Stack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} />
          <Stack.Screen name="OccupationScreen" component={OccupationScreen} />
          <Stack.Screen name="QualificationScreen" component={QualificationScreen} />
          <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
          <Stack.Screen name="ProfilePictureScreen" component={ProfilePictureScreen} />
          <Stack.Screen name="DescriptionScreen" component={DescriptionScreen} />
          <Stack.Screen name="PartnerProfileEndScreen" component={PartnerProfileEndScreen} />

          {/* Profil-Erstellung Kita */}
          <Stack.Screen name="CreateStartScreen" component={CreateStartScreen} />
          <Stack.Screen name="NameKitaScreen" component={NameKitaScreen} />
          <Stack.Screen name="AdressKitaScreen" component={AdressKitaScreen} />
          <Stack.Screen name="KitaProfilEndScreen" component={KitaProfilEndScreen} />
          <Stack.Screen name="VerificationKitaScreen" component={VerificationKitaScreen} />
          <Stack.Screen name="AnsprechpartnerScreen" component={AnsprechpartnerScreen} />

          {/* Admin Panel */}
          <Stack.Screen name="AdminPanelScreen" component={AdminPanelScreen} />
          <Stack.Screen name="AdminVerifikationScreen" component={AdminVerifikationScreen} />
          <Stack.Screen name="DashboardAdminScreen" component={DashboardAdminScreen} />
          <Stack.Screen name="EditUserPartnerScreen" component={EditUserPartnerScreen} />

          {/* Profil Kita */}
          <Stack.Screen name="DashboardKitaScreen" component={DashboardKitaScreen} />
          <Stack.Screen name="ProfileKitaScreen" component={ProfileKitaScreen} />
          <Stack.Screen name="ProfileKitaEditScreen" component={ProfileKitaEditScreen} />

          {/* Profil Partner */}
          <Stack.Screen name="DashboardPartnerScreen" component={DashboardPartnerScreen} />
          <Stack.Screen name="ProfilePartnerScreen" component={ProfilePartnerScreen} />
          <Stack.Screen name="ProfilePartnerEditScreen" component={ProfilePartnerEditScreen} />

          {/* Marktplatz Partner */}
          <Stack.Screen name="CreateAngebotScreen" component={CreateAngebotScreen} />
          <Stack.Screen name="EditAngebotScreen" component={EditAngebotScreen} />
          <Stack.Screen name="UebersichtAngeboteScreen" component={UebersichtAngeboteScreen} />
          <Stack.Screen name="UebersichtPartnerAnfragenAngebote" component={UebersichtPartnerAnfragenAngebote} />
          <Stack.Screen name="UebersichtPartnerKooperationen" component={UebersichtPartnerKooperationen} />

          {/* Marktplatz Kita */}
          <Stack.Screen name="SearchAngeboteScreen" component={SearchAngeboteScreen} />
          <Stack.Screen name="ShowAngeboteScreen" component={ShowAngeboteScreen} />
          <Stack.Screen name="UebersichtKitaAnfragenAngebote" component={UebersichtKitaAnfragenAngebote} />
          <Stack.Screen name="UebersichtKitaKooperationen" component={UebersichtKitaKooperationen} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}