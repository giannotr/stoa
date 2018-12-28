import { indicators } from './shop.config';
import validate from './shop.validate';

function __commercialRound(num) {
  return Number(num).toFixed(2);
}

class CartStorage {
  constructor() {
    this.__namespace = 'cart_storage';
  }
  
  __set(unit, content) {
    if(validate.isString(unit) && validate.isString(content)) {
      localStorage.setItem(unit, content);
    } else {
      throw new Error(
        'The unit namespace and the content have to be strings'
      );
    }
  }

  // console.log(localStorage);
  __get(unit) {
    if(validate.isString(unit)) {
      return window.localStorage[unit];
    } else {
      throw new Error(
        'The unit namespace has to be a string'
      );
    }
  }

  ini() {
    this.__set('cart_storage', '[]');
  }

  check(id) {
    let cart = JSON.parse(this.__get('cart_storage'));
    let indexReturn = null;
    let flagReturn = cart.map((item, index) => {
      if(item['id'] === id) { indexReturn = index; return true; }
      return false;
    }).reduce((p, c) => p || c, false);
    return { 'flag': flagReturn, 'index': indexReturn };
  }

  add(id, qty, price, name) {
    price = (typeof price === 'undefined') ? 0  : Number(price);
    name  = (typeof name  === 'undefined') ? '' : String(name);
    if(validate.isString(id) && validate.isNumber(qty)) {
      let cart = JSON.parse(this.__get('cart_storage'));// load(cart);
      let checkID = this.check(id);
      if(checkID.flag) {
        cart[checkID.index]['qty'] += qty;
      } else if(!(price === 0 || name === '')) {
        cart.push({
          'id': id,
          'name': name,
          'price': price,
          'qty': qty,
        });
      }
      this.__set('cart_storage', JSON.stringify(cart));// update(cart);
    } else {
      throw new Error(
        'The id has to be passed as a string and the quantity as a number'
      );
    }
  }

  delete(id) {
    let cart = JSON.parse(this.__get('cart_storage'));
    cart = cart.filter(obj => {
      if(obj['id'] === id) {
      }
      return obj['id'] !== id;
    });
    this.__set('cart_storage', JSON.stringify(cart));
  }

  qty(id, val) {
    let cart = JSON.parse(this.__get('cart_storage'));
    if(val !== 0) {
      cart.filter(obj => {
        if(obj['id'] === id) {
          obj['qty'] = val;
        }
        return null;
      });
      this.__set('cart_storage', JSON.stringify(cart));
    } else {
      this.delete(id);
    }
  }

  testqty(id, callback) {
    let select = JSON.parse(this.__get('cart_storage')).filter(
      obj => obj['id'] === id
    );
    return select.length === 1 ? callback(select[0]['qty']) : false;
  }

  count() {
    return JSON.parse(this.__get('cart_storage')).length;
  }

  total() {
    return JSON.parse(this.__get('cart_storage')).map(
      item => item.qty
    ).reduce((p, c) => p + c, 0);
  }

  value() {
    return JSON.parse(this.__get('cart_storage')).map(
      item => item.qty * item.price
    ).reduce((p, c) => p + c, 0);
  }

  valueVAT() {
    return __commercialRound(
      this.value() * (1 + indicators.vat)
    );
  }

  //for fallback only until integration is complete
  load() { return true; }
  update() { return true; }
}

const cartStorage = new CartStorage();
cartStorage.ini();

export default cartStorage;

//tests
/*
cartStorage.add('sn-1', 1, 9.99, 'foo');
cartStorage.add('sn-2', 2, 9.99, 'bar');
cartStorage.add('sn-2', 1, 9.99, 'bar');
cartStorage.add('sn-3', 5, 9.99, 'baz');
*/
//cartStorage.delete('sn-1');
/*
console.log(JSON.parse(window.localStorage.cart_storage));
console.log(cartStorage.count());
console.log(cartStorage.total());
console.log(cartStorage.value());
console.log(cartStorage.valueVAT());
*/
//console.log(cartStorage.check('sn-0'));
