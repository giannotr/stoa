import React from 'react';
import validate from '../../backend/js/shop.validate';
import { Form, Input } from '../building-blocks/base-components';
import './user-input.css';

//TODO: outsource more textblocks

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.input = {
      fname: '',
      lname: '',
      address: '',
      zip: '',
      city: '',
      country: '',
      invoiceAddr: false,
      fnameInvoice: '',
      lnameInvoice: '',
      addressInvoice: '',
      zipInvoice: '',
      cityInvoice: '',
      countryInvoice: '',
      email: '',
    };

    this.inputFnameComponent = React.createRef();
    this.inputLnameComponent = React.createRef();
    this.inputAddressComponent = React.createRef();
    this.inputZipComponent = React.createRef();
    this.inputCityComponent = React.createRef();
    this.inputEmailComponent = React.createRef();
    
    this.inputComponentRefs = [
      this.inputFnameComponent,
      this.inputLnameComponent,
      this.inputAddressComponent,
      this.inputZipComponent,
      this.inputCityComponent,
      this.inputEmailComponent,
    ];
  }

  processCheckEmpty = (refList) => {
    refList.forEach((ref) => {
      ref.current.checkEmptySubmission();
    });
  }
  processInputReset = (refList) => {
    refList.forEach((ref) => {
      ref.current.handleInputReset();
    });
  }
  
  //componentDidMount() {
  //  this.setState({
  //    country: germanyStr,
  //    countryInvoice: germanyStr,
  //  });
  //}

  /*
  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
    if (name === 'invoiceAddr' && value === false) {
      this.setState({
        fnameInvoice: '',
        lnameInvoice: '',
        addressInvoice: '',
        zipInvoice: '',
        cityInvoice: '',
        countryInvoice: '',
      });
    }
    //window.shoppingModal.resetNotification();
  }

  validateInput = () => {
    if(
        validate.emailInput(this.state.email) &&
        validate.textInput(this.state.fname) &&
        validate.textInput(this.state.lname) &&
        validate.textInput(this.state.address) &&
        validate.textInput(this.state.zip) &&
        validate.textInput(this.state.city) &&
        validate.textInput(this.state.country)
      ) {
      if (this.state.invoiceAddr) {
        if(
          validate.textInput(this.state.fnameInvoice) &&
          validate.textInput(this.state.lnameInvoice) &&
          validate.textInput(this.state.addressInvoice) &&
          validate.textInput(this.state.zipInvoice) &&
          validate.textInput(this.state.cityInvoice) &&
          validate.textInput(this.state.countryInvoice)
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
  */
  
  handleSubmit = () => {
    const inputFnameElem = document.getElementById('fname');
    const inputLnameElem = document.getElementById('lname');
    const inputAddressElem = document.getElementById('address');
    const inputZipElem = document.getElementById('zip');
    const inputCityElem = document.getElementById('city');
    /*
    const inputFnameElem = document.getElementById('fname');
    const inputLnameElem = document.getElementById('lname');
    const inputAddressElem = document.getElementById('address');
    const inputZipElem = document.getElementById('zip');
    const inputCityElem = document.getElementById('city');
    */
    const inputEmailElem = document.getElementById('email');

    const fname = String(inputFnameElem.value);
    const lname = String(inputLnameElem.value);
    const address = String(inputAddressElem.value);
    const zip = String(inputZipElem.value);
    const city = String(inputCityElem.value);
    const email = String(inputEmailElem.value);

    this.input = { fname, lname, address, zip, city, email }

    if(validate.addressInput(this.input)) {
      this.props.dataCallback(this.input);
    } else {
      this.props.dataCallback({});
    }
  }

  // Invoice address button AUSWECHSELN
  // DRY: onChange...
  // TODO: user-input loswerden
  render() {
    return (
      <div>
        <div style={{width: '100%', marginBottom: '20px'}}>
          {
            this.props.notification === 'Bitte überprüfen Sie Ihre Daten.' ?
              <div className='notification notification-alert'>
                {this.props.notification}
              </div>
            : null
          }
        </div>
        <Form>
          <Input
            type="text"
            name="fname"
            label="Vorname"
            required={true}
            ref={this.inputFnameComponent}
          />
          <Input
            type="text"
            name="lname"
            label="Nachname"
            required={true}
            ref={this.inputLnameComponent}
          />
          <Input
            type="text"
            name="address"
            label="Adresse"
            required={true}
            ref={this.inputAddressComponent}
          />
          <Input
            type="text"
            name="zip"
            label="PLZ"
            required={true}
            ref={this.inputZipComponent}
          />
          <Input
            type="text"
            name="city"
            label="Stadt"
            required={true}
            ref={this.inputCityComponent}
          />
          <Input
            type="email"
            name="email"
            label="E-Mail"
            required={true}
            ref={this.inputEmailComponent}
          />
        {/*
          <InputText id='fname' label='Vorname' onChange={this.handleChange} required />
          <InputText id='lname' label='Nachname' onChange={this.handleChange} required />
          <InputText id='address' label='Straße Hausnr.' onChange={this.handleChange} required />
          <InputText id='zip' label='PLZ' onChange={this.handleChange} required />
          <InputText id='city' label='Stadt' onChange={this.handleChange} required />
          <SelectCountry id='country' onChange={this.handleChange} />
          <InputEmail id='email' label='E-Mail' onChange={this.handleChange} required />
          <div id='invoiceAddrToggle'>
            <input type="checkbox" name='invoiceAddr' value='true' id="invoiceAddr" onChange={this.handleChange} />
            <label htmlFor='invoiceAddr' tabIndex="-1">
              <span className="check"></span>
              Abweichende Rechnungsadresse
            </label>
          </div>
          {this.state.invoiceAddr && <InputText id='fnameInvoice' label='Vorname' onChange={this.handleChange} required />}
          {this.state.invoiceAddr && <InputText id='lnameInvoice' label='Nachname' onChange={this.handleChange} required />}
          {this.state.invoiceAddr && <InputText id='addressInvoice' label='Straße Hausnr.' onChange={this.handleChange} required />}
          {this.state.invoiceAddr && <InputText id='zipInvoice' label='PLZ' onChange={this.handleChange} required />}
          {this.state.invoiceAddr && <InputText id='cityInvoice' label='Stadt' onChange={this.handleChange} required />}
          {this.state.invoiceAddr && <SelectCountry id='countryInvoice' onChange={this.handleChange} />}
        */}
        </Form>
      </div>
    );
  }
}

export default UserInput;
