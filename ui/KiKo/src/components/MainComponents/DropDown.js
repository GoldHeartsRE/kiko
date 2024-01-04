import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

/**
 * @method DropdownComponent
 * @memberof MainComponents.DropdownComponent
 * @async
 * @description DropdownComponent für die MainComponents, ermöglicht ein Dropdownmenü
 */

export default function DropdownComponent ({
  items,
  onValueChange,
  placeh,
  setVal,
  val
}) {
  const [open, setOpen] = useState(false)
  return (
    <View style={styles.container}>
      <DropDownPicker
        style={styles.dropdown}
        open={open}
        value={val}
        items={items}
        setOpen={setOpen}
        setValue={setVal}
        placeholder={placeh}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    width: 300,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    zIndex: 100
  },
  container: {
    width: '100%',
    marginVertical: 12,
    zIndex: 100
  }
})
