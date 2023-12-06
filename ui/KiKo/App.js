import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/theme/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterRoleScreen,
  RegisterKitaScreen,
  RegisterPartnerScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens/LoginScreens'
import {
  CreateProfileStartScreen,
  AdressScreen,
  CreateNameScreen, 
  DescriptionScreen, 
  GenderScreen,
  BirthdayScreen,
  OccupationScreen,
  PartnerProfileEndScreen,
  PhoneNumberScreen,
  ProfilePictureScreen,
  QualificationScreen,
  VerificationScreen
} from './src/screens/ProfileCreationPartnerScreens'
import {
  CreateStartScreen,
  NameKitaScreen,
  AdressKitaScreen,
  KitaProfilEndScreen,
  AnsprechpartnerScreen,
  VerificationKitaScreen
} from './src/screens/ProfileCreationKitaScreens'
import {
  ProfileKitaScreen,
  ProfileKitaEditScreen
} from './src/screens/ProfileKitaScreens'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Login und Registrierung */}
          <Stack.Screen name="StartScreen" component={StartScreen}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterRoleScreen" component={RegisterRoleScreen} />
          <Stack.Screen name="RegisterKitaScreen" component={RegisterKitaScreen} />
          <Stack.Screen name="RegisterPartnerScreen" component={RegisterPartnerScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
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
          <Stack.Screen name="CreateStartScreen" component={CreateStartScreen}  />
          <Stack.Screen name="NameKitaScreen" component={NameKitaScreen}  />
          <Stack.Screen name="AdressKitaScreen" component={AdressKitaScreen}  />
          <Stack.Screen name="KitaProfilEndScreen" component={KitaProfilEndScreen}  />
          <Stack.Screen name="VerificationKitaScreen" component={VerificationKitaScreen}  />
          <Stack.Screen name="AnsprechpartnerScreen" component={AnsprechpartnerScreen}  />

          {/* Profil Kita */}
          <Stack.Screen name="ProfileKitaScreen" component={ProfileKitaScreen}  />
          <Stack.Screen name="ProfileKitaEditScreen" component={ProfileKitaEditScreen}  />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}