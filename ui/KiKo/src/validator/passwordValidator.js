export function passwordValidator(password) {
    if (!password) return "Passwort darf nicht leer sein."
    if (password.length < 5) return 'Passwort muss mindestens 5 Zeichen lang sein'
    return ''
  }
  