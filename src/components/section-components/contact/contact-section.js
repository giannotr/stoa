import React from 'react';
import axios from 'axios';
import validate from '../../../backend/js/shop.validate';
import {
  Overlay, ButtonGroup, Button, Form, Input, Checkbox, Submit
} from '../../building-blocks/base-components';
import './contact-section.css';

const ContactSection = () => {
  return(
    <section id='contact' className='container static contact-section'>
      <h2>Kontakt</h2>
      <ContactForm />
    </section>
  );
}

// TODO: import (and use) textblocks
class ContactForm extends React.Component {
  constructor(props){
    super(props);
    this.inputValuesInitial = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
    this.state = {
      ...this.inputValuesInitial,
      submitStatus: 'idle',
    }
  }
  
  validateInput = (name, email, subject, message) => {
    return Boolean(
      validate.textInput(name) &&
      validate.textInput(subject) &&
      validate.emailInput(email) &&
      message !== ''
    );
  }
  
  handleChange = (key, val) => {
    this.setState({ [key]: val });
  }
  
  handleSubmit = () => {   
    this.setState({ submitStatus: 'checking' });
    //TODO: sanitize input before submitting
    const { name, email, subject, message } = this.state;
    const isValidSubmission = this.validateInput(
      name, email, subject, message
    );
    
    if(isValidSubmission) {
      console.log('submission is valid');
      this.setState({
        submitStatus: 'sending',
      });
      
      axios.post(
        'path/to/api/backend/php/mailer.php',
        { name, email, subject, message }
      ).then((response) => {
        console.log(response);
        this.setState({
          submitStatus: 'success',
        });
      }).catch((error) => {
        console.log(error);
        this.setState({
          submitStatus: 'failure',
        });
      });
    } else {
      console.log('submission contains invalid entries');
      console.log('name:', name, validate.textInput(name));
      console.log('subject:', subject, validate.textInput(subject));
      console.log('email:', email, validate.emailInput(email));
      console.log('message:', message, message !== '');
    }
  }
  
  handleReset = () => {
    if(this.state.submitStatus === 'success') {
      this.setState(this.inputValuesInitial);
    }
    this.setState({ submitStatus: 'idle'});
  }

  render() {
    const { submitStatus } = this.state;
    const overlayActive = Boolean(
      submitStatus === 'success' || submitStatus === 'failure'
    );
    return(
      <Form>
        <Overlay active={overlayActive}>
          <SuccessNotification
            active={submitStatus === 'success'}
          />
          <FailureNotification
            achtive={submitStatus === 'failure'}
          />
          <ButtonGroup>
            <Button
              theme="dark"
              onClick={this.handleReset}
              content="Zurück"
            />
          </ButtonGroup>
        </Overlay>
        <Input
          type="text"
          name="name"
          label="Name"
          required={true}
          parentChange={this.handleChange}
          submitStatus={submitStatus}
        />
        <Input
          type="email"
          name="email"
          label="E-Mail"
          required={true}
          parentChange={this.handleChange}
          submitStatus={submitStatus}
        />
        <Input
          type="text"
          name="subject"
          label="Betreff"
          required={true}
          parentChange={this.handleChange}
          submitStatus={submitStatus}
        />
        <Input
          type="textarea"
          name="message"
          label="Nachricht"
          required={true}
          parentChange={this.handleChange}
          submitStatus={submitStatus}
        />
        <Submit
          content="Absenden"
          onClick={this.handleSubmit}
          submitStatus={submitStatus}
        />
      </Form>
    );
  }
}

const notificationStyle = (flag) => {
  return {
    opacity: flag ? '1' : '0',
    width: flag ? '100%' : '0',
    textAlign: 'center',
    color: flag ? 'inherit' : 'transparent',
    transition: 'all .5s',
  }
}

const SuccessNotification = (props) => {
  const { active, overlayActive } = props;
  const displayFlag = active && overlayActive;
  return(
    <div style={notificationStyle(displayFlag)}>
      <p>Thank you for your message!</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
        width="50" height="50"
        fill="#f7f7f7"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path
          d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12
             5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11
             4.929-11 11-11zm7 7.457l-9.005 9.565-4.995-5.865.761-.649
             4.271 5.016 8.24-8.752.728.685z"
        />
      </svg>
    </div>
  );
}

const FailureNotification = (props) => {
  const { active, overlayActive } = props;
  const displayFlag = active && overlayActive;
  return(
    <div style={notificationStyle(displayFlag)}>
      <p>Something went wrong...</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
        width="50" height="50"
        fill="#f7f7f7"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path
          d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12
             5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11
             11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293
             5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707
             5.293-5.293-5.293-5.293.707-.707 5.293 5.293z"
        />
      </svg>
    </div>
  );
}

export default ContactSection;
