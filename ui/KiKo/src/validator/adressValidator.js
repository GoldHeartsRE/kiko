export function plzValidator(plz) {
    if (!plz) return "Postleihzahl darf nicht leer sein."
    if (plz.length < 5) return 'Postleitzahl muss genau 5 Zeichen lang sein'
    if (plz.length > 5) return 'Postleitzahl muss genau 5 Zeichen lang sein'
    return '' // wirklich benötigt?
  }
  
export function ortValidator(ort) {
    if (!ort) return "Ort darf nicht leer sein."
}

export function straßeValidator(straße) {
    if (!straße) return "Straße darf nicht leer sein."
}

export function nummerValidator(nummer) {
    if (!nummer) return "Nummer darf nicht leer sein."
}