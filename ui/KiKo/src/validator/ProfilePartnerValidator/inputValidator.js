export function inputValidator(text) {
    if (!text) return "Feld darf nicht leer sein."
    return ''
  }
  
export function adressValidator(plz) {
    if (!plz) return "Feld darf nicht leer sein."
    if (plz.length < 5) return 'Postleitzahl muss genau 5 Zeichen lang sein'
    if (plz.length > 5) return 'Postleitzahl muss genau 5 Zeichen lang sein'
    return ''
  }