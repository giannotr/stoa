import React from 'react';
import { findDOMNode } from 'react-dom';
import { classnames } from '../../backend/js/shop.config';
import validate from '../../backend/js/shop.validate';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CartContent from './cart-content';
import UserInput from './user-input';
import ShoppingSummary from './shopping-summary';
import './shopping-modal.css';

class ShoppingModal extends React.Component {
  constructor(){// {articlesData}
    super();
    this.state = {
      //articles: {},
      user: {},
      cartActive: false,
      dataActive: false,
      summActive: false,
      notification: null,
    }
    this.userDataCallback = this.userDataCallback.bind(this);
    this.openCart = this.openCart.bind(this);
    this.openData = this.openData.bind(this);
    this.openSummary = this.openSummary.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
    this.toggleData = this.toggleData.bind(this);
    this.toggleSummary = this.toggleSummary.bind(this);
  }

  resetNotification() {
    this.setState({
      notification: null,
    });
  }

  /*
  resetModal() {
    this.resetNotification();
    this.toggleCart();
  }
  */

  userDataCallback(response){
    this.setState({
      user: response
    }, () => {
      if(JSON.stringify(this.state.user) !== '{}') {
        this.openSummary();
        this.resetNotification();
      } else {
        this.setState({
          notification: 'Bitte überprüfen Sie Ihre Daten.',
        });
        findDOMNode(this).scrollTop = 0;
      }
    });
  }

  openCart() {
    this.setState({
      cartActive: true,
      dataActive: false,
      summActive: false,
    });
    this.resetNotification();
  }

  openData() {
    this.setState({
      cartActive: false,
      dataActive: true,
      summActive: false,
    });
    this.resetNotification();
  }

  openSummary() {
    this.setState({
      cartActive: false,
      dataActive: false,
      summActive: true,
    });
    this.resetNotification();
  }
  
  toggleCart() {
    this.openCart();
  }

  toggleData() {
    if(!validate.isEmptyCart()) {
      this.openData();
    } else {
      this.setState({
        notification: undefined,
      });
    }
  }
  
  toggleSummary() {
    window.cartSummary.syncCartSummaryWithStorage();
    window.userInput.handleSubmit();
  }

  /*
  componentWillReceiveProps({articlesData}) {
    this.setState({
      articles: {...this.state.articles,articlesData}
    });
  }
  */

  componentDidMount() {
    this.toggleCart();
  }
  
  render() {
    return(
      <Modal
        isOpen={this.props.active}
        toggle={this.props.toggleHandler}
        className='shopping-modal'
      >
        <Cart
          active={this.state.cartActive}
          notification={this.state.notification}
          closeHandler={this.props.closeHandler}
          proceedHandler={this.toggleData}
        />
        <Data
          active={this.state.dataActive}
          notification={this.state.notification}
          proceedHandler={this.toggleSummary}
          returnHandler={this.toggleCart}
          dataCallback={this.userDataCallback}
        />
        <Summary
          active={this.state.summActive}
          proceedHandler={this.checkout}
          returnHandler={this.toggleData}
          user={this.state.user} />
        {null && <div id='modalNotification'><div><span>{this.state.notification}</span></div></div>}
      </Modal>
    );
  }
}

class Cart extends React.Component {
  /*
  constructor(props){//, articles
    super(props);
    //this.state = { articles }
  }
  */
  
  /*
  componentWillReceiveProps({articles}) {
    this.setState({...this.state,articles});
  }
  */

  render(){
    return(
      <div style={{display: this.props.active ? 'block' : 'none'}}>
        <ModalHeader>
          Ihr Einkaufswagen
        </ModalHeader>
        <ModalBody className={classnames.modalBody}>
          <CartContent
            notification={this.props.notification}
            closeHandler={this.props.closeHandler}
            ref={(ref) => {window.cartContent = ref}}
          />
        </ModalBody>
        <ModalFooter className={classnames.modalFooter}>
          <ModalButtons>
            <CloseButton
              className={classnames.buttonSecondary}
              closeHandler={this.props.closeHandler}
            >
              Schließen
            </CloseButton>
            <MoveButton
              className={classnames.buttonPrimary}
              moveHandler={this.props.proceedHandler}
            >
              Zur Kasse
            </MoveButton>
          </ModalButtons>
          <ProgressBar step={1} />
        </ModalFooter>
      </div>
    );
  }
}

function Data(props) {
  return(
    <div style={{display: props.active ? 'block' : 'none'}}>
      <ModalHeader>
        Ihre Adressdaten
      </ModalHeader>
      <ModalBody className={classnames.modalBody}>
        <UserInput
          dataCallback={props.dataCallback}
          notification={props.notification}
          ref={(ref) => {window.userInput = ref}}
        />
      </ModalBody>
      <ModalFooter className={classnames.modalFooter}>
        <ModalButtons>
          <MoveButton
            className={classnames.buttonSecondary}
            moveHandler={props.returnHandler}
          >
            Zurück
          </MoveButton>
          <MoveButton
            className={classnames.buttonPrimary}
            moveHandler={props.proceedHandler}
          >
            Bezahlen
          </MoveButton>
        </ModalButtons>
        <ProgressBar step={2} />
      </ModalFooter>
    </div>
  );
}

function Summary(props) {
  return(
    <div style={{display: props.active ? 'block' : 'none'}}>
      <ModalHeader>
        Zusammenfassung
      </ModalHeader>
      <ModalBody className={classnames.modalBody}>
        <ShoppingSummary user={props.user} />
      </ModalBody>
      <ModalFooter className={classnames.modalFooter}>
        <ModalButtons>
          <MoveButton
            className={classnames.buttonSecondary}
            moveHandler={props.returnHandler}
          >
            Zurück
          </MoveButton>
          <MoveButton
            className={classnames.buttonPrimary}
            moveHandler={props.proceedHandler}
          >
            Jetzt kaufen
          </MoveButton>
        </ModalButtons>
        <ProgressBar step={3} />
      </ModalFooter>
    </div>
  );
}

/*
class Checkout extends React.Component {
  render() {
    return(
      <ModalContent active={this.props.active}>
        <ModalHeader>
          Vielen Dank für Ihre Bestellung!
        </ModalHeader>
        <ModalBody>
          Sie werden nun zum Bezahlen weitergeleitet...
        </ModalBody>
        <ModalFooter>
          <ProgressBar step={null} />
        </ModalFooter>
      </ModalContent>
    );
  }
}
*/

function ModalButtons(props) {
  return(
    <div className='shopping-modal-buttons'>
      {props.children}
    </div>
  );
}
function CloseButton(props) {
  return(
    <button
      type='button'
      className={props.className}
      style={props.style}
      onClick={props.closeHandler}
      aria-label='Close'
    >
      {props.children}
    </button>
  );
}
//TODO: cursor: not-allowed (validate.isEmptyCart ?)
function MoveButton(props) {
  return(
    <button
      id={props.id}
      className={props.className}
      onClick={props.moveHandler}
    >
      {props.children}
    </button>
  );
}

// TODO: is-active --> active
function ProgressBar(props) {
  return(
    <div className='shopping-progress'>
        <ul className='list-unstyled multi-steps'>
        <li className={props.step === 1 ? 'is-active' : '__empty__'}></li>
        <li className={props.step === 2 ? 'is-active' : '__empty__'}></li>
        <li className={props.step === 3 ? 'is-active' : '__empty__'}></li>
        </ul>
    </div>
  );
}

export default ShoppingModal;
