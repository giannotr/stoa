import React from 'react';
import validate from '../../backend/js/shop.validate';
import { textblocks } from '../../backend/js/shop.config';
import { Form, Input, Toggle } from '../building-blocks/base-components';
import './user-input.css';

// TODO: abstract and integrate textblocks
// TODO: reset Input Component classnames when Data Component updates its state to active
class UserInput extends React.Component {
  constructor(props){
    super(props);
    this.inputFieldsMain = [
      {name: 'fname', label: textblocks.fname},
      {name: 'lname', label: textblocks.lname},
      {name: 'address', label: textblocks.address},
      {name: 'zip', label: textblocks.zip},
      {name: 'city', label: textblocks.city},
      {name: 'country', label: textblocks.country},
    ];
    this.inputFieldsInvoice = [
      {name: 'fnameInvoice', label: textblocks.fname},
      {name: 'lnameInvoice', label: textblocks.lname},
      {name: 'addressInvoice', label: textblocks.address},
      {name: 'zipInvoice', label: textblocks.zip},
      {name: 'cityInvoice', label: textblocks.city},
      {name: 'countryInvoice', label: textblocks.country},
    ];
    this.inputFields = [...this.inputFieldsMain, ...this.inputFieldsInvoice];
    this.inputValuesInitial = {}
    this.inputFields.forEach((field) => {
      this.inputValuesInitial[field.name] = '';
    });
    this.state = {
      ...this.inputValuesInitial,
      isInvoiceAddress: false,
      submitStatus: 'idle',
    }
  }
  
  handleChange = (key, val) => {
    this.setState({ [key]: val });
  }

  handleToggle = () => {
    this.setState({ isInvoiceAddress: !this.state.isInvoiceAddress });
  }

  validateInput = (fname, lname, address, zip, city, country) => {
    return Boolean(
      validate.textInput(fname) &&
      validate.textInput(lname) &&
      validate.textInput(address) &&
      validate.textInput(zip) &&
      validate.textInput(city) &&
      validate.textInput(country)
    );
  }
  
  handleSubmit = () => {
    this.setState({ submitStatus: 'checking' });
    //TODO: sanitize input before submitting
    const {
      fname,
      lname,
      address,
      zip,
      city,
      country,
      fnameInvoice,
      lnameInvoice,
      addressInvoice,
      zipInvoice,
      cityInvoice,
      countryInvoice,
      email,
      isInvoiceAddress
    } = this.state;

    const isValidMainAddress = this.validateInput(
      fname, lname, address, zip, city, country
    );

    const isValidInvoiceAddress = this.validateInput(
      fnameInvoice,
      lnameInvoice,
      addressInvoice,
      zipInvoice,
      cityInvoice,
      countryInvoice
    );

    const isValidSubmission = validate.emailInput(email) && (
      isValidMainAddress && (
        isInvoiceAddress ? isValidInvoiceAddress : true
      )
    );
    
    const submission = isValidSubmission ? this.state : {};
    this.props.dataCallback(submission);
  }
  
  /* // Probabilly unneeded
  handleReset = () => {
    if(this.state.submitStatus === 'success') {
      this.setState(this.inputValuesInitial);
    }
    this.setState({ submitStatus: 'idle'});
  }
  */

  render() {
    const {
      isInvoiceAddress,
      submitStatus,
    } = this.state;
    return(
      <Form>
        <AddressInput
          items={this.inputFieldsMain}
          handleChange={this.handleChange}
          submitStatus={submitStatus}
          isVisible={true}
        />
        <Input
          type="email"
          name="email"
          label="E-Mail"
          required={true}
          parentChange={this.handleChange}
          submitStatus={submitStatus}
        />
        <Toggle
          caption="Abweichende Rechnungsadresse"
          onChange={this.handleToggle}
          flag={isInvoiceAddress}
        />
        <AddressInput
          items={this.inputFieldsInvoice}
          handleChange={this.handleChange}
          submitStatus={submitStatus}
          isVisible={isInvoiceAddress}
        />
      </Form>
    );
  }
}

const AddressInput = (props) => {
  const { items, handleChange, submitStatus, isVisible } = props;
  const includeCountry = (item) => {
    return item.name.includes('country');
  }
  const excludeCountry = (item) => {
    return !item.name.includes('country');
  }
  const className = `address-input-wrapper ${
    isVisible ? 'expanded' : 'collapsed'
  }`;
  const inputSet = items.filter(excludeCountry).map((item) =>
    <Input
      key={item.name}
      type="text"
      name={item.name}
      label={item.label}
      required={true}
      parentChange={handleChange}
      submitStatus={submitStatus}
    />
  );
  const selectCountry = items.filter(includeCountry).map((item) =>
    <SelectCountry
      key={item.name}
      name={item.name}
      parentChange={handleChange}
      submitStatus={submitStatus}
    />
  );
  return(
    <div className={className}>
      {inputSet}
      {selectCountry}
    </div>
  );
}

class SelectCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  handleChange = (e) => {
    const { name, value} = e.target;
    this.props.parentChange(name, value);
    this.setState({ value });
  }

  render() {
    const { name, submitStatus } = this.props;
    const { value } = this.state;
    const isEmpty = submitStatus === 'checking' && !value ? true : false;
    return(
      <Select name={name} onChange={this.handleChange} isEmpty={isEmpty}>
        <VoidOption />
        <Option value={textblocks.germany} />
        <Option value={textblocks.austria} />
        <Option value={textblocks.switzerland} />
      </Select>
    );
  }
}

/* BEGIN into base-components */

const Select = (props) => {
  const { name, onChange, isEmpty, children } = props;
  const className = `input-wrapper ${isEmpty? 'empty-input' : ''}`;
  return(
    <div className={className}>
      <select name={name} onChange={onChange}>
        {children}
      </select>
    </div>
  );
}

const Option = (props) => {
  const { value } = props;
  return <option value={value}>{value}</option>;
}

const VoidOption = () => {
  return <option value=''>{textblocks.plsSelect}...</option>;
}

/* END into base-components */



/* obsoloete */

/*

class UserInputAlt extends React.Component {
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
  
  handleSubmit = () => {
    const inputFnameElem = document.getElementById('fname');
    const inputLnameElem = document.getElementById('lname');
    const inputAddressElem = document.getElementById('address');
    const inputZipElem = document.getElementById('zip');
    const inputCityElem = document.getElementById('city');

    const inputFnameElem = document.getElementById('fname');
    const inputLnameElem = document.getElementById('lname');
    const inputAddressElem = document.getElementById('address');
    const inputZipElem = document.getElementById('zip');
    const inputCityElem = document.getElementById('city');

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
        </Form>
      </div>
    );
  }
}

*/

export default UserInput;
