export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "E-Mail darf nicht leer sein."
    if (!re.test(email)) return 'Ooops! Wir brauchen eine valide E-Mail.'
    return ''
  }