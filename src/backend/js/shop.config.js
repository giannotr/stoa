class Indicators {
  currency = 'EUR';
  vat = 0.19;
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

  germany     = 'Deutschland';
  austria     = 'Österreich';
  switzerland = 'Schweiz';
  cartempty   = 'Der Einkaufswagen ist leer.'
}

export const textblocks = new Textblocks(window.localStorage.language);
