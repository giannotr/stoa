import React from 'react';
//import { classnames } from '../../backend/js/shop.config';
import validate from '../../backend/js/shop.validate';
//import { textblocks } from '../../backend/js/shop.config';
import './base-components.css';
//import '../App.css';

export function ContentArea(props) {
  return(
    <div className='content-area'>
      {props.children}
    </div>
  );
}

export function FullWidthBlock(props) {
  const { title, children, blockstyle, titlestyle, contentstyle } = props;
  return(
    <div className="full-width" style={blockstyle}>
      <div className="title" style={titlestyle}>{title}</div>
      <div className="content" style={contentstyle}>{children}</div>
    </div>
  );
}

export function Panels(props) {
  return(
    <div className="panels-wrapper">
      {props.children}
    </div>
  );
}
export function PanelsItem(props) {
  return(
    <div className="panel">
      {props.children}
    </div>
  );
}

export const Overlay = (props) => {
  const { children, active } = props;
  const className = `overlay ${active ? 'active' : 'inactive'}`
  return(
    <div className={className}>{children}</div>
  );
}

export const ButtonGroup = (props) => {
  const { children } = props;
  return(
    <div className="button-container-outer">
      <div className="button-container-inner">
        {children}
      </div>
    </div>
  );
}
export const Button = (props) => {
  const { onClick, content, theme } = props;
  const className = `button-wrapper ${theme ? theme : ''}`
  return(
    <div className={className}>
      <button onClick={onClick}>
        {content}
      </button>
    </div>
  );
}

export const Toggle = (props) => {
  const { caption, onChange, flag } = props;
  const className = `toggle-wrapper ${flag ? 'toggled' : ''}`
  return(
    <div className={className}>
      <div className="toggle">
        <input type="checkbox" onChange={onChange}/>
        <label></label>
      </div>
      <div className="caption">{caption}</div>
    </div>
  );
}

export const Form = (props) => {
  const { children } = props;
  return(
    <div className="form-wrapper">
      {children}
    </div>
  );
}

export class Input extends React.Component {
  constructor(props){
    super(props);
    this.initialState = {
      value: '',
      wasUsed: false,
      isEmptySubmit: false,
    }
    this.state = this.initialState;
  }
  
  handleChange = (e) => {
    const { name, value } = e.target;
    const wasUsed = true;
    this.setState({ value, wasUsed });
    this.props.parentChange(name, value);
  }
  
  componentWillReceiveProps(newProps) {
    if(newProps !== this.props) {
      const { submitStatus } = newProps;
      if(submitStatus === 'checking') {
        if(!this.state.value && this.props.required) {
          this.setState({ isEmptySubmit: true });
        } 
      } else if(submitStatus === 'success') {
        this.setState(this.initialState);
      }
    }
  }

  render() {
    const { type, name, label, required } = this.props;
    const { value, wasUsed, isEmptySubmit } = this.state;
    const className = `input-wrapper
      ${wasUsed ? 'used-input' : ''}
      ${isEmptySubmit ? 'empty-input' : ''}
    `;
    return(
      <div className={className}>
        {type === 'textarea' ? 
          <InputArea
            name={name}
            label={label}
            value={value}
            onChange={this.handleChange}
            required={required}
          />
        :
          <InputField
            type={type}
            name={name}
            label={label}
            value={value}
            onChange={this.handleChange}
            required={required}
          />
        }
      </div>
    );
  }
}

export const InputField = (props) => {
  const {
    type,
    name,
    label,
    value,
    onChange,
    required
  } = props;
  const labelclassName = value ? 'input-not-empty' : '';
  return(
    <React.Fragment>
      <input
        name={name}
        type={type}
        value={value}
        pattern={validate[`${type}rx`]}
        onChange={onChange}
        required={required}
      />
      <label htmlFor={name} className={labelclassName}>{label}</label>
    </React.Fragment>
  );
}

export const InputArea = (props) => {
  const {
    name,
    label,
    value,
    onChange,
    required
  } = props;
  const className = value ? 'textarea-not-empty' : '';
  return(
    <textarea
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      required={required}
      className={className}
    ></textarea>
  );
}

export const Submit = (props) => {
  const { content, onClick, isSubmitting } = props;
  const className = `button-wrapper ${isSubmitting ? 'animated' : ''}`;
  return(
    <div className={className}>
      <button onClick={onClick}>
        {content}
      </button>
    </div>
  );
}

/*
export function InputField(props) {
  return(
    <div>
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        required={props.required}
        pattern={props.pattern}
        placeholder=' '
        onChange={props.onChange} />
      <label htmlFor={props.id}>{props.label}</label>
      {props.children && <div className="requirements">{props.children}</div>}
    </div>
  );
}
export function InputText(props) {
  return(
    <InputField
      type='text'
      id={props.id}
      label={props.label}
      required={props.required}
      onChange={props.onChange}
      pattern={String(validate.textrx)}>
        Verwenden Sie bitte nur Buchstaben, Zahlen, . oder -
    </InputField>
  );
}
export function InputEmail(props) {
  return(
    <InputField
      type='email'
      id={props.id}
      label={props.label}
      required={props.required}
      onChange={props.onChange}
      pattern={String(validate.emailrx)}>
        Geben Sie bitte eine gültige E-Mail-Adresse ein.
    </InputField>
  );
}
export function InputMessage(props) {
  return(
    <textarea
      id={props.id}
      label={props.label}
      placeholder={props.label}
      required={props.required}
    />
  );
}
export function SelectCountry(props) {
  return(
    <select id={props.id} name={props.id} onChange={props.onChange}>
      <option value=''>Bitte auswählen...</option>
      <option value={textblocks.germany}>{textblocks.germany}</option>
      <option value={textblocks.austria}>{textblocks.austria}</option>
      <option value={textblocks.switzerland}>{textblocks.switzerland}</option>
    </select>
  );
}
*/
export function Checkbox(props) {
  const { id, caption } = props;
  return(
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        id={id}
        name={id}
        value={id}
      />
      <span>{caption}</span>
    </div>
  );
}

export function Quote(props) {
  const { phrase, source } = props;
  return(
    <div className="quote-wrapper">
      <div className="quote-symbol">
      <svg viewBox="0 0 24 24">
        <path
          d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163
            3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199
            4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984
            2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149
            0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"
        />
      </svg>
      </div>
      <div className="quote-phrase">{phrase}</div>
      <div className="quote-source">{source}</div>
    </div>
  );
}
