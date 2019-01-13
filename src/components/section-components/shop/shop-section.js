import React from 'react';
import ReactDOM from 'react-dom';
//import axios from 'axios';
import { classnames, formatcash } from '../../../backend/js/shop.config';
import cartStorage from '../../../backend/js/shop.cartstorage';
import { Quote } from '../../building-blocks/base-components';
import catalogue from './shop-catalogue';
import './shop-section.css';
//import '../../../App.css';

const selected = {}

class ShopSection extends React.Component {
  constructor(){
    super();
    this.state = {
      catalogue,
      selected,
    }
  }

  handleClick = (e) => {
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
    const { catalogue, selected } = this.state;
    const catalogueJoined = [...catalogue.audio, ...catalogue.print];
    return(
      <React.Fragment>
        <section id="shop" className="container static shop-section">
          <Quote
            phrase="Der Grund, warum wir zwei Ohren und nur einen Mund haben: Damit wir mehr zuhören und weniger plaudern."
            source="Zenon von Kition"
          />
          <h2>Shop</h2>
          <div className="shop-shelf">
            {catalogueJoined.map(item =>
              <ShelfItem
                key={item.id}
                id={item.id}
                name={`${item.author}: ${item.title}`}
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
          selected={selected}
          ref={(ref) => {window.detailsDivision = ref}}
        />
      </React.Fragment>
    );
  }
}

const ShelfItem = (props) => {
  const { id, name, price, discount, img, imgDetails } = props;
  const priceDisplay = discount ? (1-discount)*price : price;
  const priceOld = discount ? price : null;
  return(
    <div className="shelf-item">
      <div
        className="background"
        style={{backgroundImage: 'url('+img+')'}}>
      </div>
      <ul className="caption">
        <li className="name">{name}</li>
        <li className="price">
          {formatcash(priceDisplay)}
          {discount &&
            <span className="oldprice">
              {formatcash(priceOld)}
            </span>
          }
        </li>
      </ul>
      {discount &&
        <div className="discount">
          {`-${discount * 100}%`}
        </div>
      }
      <button
        data-id={id}
        data-name={name}
        data-price={priceDisplay}
        data-oldprice={priceOld}
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
  }
  
  toggleHandler = () => {
    const { expanded } = this.state;
    document.body.style.overflow = expanded ? 'auto' : 'hidden';
    this.setState({ expanded: !expanded });
  }

  /*
  closeHandler = () => {
    this.setState({ expanded: false });
    document.body.style.overflow = 'auto';
  }
  */
  
  render() {
    const { id, name, price, oldprice, details, img } = this.props.selected;
    const { expanded } = this.state;
    const imgSrc = expanded ? img : '';// to flush out images of the previous lifecycles
    const className = `details-division ${expanded ? 'expanded' : 'collapsed'}`;
    const classNameInner = `details-panel ${expanded ? 'expanded' : 'collapsed'}`;
    return(
      <DetailsDivisionPortal>
        <div className={className}>
          <div className={classNameInner}>
            <div className="details-grid">
              <div className="details-side left wrap">
                <img src={imgSrc} alt={name} />
              </div>
              <div className="details-side right top">
                <div className="header-wrapper">
                  <h5 className="header">
                    <span className="name">{name}</span>
                    <br />
                    <span>{formatcash(price)}</span>
                    &nbsp;
                    {oldprice &&
                      <span className="oldprice">
                        {formatcash(oldprice)}
                      </span>
                    }
                  </h5>
                  <button
                    className="details-close"
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

const AddItem = (props) => {
  const { id, qty, price, name } = props;
  const handleClick = () => {
    cartStorage.add(id, qty, price, name);
    window.detailsDivision.toggleHandler();
  }
  return(
    <div style={{width: 'fit-content', margin: 'auto'}}>
      <button
        onClick={handleClick}
        className={classnames.buttonPrimary}
        style={{outline: '0'}}
      >
        In den Einkaufswagen
      </button>
    </div>
  );
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
