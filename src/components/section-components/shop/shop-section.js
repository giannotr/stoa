import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { classnames, formatcash } from '../../../backend/js/shop.config';
import cartStorage from '../../../backend/js/shop.cartstorage';
import { Quote } from '../../building-blocks/base-components';
import './shop-section.css';
import '../../../App.css';

class ShopSection extends React.Component {
  constructor(){
    super();
    this.state = {
      catalogue: {
        audio: [],
        print: [],
      },
      selected: {},
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get('data/catalogue.json', {
      responseType: 'json'
    }).then(response => {
      this.setState({
        catalogue: response.data,
      });
    });
    /*
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        this.setState({ catalogue: JSON.parse(this.responseText) });
      }
    };
    xhttp.open('GET', 'data/catalogue.json', true);
    xhttp.send();
    */
  }
  
  handleClick(e) {
    this.setState({
      selected: {
        id:       e.target.dataset.id,
        name:     e.target.dataset.name,
        price:    e.target.dataset.price,
        oldprice: e.target.dataset.oldprice,
        discount: e.target.dataset.discount,
        img:      e.target.dataset.img,
        details:  e.target.dataset.details,
      }
    });
    window.detailsDivision.toggleHandler();
    //window.mainInterface.handleNavToggleVisibility();
  }
  
  render() {
    return(
      <React.Fragment>
        <section id='shop' className='container static shop-section'>
          <Quote
            phrase='Der Grund, warum wir zwei Ohren und nur einen Mund haben: Damit wir mehr zuhören und weniger plaudern.'
            source='Zenon von Kition'
          />
          <h2>Shop</h2>
          <div className='shop-shelf'>
            {this.state.catalogue['audio'].map(item => 
              <ShelfItem
                key={item.id}
                id={item.id}
                name={item.artist+': '+item.title}
                price={item.price}
                discount={item.discount}
                img={item.img}
                imgDetails={item.imgDetails}
                onClick={this.handleClick}
              >
                {'<p>'+item.details.join('</p><p>')+'</p>'}
              </ShelfItem>
            )}
          </div>
        </section>
        <DetailsDivision
          selected={this.state.selected}
          ref={(ref) => {window.detailsDivision = ref}}
        />
      </React.Fragment>
    );
  }
}

function ShelfItem (props) {
  let id         = props.id;
  let name       = props.name;
  let discount   = props.discount;
  let price      = discount ? (1-discount)*props.price : props.price;
  let oldprice   = discount ? props.price : null;
  let img        = props.img;
  let imgDetails = props.imgDetails;
  return(
    <div className='shelf-item'>
      <div
        className='background'
        style={{backgroundImage: 'url('+img+')'}}>
      </div>
      <ul className='shelf-item-caption'>
        <li className='colored-strong'>{name}</li>
        <li className='big-bold-white'>
          {formatcash(price)}
          {discount &&
            <span
              style={{
                fontSize: '.85em',
                fontWeight: '350',
                textDecoration: 'line-through',
                marginLeft: '10px',
              }}
            >
              {formatcash(oldprice)}
            </span>
          }
        </li>
      </ul>
      {discount &&
        <div className='discount'>
          {'-' + discount * 100 + '%'}
        </div>
      }
      <button
        data-id={id}
        data-name={name}
        data-price={price}
        data-oldprice={oldprice}
        data-discount={discount}
        data-img={imgDetails}
        data-details={props.children}
        onClick={props.onClick}
      ></button>
    </div>
  );
}

class DetailsDivision extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false,
    }
    this.toggleHandler = this.toggleHandler.bind(this);
  }
  
  toggleHandler() {
    this.state.expanded ?
      (document.body.style.overflow = 'auto'):
      (document.body.style.overflow = 'hidden');
    /*
    if(this.state.expanded) {
      document.body.style.overflow = 'auto';
      window.mainInterface.handleNavToggleVisibility();
    } else {
      document.body.style.overflow = 'hidden';
      window.addItem.resetHandler();
    }
    */
    this.setState({ expanded: !this.state.expanded });
    
  }

  closeHandler() {
    this.setState({ expanded: false });
    document.body.style.overflow = 'auto';
  }
  
  render() {
    let id       = this.props.selected.id;
    let name     = this.props.selected.name;
    let price    = this.props.selected.price;
    let oldprice = this.props.selected.oldprice;
    let details  = this.props.selected.details;
    let img      = this.props.selected.img;
    let imgSrc   = this.state.expanded ? img : '';// flush out images of the previous lifecycles
    let wrapper  = 'details-division' + (this.state.expanded ? ' expanded' : ' collapsed');
    let inner    = 'details-panel'    + (this.state.expanded ? ' expanded' : ' collapsed');
    return(
      <DetailsDivisionPortal>
        <div className={wrapper}>
          <div className={inner}>
            <div className='details-content-grid'>
              <div className='details-side left wrap'>
                <img src={imgSrc} alt={name} />
              </div>
              <div className='details-side right top'>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    borderBottom: '1.4px #d0dfe2 solid',
                  }}
                >
                  <h5 className='details-title'>
                    <span className='colored-strong'>{name}</span><br />
                    <span>{formatcash(price)}</span>
                    &nbsp;
                    <span
                      style={{
                        display: oldprice === undefined ? 'none' : 'inline-block',
                        textDecoration: 'line-through',
                        fontSize: '85%',
                        fontWeight: '300',
                      }}
                    >
                      {formatcash(oldprice)}
                    </span>
                  </h5>
                  <button
                    className='details-close'
                    style={{outline: '0'}}
                    aria-label='Close'
                    onClick={this.toggleHandler}
                  >
                    <svg viewBox='-10 -10 50 50'>
                      <path
                        d='M31.106,15H3.278l8.325-8.293 
                          c0.391-0.391,0.391-1.024,
                          0-1.414c-0.391-0.391-1.024-0.391-1.414,
                          0l-9.9,9.899c-0.385,0.385-0.385,1.029,
                          0,1.414l9.9,9.9 c0.391,0.391,1.024,
                          0.391,1.414,0c0.391-0.391,
                          0.391-1.024,0-1.414L3.278,
                          17h27.828c0.552,0,1-0.448,
                          1-1 C32.106,15.448,31.658,15,31.106,15z'
                      />
                      <g /><g /><g /><g /><g /><g />
                    </svg>
                  {/*
                    <svg
                      viewBox='0 0 64 64'
                      enableBackground='new 0 0 64 64'
                      style={{
                        width: '32px',
                        height: '32px',
                        padding: '8px 0 0 0 ',
                      }}>
                      <g>
                        <path
                          d='M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59
                              c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59
                              c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0
                              L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z'
                        />
                      </g>
                    </svg>
                  */}
                  </button>
                </div>
              </div>
              <div
                className='details-side right bottom'
                style={{display: 'block'}}
              >
                <div dangerouslySetInnerHTML={{ __html: details }}></div>
                <div className='btn-section'>
                  <AddItem
                    id={String(id)}
                    qty={1}
                    price={Number(price)}
                    name={String(name)}
                    ref={(ref) => {window.addItem = ref}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DetailsDivisionPortal>
    );
  }
}

function DetailsDivisionPortal({children}) {
  return ReactDOM.createPortal(
    children,
    document.getElementById('details-root')
  );
};

class AddItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      clicked: false,
    }
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  clickHandler() {
    this.setState({
      clicked: true,
    });
    cartStorage.add(
      this.props.id,
      this.props.qty,
      this.props.price,
      this.props.name
    );
    window.detailsDivision.toggleHandler();
  }
  
  resetHandler() {
    this.setState({
      clicked: false,
    });
  }

  render() {
    let btn = classnames.buttonPrimary
            + (!this.state.clicked ? ' btn-collapse' : ' btn-collapse-clicked');
    return(
      <div style={{width: 'fit-content', margin: 'auto'}}>
        <button
          onClick={this.clickHandler}
          className={btn}
          style={{outline: '0'}}
        >
          In den Einkaufswagen
        </button>
        {/*
        <AddItemResponse>
          <div
            className={ this.state.clicked ? 'pulsate-fast' : '' }
            style={{
              position: 'fixed',
              top: '12.5px',
              right: '16.5px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'transparent',
              pointerEvents: 'none',
              zIndex: '1100',
            }}>
          </div>
        </AddItemResponse>
        */}
      </div>
    );
  }
}

/*
function AddItemResponse({children}) {  
  return ReactDOM.createPortal(
    children,
    document.querySelector('#add-item-response-root')
  );
};
*/

export default ShopSection;
