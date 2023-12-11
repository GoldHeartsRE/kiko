export function zahlValidator(value, name) {
    const numericRegex = /^[0-9]+$/;

    if (!value) return name + " darf nicht leer sein."
    if (!numericRegex.test(value)) return "Nur Zahlen erlaubt!"
    return ''
  }

  export function zifferValidator(value) {
    const numericRegex = /^[0-9]+$/;

    if(!value) return ''
    if (!numericRegex.test(value)) return "Nur Zahlen erlaubt!"
    return ''
  }
  