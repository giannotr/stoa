class Indicators {
  currency = 'EUR';
  vatRate = 0.19;
  vatIncluded = true;
  shipping = 2;
  shippingThreshhold = 3;
}

export const indicators = new Indicators();

export function formatcash(value) {
  return new Intl.NumberFormat(
    'de-DE',
    { style: 'currency', currency: indicators.currency },
  ).format(value);
}

/* obsolete?: Classnames */
/* workaround: base components */

class Classnames {
  buttonPrimary   = 'btn btn-primary';
  buttonSecondary = 'btn btn-secondary';
  modalBody       = 'shopping-modal-body';
  modalFooter     = 'shopping-modal-footer';
}

export const classnames = new Classnames();

if(!window.localStorage.language) {
  window.localStorage.setItem('language', 'german');
}

class Textblocks {
  constructor(language) {
    this.language = language;
  }

  incl = 'inkl.';
  plus = 'zzgl.';

  cartEmpty = 'Der Einkaufswagen ist leer.'

  vat = 'MwSt.';

  fname = 'Vorname';
  lname = 'Nachname';
  address = 'Adresse';
  zip = 'PLZ';
  city = 'Ort';
  country = 'Land';
  plsSelect = 'Bitte auswählen';

  germany     = 'Deutschland';
  austria     = 'Österreich';
  switzerland = 'Schweiz';
}

export const textblocks = new Textblocks(window.localStorage.language);
