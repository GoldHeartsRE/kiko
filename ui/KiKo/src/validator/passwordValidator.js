export function passwordValidator(password) {
    if (!password) return "Passwort darf nicht leer sein."
    if (password.length < 5) return 'Passwort muss mindestens 5 Zeichen lang sein'
    return ''
  }
  
export function confirmPasswordValidator(password1, password2) {
    if (password1 !== password2) return "Passwort muss gleich sein!"
    if (!password2) return "Passwort darf nicht leer sein."
    if (password2.length < 5) return 'Passwort muss mindestens 5 Zeichen lang sein'
}
  