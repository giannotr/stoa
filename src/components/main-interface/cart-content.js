import React from 'react';
//import simpleCart from '../assets/simpleCart.min.js'
import cartStorage from '../../backend/js/shop.cartstorage';
import validate from '../../backend/js/shop.validate';
import { formatcash, textblocks } from '../../backend/js/shop.config';
import './cart-content.css';

class CartContent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
    }
    this.deleteArticle = this.deleteArticle.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.reduceQuantity = this.reduceQuantity.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.syncCartWithStorage = this.syncCartWithStorage.bind(this);
  }

  syncCartWithStorage(){
    this.setState({
      articles: JSON.parse(window.localStorage.cart_storage),
    });
  }
  
  deleteArticle(e, id){
    cartStorage.delete(id);
    this.syncCartWithStorage();
  }
  
  setQuantity(e, id) {
    cartStorage.qty(id, Number(e.target.value));
    this.syncCartWithStorage();
  }
  
  reduceQuantity(e, id){
    if(cartStorage.testqty(id, q => {return q > 1})) {
      cartStorage.add(id, -1);
      this.syncCartWithStorage();
    }
  }
  
  incrementQuantity(e, id){
    cartStorage.add(id, 1);
    this.syncCartWithStorage();
  }

  componentDidMount() {
    this.syncCartWithStorage();
  }
  
  render() {
    return(
      validate.isEmptyCart() ? (
        <div
          style={{
            minHeight: '5.4rem',
            fontStyle: 'italic',
          }}
        >
          {textblocks.cartempty}
        </div>
      ) : (
        <div className='cart-content'>
          <div className='cart-wrapper'>
            {this.state.articles.map(item =>
              <CartContentRow
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.qty}
                inputHandler={this.setQuantity}
                reduceHandler={this.reduceQuantity}
                incrementHandler={this.incrementQuantity}
                deleteHandler={this.deleteArticle}
              />
            )}
          </div>
          <div className='cart-total'>
            {formatcash(cartStorage.value())}
          </div>
        </div>
      )
    );
    /*
    if(validate.isEmptyCart()) {
      return(
        <i>{cartEmptyMsg}</i>
      );
    } else {
      return(
        <div className='cart-content'>
          <div className='cart-wrapper'>
            {this.state.articles.map(item =>
              <CartContentRow
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.qty}
                inputHandler={this.setQuantity}
                reduceHandler={this.reduceQuantity}
                incrementHandler={this.incrementQuantity}
                deleteHandler={this.deleteArticle}
              />
            )}
          </div>
          <div className='cart-total'>
            {formatcash(cartStorage.value())}
          </div>
        </div>
      );
    }
    */
  }
}
function CartContentRow(props) {
  return(
    <div key={props.id} className='cart-item'>
      <div className='cart-item-cell header'>
        {props.name}
      </div>
      <div className='cart-item-cell body price'>
        {formatcash(props.price)}
      </div>
      <div className='cart-item-cell side'>
      <EditableCartDelete action={props.deleteHandler} id={props.id} />
      </div>
      <div className='cart-item-cell body'>
        <EditableCartReduce action={props.reduceHandler} id={props.id} />
        <input
          type='number'
          value={props.quantity}
          style={{outline: 0}}
          onChange={(e) => props.inputHandler(e, props.id)} />
        <EditableCartIncrement
          action={props.incrementHandler}
          id={props.id}
        />
      </div>
      <div className='cart-item-cell side'>
        {formatcash(props.price*props.quantity)}
      </div>
    </div>
  );
}
function CartContentControls(props) {
  return(
    <button
      className='cart-controls'
      style={{outline: 0}}
      onClick={(e) => props.action(e, props.id)}
    >
      {props.children}
    </button>
  );
}
function EditableCartReduce(props) {
  return(
    <CartContentControls action={props.action} id={props.id}>
      <svg viewBox='0 0 32 32' aria-hidden='true'>
        <path d='M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z' />
      </svg>
    </CartContentControls>
  );
}
function EditableCartIncrement(props) {
  return(
    <CartContentControls action={props.action} id={props.id}>
      <svg viewBox="0 0 32 32" aria-hidden='true'>
        <path d='M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z' />
      </svg>
    </CartContentControls>
  );
}
function EditableCartDelete(props) {
  return(
    <CartContentControls action={props.action} id={props.id}>
      <svg viewBox="0 0 32 32" aria-hidden='true'>
        <path d='M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z' />
      </svg>
    </CartContentControls>
  );
}

export default CartContent
