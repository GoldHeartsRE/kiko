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
  ProfileKitaEditScreen,
  DashboardKitaScreen
} from './src/screens/ProfileKitaScreens'
import {
  ProfilePartnerScreen,
  ProfilePartnerEditScreen,
  DashboardPartnerScreen,
} from './src/screens/ProfilePartnerScreens'
import {
  CreateAngebot,
  EditAngebot,
  UebersichtAngebote
} from './src/screens/MarktplacePartnerScreens'
import {
  SearchAngebote
} from './src/screens/MarktplaceKitaScreens'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SearchAngebote"
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
          <Stack.Screen name="DashboardKitaScreen" component={DashboardKitaScreen}  />
          <Stack.Screen name="ProfileKitaScreen" component={ProfileKitaScreen}  />
          <Stack.Screen name="ProfileKitaEditScreen" component={ProfileKitaEditScreen}  />

          {/* Profil Partner */}
          <Stack.Screen name="DashboardPartnerScreen" component={DashboardPartnerScreen}  />
          <Stack.Screen name="ProfilePartnerScreen" component={ProfilePartnerScreen}  />
          <Stack.Screen name="ProfilePartnerEditScreen" component={ProfilePartnerEditScreen}  />
          {/* Marktplatz Partner */}
          <Stack.Screen name="CreateAngebot" component={CreateAngebot} />
          <Stack.Screen name="EditAngebot" component={EditAngebot} />
          <Stack.Screen name="UebersichtAngebote" component={UebersichtAngebote} />

          {/* Marktplatz Kita */}
          <Stack.Screen name="SearchAngebote" component={SearchAngebote} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}