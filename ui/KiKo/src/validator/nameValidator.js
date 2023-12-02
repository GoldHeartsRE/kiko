export function kitaNameValidator(kitaName) {
    if (!kitaName) return "Kita-Name darf nicht leer sein."
    if (kitaName.length < 5) return 'Kita-Name muss min. 5 Zeichen lang sein'
    return ''
  }

  export function vornameValidator(vorname) {
    if (!vorname) return "Vorname darf nicht leer sein."
    return ''
  }

  export function nachnameValidator(nachname) {
    if (!nachname) return "Nachname darf nicht leer sein."
    return ''
  }
  