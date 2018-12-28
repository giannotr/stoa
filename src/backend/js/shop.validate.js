class Validate {
  constructor() {
    this.numbersrx = "^\d+$";
    this.lettersrx = "(?![^a-z])";
    this.textrx = "^[a-zA-ZäöüÄÖÜ0-9\s .-]+$";
    this.emailrx = "^[a-z0-9.!#$%&'*+=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$";
  }//"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"

  isNumber(i) {
    return (i === 0 || !(!i || !(Number(i) === i)));
  }
  
  isString(i){
    return (typeof i === 'string' || i instanceof String);
  }

  isEmptyString(i){
    if(!this.isString(i)) {// /^(undefined|boolean|object|number|function)/.exec(typeof i)
      return false;
    } else {
      return (!i.replace(/\s/g, '').length);
    }
  }

  isEmptyCart () {
    return (
      !window.localStorage.cart_storage ||
      window.localStorage.cart_storage === '[]'
    );
  }

  numbers (i) {
    let rx = new RegExp(this.numbersrx);
    if (this.isNumber(i)) {
      return true;
    } else if (this.isString(i)) {
      return rx.test(i);
    } else {
      return false;
    }
  }

  letters (i) {
    let rx = new RegExp(this.lettersrx, 'i');
    if (this.isString(i)) {
      return rx.test(i);
    } else {
      return false;
    }
  }

  text (i) {
    let rx = new RegExp(this.textrx);
    if (this.isString(i)) {
      return rx.test(i);
    } else {
      return false;
    }
  }

  eMail(i) {
    let rx = new RegExp(this.emailrx);
    if (this.isString(i)) {
      return rx.test(i);
    } else {
      return false;
    }
  }

  textInput(i) {
    return (!this.isEmptyString(i) && this.text(i));
  }

  emailInput(i) {
    return (!this.isEmptyString(i) && this.eMail(i));
  }

  addressInput(i) {
    const {
      fname,
      lname,
      address,
      zip,
      city,
      //country,
      //invoiceAddr,
      fnameInvoice,
      lnameInvoice,
      addressInvoice,
      zipInvoice,
      cityInvoice,
      countryInvoice,
      email,
    } = i;
    const invoiceAddr = false;
    console.log('addressInput()', email, this.emailInput(email));
    console.log('addressInput()', 'fname', this.textInput(fname));
    console.log('addressInput()', 'lname', this.textInput(lname));
    console.log('addressInput()', 'address', this.textInput(address));
    console.log('addressInput()', 'zip', this.textInput(zip));
    if(
      this.emailInput(email) &&
      this.textInput(fname) &&
      this.textInput(lname) &&
      this.textInput(address) &&
      this.textInput(zip) &&
      this.textInput(city) //&&
      //this.textInput(country)
    ) {
      if (invoiceAddr) {
        console.log('addressInput()', 'checking invoice address');
        if(
          this.textInput(fnameInvoice) &&
          this.textInput(lnameInvoice) &&
          this.textInput(addressInvoice) &&
          this.textInput(zipInvoice) &&
          this.textInput(cityInvoice) &&
          this.textInput(countryInvoice)
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  cart(i) {
    return true;
  }
}

const validate = new Validate();
export default validate;
