import React from 'react';
//import { findDOMNode } from 'react-dom';
import { classnames } from '../../backend/js/shop.config';
import validate from '../../backend/js/shop.validate';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CartContent from './cart-content';
import UserInput from './user-input';
import ShoppingSummary from './shopping-summary';
import './shopping-modal.css';

class ShoppingModal extends React.Component {
  constructor(props){// {articlesData}
    super(props);
    this.state = {
      //articles: {},
      user: {},
      cartActive: false,
      dataActive: false,
      summActive: false,
      notification: null,
    }
  }

  resetNotification = () => {
    this.setState({
      notification: null,
    });
  }

  /*
  resetModal = () => {
    this.resetNotification();
    this.toggleCart();
  }
  */

  userDataCallback = (response) => {
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
        //findDOMNode(this).scrollTop = 0;
      }
    });
  }

  openCart = () => {
    this.setState({
      cartActive: true,
      dataActive: false,
      summActive: false,
    });
    this.resetNotification();
  }

  openData = () => {
    this.setState({
      cartActive: false,
      dataActive: true,
      summActive: false,
    });
    this.resetNotification();
  }

  openSummary = () => {
    this.setState({
      cartActive: false,
      dataActive: false,
      summActive: true,
    });
    this.resetNotification();
  }
  
  toggleCart = () => {
    this.openCart();
  }

  toggleData = () => {
    if(!validate.isEmptyCart()) {
      this.openData();
    } else {
      this.setState({
        notification: undefined,
      });
    }
  }
  
  toggleSummary = () => {
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
    const { active, toggleHandler, closeHandler } = this.props;
    const {
      cartActive,
      dataActive,
      summActive,
      notification,
      user
    } = this.state;
    return(
      <Modal
        isOpen={active}
        toggle={toggleHandler}
        className='shopping-modal'
      >
        <Cart
          active={cartActive}
          notification={notification}
          closeHandler={closeHandler}
          proceedHandler={this.toggleData}
        />
        <Data
          active={dataActive}
          notification={notification}
          proceedHandler={this.toggleSummary}
          returnHandler={this.toggleCart}
          dataCallback={this.userDataCallback}
        />
        <Summary
          active={summActive}
          proceedHandler={this.checkout}
          returnHandler={this.toggleData}
          user={user} />
        {null && <div id='modalNotification'><div><span>{notification}</span></div></div>}
      </Modal>
    );
  }
}

/* TODO: Cart in stateless componenet refactorn */

const Cart = (props) => {
  const {
    active,
    proceedHandler,
    closeHandler,
    notification
  } = props;
  return(
    <div style={{display: active ? 'block' : 'none'}}>
      <ModalHeader>
        Ihr Einkaufswagen
      </ModalHeader>
      <ModalBody className={classnames.modalBody}>
        <CartContent
          notification={notification}
          closeHandler={closeHandler}
          ref={(ref) => {window.cartContent = ref}}
        />
      </ModalBody>
      <ModalFooter className={classnames.modalFooter}>
        <ModalButtons>
          <CloseButton
            className={classnames.buttonSecondary}
            clickHandler={closeHandler}
            content="Schließen"
          />
          <MoveButton
            className={classnames.buttonPrimary}
            clickHandler={proceedHandler}
            content="Zur Kasse"
          />
        </ModalButtons>
        <ProgressBar step={1} />
      </ModalFooter>
    </div>
  );
}

const Data = (props) => {
  const {
    active,
    dataCallback,
    proceedHandler,
    returnHandler,
    notification
  } = props;
  return(
    <div style={{display: active ? 'block' : 'none'}}>
      <ModalHeader>
        Ihre Adressdaten
      </ModalHeader>
      <ModalBody className={classnames.modalBody}>
        <UserInput
          dataCallback={dataCallback}
          notification={notification}
          ref={(ref) => {window.userInput = ref}}
        />
      </ModalBody>
      <ModalFooter className={classnames.modalFooter}>
        <ModalButtons>
          <MoveButton
            className={classnames.buttonSecondary}
            clickHandler={returnHandler}
            content="Zurück"
          />
          <MoveButton
            className={classnames.buttonPrimary}
            clickHandler={proceedHandler}
            content="Bezahlen"
          />
        </ModalButtons>
        <ProgressBar step={2} />
      </ModalFooter>
    </div>
  );
}

const Summary = (props) => {
  const {
    active,
    user,
    proceedHandler,
    returnHandler
  } = props;
  return(
    <div style={{display: active ? 'block' : 'none'}}>
      <ModalHeader>
        Zusammenfassung
      </ModalHeader>
      <ModalBody className={classnames.modalBody}>
        <ShoppingSummary user={user} />
      </ModalBody>
      <ModalFooter className={classnames.modalFooter}>
        <ModalButtons>
          <MoveButton
            className={classnames.buttonSecondary}
            clickHandler={returnHandler}
            content="Zurück"
          />
          <MoveButton
            className={classnames.buttonPrimary}
            clickHandler={proceedHandler}
            content="Jetzt kaufen"
          />
        </ModalButtons>
        <ProgressBar step={3} />
      </ModalFooter>
    </div>
  );
}

/*
const Checkout = () => {
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
*/

const ModalButtons = (props) => {
  return(
    <div className='shopping-modal-buttons'>
      {props.children}
    </div>
  );
}
const CloseButton = (props) => {
  const { className, style, clickHandler, content } = props;
  return(
    <button
      type="button"
      className={className}
      style={style}
      onClick={clickHandler}
      aria-label="Close"
    >
      {content}
    </button>
  );
}
//TODO: cursor: not-allowed (validate.isEmptyCart ?)
const MoveButton = (props) => {
  const { id, className, clickHandler, content } = props;
  return(
    <button
      id={id}
      className={className}
      onClick={clickHandler}
    >
      {content}
    </button>
  );
}

// TODO: is-active --> active
const ProgressBar = (props) => {
  const className__checkStep = (step) => {
    return props.step === step ? 'is-active' : '';
  }
  return(
    <div className='shopping-progress'>
        <ul className='list-unstyled multi-steps'>
          <li className={className__checkStep(1)}></li>
          <li className={className__checkStep(2)}></li>
          <li className={className__checkStep(3)}></li>
        </ul>
    </div>
  );
}

export default ShoppingModal;
