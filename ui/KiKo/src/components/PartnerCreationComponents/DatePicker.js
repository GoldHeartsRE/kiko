import React from 'react'
import { StyleSheet, View } from 'react-native'
import { DatePickerInput } from 'react-native-paper-dates'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { theme } from '../../theme/theme'

/**
 * @method DatePicker
 * @memberof PartnerCreationComponent
 * @async
 * @description DatePicker für die PartnerCreationComponent, ermöglicht mithilfe einer Erweiterung das Datum manuell über einen Kalendar zu setzen
 */

export default function DatePicker ({ test }) {
  const [inputDate, setInputDate] = React.useState(undefined)

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <DatePickerInput
          style={styles.design}
          label='Geburtsdatum'
          value={inputDate}
          onChange={d => setInputDate(d)}
          inputMode='start'
        />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  design: {
    backgroundColor: theme.colors.surface
  },
  container: {
    width: '105%',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    maxHeight: 100
  }
})
