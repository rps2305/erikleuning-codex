import Alpine from 'alpinejs';

const CONSENT_MESSAGE = 'Ik verwerk persoonsgegevens over u doordat u gebruik maakt van mijn diensten.';

Alpine.data('contactForm', () => ({
  naam: '',
  email: '',
  bericht: '',
  touched: {
    naam: false,
    email: false,
    bericht: false
  },
  alert: false,
  get isNaamValid() {
    return this.naam.trim().length > 0;
  },
  get isEmailValid() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());
  },
  get isBerichtValid() {
    return this.bericht.trim().length > 0;
  },
  get isValid() {
    return this.isNaamValid && this.isEmailValid && this.isBerichtValid;
  },
  handleSubmit(event) {
    this.touched.naam = true;
    this.touched.email = true;
    this.touched.bericht = true;
    if (!this.isValid) {
      event.preventDefault();
      this.alert = true;
    }
  },
  handleBlur(field) {
    this.touched[field] = true;
  },
  get consentMessage() {
    return CONSENT_MESSAGE;
  }
}));
