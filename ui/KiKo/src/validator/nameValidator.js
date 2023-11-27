export function kitaNameValidator(kitaName) {
    if (!kitaName) return "Kita-Name darf nicht leer sein."
    if (kitaName.length < 5) return 'Kita-Name muss min. 5 Zeichen lang sein'
    return ''
  }

  export function nameValidator(name) {
    if (!name) return "Name darf nicht leer sein."
    return ''
  }
  