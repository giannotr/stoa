import React from 'react';
import axios from 'axios';
import ShoppingModal from './shopping-modal';
import logo from '../../logo.svg';
import navIconset from './nav-iconset.svg';
import './main-interface.css';

class MainInterface extends React.Component {
  constructor() {
    super();
    this.state = {
      navItems: [
        {
          'caption': '',
          'iconsrc': '',
          'svgpath': '',
          'destination': '#',
        },
      ],
      pageTop: true,
      navActive: false,
      modalActive: false,
      navToggleVisible: true,
      //articles: JSON.parse(window.localStorage.cart_storage),
    }
  }

  handleNavToggle = () => {
    this.setState({
      navActive: !this.state.navActive,
    });
    /*
    this.state.navActive ?
      document.body.style.overflow = 'auto' :
      document.body.style.overflow = 'hidden';
    */
  }

  handleNavClose = () => {
    this.setState({
      navActive: false,
    });
    //document.body.style.overflow = 'auto';
  }

  handleModalToggle = () => {
    this.setState({
      modalActive: !this.state.modalActive,
      //articles: JSON.parse(window.localStorage.simpleCart_items),
    })
    //window.cartContent.syncCartWithStorage();
    //window.shoppingModal.resetModal();
  }

  handleModalClose = () => {
    this.setState({
      modalActive: false,
    })
  }

  handleNavToggleVisibility = () => {
    this.setState({
      navToggleVisible: !this.state.navToggleVisible,
    });
  }

  checkScroll = () => {
    const scroll = document.getElementById('app-content').scrollTop;
    const offset = 100;
    const pageTop = scroll <= offset ? true : false;
    this.setState({
      pageTop,
    });
  }

  componentDidMount() {
    document.getElementById('app-content').addEventListener(
      'scroll', this.checkScroll, false
    );
    axios.get('data/nav.json', {
      responseType: 'json',
    }).then(response => {
      this.setState({
        navItems: response.data,
      });
    });
  }

  componentWillUnmount() {
    document.getElementById('app-content').removeEventListener(
      'scroll', this.checkScroll, false
    );
  }

  render() {
    const {
      pageTop,
      navActive,
      modalActive,
      navItems
    } = this.state;
    const className = `main-interface ${pageTop ? '' : 'scrolled'}`
    return(
      <div className={className}>
        <Logo pageTop={pageTop}>
          <a href='/'><img src={logo} alt='stoa-logo' /></a>
        </Logo>
        <Controls>
          <NavToggle
            navActive={navActive}
            toggleHandler={this.handleNavToggle}
          />
          <ModalToggle
            modalActive={modalActive}
            toggleHandler={this.handleModalToggle}
          />
        </Controls>
        <Nav
          items={navItems}
          icons={navIconset}
          active={navActive}
          closeHandler={this.handleNavClose}
        />
        <ShoppingModal
          active={modalActive}
          toggleHandler={this.handleModalToggle}
          closeHandler={this.handleModalClose}
          //ref={(ref) => {window.shoppingModal = ref}}
        />
      </div>
    ); 
  }
}

function Logo(props) {
  const { pageTop, children } = props;
  const className = `logo ${pageTop ? '' : 'scrolled'}`;
  return(
    <div className={className}>{children}</div>
  );
}

function Controls (props) {
  return(
    <div className='controls'>{props.children}</div>
  );
}

function NavToggle(props) {
  const { navActive, toggleHandler } = props;
  let className = `burger-menu + ${navActive ? 'toggled' : ''}`;
  return(
    <button
      className={className}
      onClick={toggleHandler}
    ></button>
  );
}
/*
function NavToggle(props) {
  let toggleActive = props.navActive ? 'toggle-active' : '';
  let svgPath = !props.navActive ?
    'M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z' :
    'M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z';
  return(
    <button className='toggle' onClick={props.toggleHandler}>
      <svg className={toggleActive} viewBox='0 0 24 24'>
        <path d={svgPath} />
      </svg>
    </button>
  );
}
*/
function ModalToggle(props) {
  let toggleActive = props.modalActive ? 'toggle-active' : '';
  let svgPath = !props.modalActive ?
    'M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z' :
    'M16 6v-2c0-2.209-1.791-4-4-4s-4 1.791-4 4v2h-5v18h18v-18h-5zm-7-2c0-1.654 1.346-3 3-3s3 1.346 3 3v2h-6v-2zm10 18h-14v-14h3v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h3v14z';
  return(
    <button className='toggle' onClick={props.toggleHandler}>
        <svg className={toggleActive} viewBox='0 0 24 24'>
          <path d={svgPath} />
        </svg>
    </button>
  );
}
/*
function ModalToggle(props) {
  let classname = 'shopping-cart'
                + (props.modalActive ? ' toggled' : '');
  return(
    <button className={classname} onClick={props.toggleHandler}>
      <span className='handle'></span>
      <span className='outer'></span>
      <span className='inner'></span>
      <span className='wheels'></span>
    </button>
  );
}
*/

/*
const CheckoutToggle = props => {
  let toggleActive = props.cartActive ? 'toggle-active' : '';
  let svgPath = !props.cartActive ?
    'M8.503 5c-.258-1.675.039-3.562 1.228-5h7.259c-.522.736-1.768 2.175-1.391 5h-1.154c-.147-1.336.066-2.853.562-4h-4.726c-.665 1.003-.89 2.785-.656 4h-1.122zm8.124-1v.675c0 .732-.583 1.325-1.304 1.325h-6.646c-.72 0-1.303-.593-1.303-1.325v-.675h-2.374v20h14v-20h-2.373zm.373 18h-10v-14h10v14zm-1-13h-8v4h8v-4zm-6 7h-2v1h2v-1zm3 0h-2v1h2v-1zm3 0h-2v1h2v-1zm-6-2h-2v1h2v-1zm3 0h-2v1h2v-1zm3 0h-2v1h2v-1zm-6 4h-2v1h2v-1zm3 0h-2v1h2v-1zm3 0h-2v1h2v-1zm0 2h-2v1h2v-1zm-6 0h-2v1h2v-1zm3 0h-2v1h2v-1z' :
    'M8.502 5c-.257-1.675.04-3.562 1.229-5h7.259c-.522.736-1.768 2.175-1.391 5h-1.154c-.147-1.336.066-2.853.562-4h-4.725c-.666 1.003-.891 2.785-.657 4h-1.123zm10.498-1v20h-14v-20h2.374v.675c0 .732.583 1.325 1.302 1.325h6.647c.721 0 1.304-.593 1.304-1.325v-.675h2.373zm-9 17h-2v1h2v-1zm0-2h-2v1h2v-1zm0-2h-2v1h2v-1zm3 4h-2v1h2v-1zm0-2h-2v1h2v-1zm0-2h-2v1h2v-1zm3 4h-2v1h2v-1zm0-2h-2v1h2v-1zm0-2h-2v1h2v-1zm-6-2h-2v1h2v-1zm3 0h-2v1h2v-1zm3 0h-2v1h2v-1zm1-7h-10v5h10v-5z';
  return(
    <button className='toggle' onClick={props.toggleHandler}>
        <svg className={toggleActive} viewBox='0 0 24 24'>
          <path d={svgPath} />
        </svg>
    </button>
    
  );
}
*/

function Nav(props) {
  const { active, closeHandler, items, icons } = props;
  const className = `nav ${active ? 'nav-active': ''}`;
  return(
    <div className={className}>
      <div className='nav-items-container'>
        <div className='nav-items'>
          {items.map(item =>
            <NavItem
              key={item.caption}
              caption={item.caption}
              destination={item.destination}
              iconcoordinates={item.iconcoordinates}
              icons={icons}
              closeHandler={closeHandler}
            />
          )}
        </div>
        <NavCollapse closeHandler={closeHandler} />
      </div>
    </div>
  );
}
function NavItem(props) {
  const { destination, closeHandler, caption, icons, iconcoordinates } = props;
  const src = `${icons}#svgView(viewBox(${iconcoordinates}))`;
  return(
    <a href={destination} onClick={closeHandler}>
      <div>
        <span>
          <img className="nav-icon" src={src} />
        </span>
        <span>{caption}</span>
      </div>
    </a>
  );
}
function NavCollapse(props) {
  return(
    <button className='nav-collapse' onClick={props.closeHandler}>
      <svg viewBox='0 0 24 24' fillRule='evenodd' clipRule='evenodd'>
        <path
          d='M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479
            9-.764.646-6.236-7.53v21.884h-1v-21.883z'
        />
      </svg>
    </button>
  );
}

export default MainInterface;
