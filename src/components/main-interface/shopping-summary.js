import React from 'react';
import { indicators, formatcash } from '../../backend/js/shop.config';
import cartStorage from '../../backend/js/shop.cartstorage';
import './shopping-summary.css';

class ShoppingSummary extends React.Component {
  render() {
    return(
    <div>
        <CartSummary ref={(ref) => {window.cartSummary = ref}} />
        <DataSummary user={this.props.user} />
        <PaymentmMethods />
    </div>
    );
  }
}
  
export default ShoppingSummary;

class CartSummary extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
    }
  }

  syncCartSummaryWithStorage(){
    this.setState({
      articles: JSON.parse(window.localStorage.cart_storage),
    });
  }

  render() {
    return(
      <div id='cartSummary'>
        <EmptyLine />
        <HeaderLine>
          Artikel
        </HeaderLine>
        {this.state.articles.map(article =>
          <div key={article.id} className='summary-row'>
            <div className='summary-element cell left'>
              {article.name}
            </div>
            <div className='summary-element cell right'>
              {formatcash(article.qty*article.price)}
            </div>
            <div className='summary-element line left top small'>
              <span className='colored'>{formatcash(article.price)}</span>
              <span>(Anzahl: {article.qty})</span>
            </div>
          </div>
        )}
        <EmptyLine />
        <div className='summary-row balancing'>
          <div className='summary-element multicell left white'>
            Zwischenbetrag
          </div>
          <div className='summary-element cell right white'>
            {formatcash(cartStorage.value())}
          </div>
        </div>
        <div className='summary-row balancing'>
          <div className='summary-element multicell left white'>
            inkl. {indicators.vat*100 + '%'} MwSt.
          </div>
          <div className='summary-element cell right white'>
            {formatcash(cartStorage.value()*indicators.vat)}
          </div>
        </div>
        <div className='summary-row balancing'>
          <div className='summary-element multicell left white'>
            Versandkosten
          </div>
          <div className='summary-element cell right white'>
            {formatcash(indicators.shipping)}
          </div>
        </div>
        <div className='summary-row balancing'>
          <div className='summary-element balancing multicell left white bg'>
            Gesamtbetrag
          </div>
          <div className='summary-element balancing cell right white bg'>
            {formatcash(cartStorage.valueVAT())}
          </div>
        </div>
        <EmptyLine />
      </div>
    );
  }
}

class DataSummary extends React.Component {
  render() {
    let userdata = this.props.user;
    return(
      <div id='dataSummary'>
        <HeaderLine>
          Lieferadresse
        </HeaderLine>
        <AddressLine>
          {userdata.fname + ' ' + userdata.lname}
        </AddressLine>
        <AddressLine>
          {userdata.address}
        </AddressLine>
        <AddressLine>
          {userdata.zip + ' ' + userdata.city}
        </AddressLine>
        <AddressLine>
          {userdata.country}
        </AddressLine>
        <HeaderLine>
          E-Mail-Kontakt
        </HeaderLine>
        <AddressLine>
          {userdata.email}
        </AddressLine>
        <HeaderLine>
          Rechnungsadresse
          {!userdata.invoiceAddr &&
            <span style={{margin: '0 0 0 5px'}}>
              <i style={{fontWeight: 'normal'}}>(wie Lieferadresse)</i>
            </span>
          }
        </HeaderLine>
        {userdata.fnameInvoice &&
          <AddressLine>
            {userdata.fnameInvoice + ' ' + userdata.lnameInvoice}
          </AddressLine>
        }
        {userdata.addressInvoice &&
          <AddressLine>
            {userdata.addressInvoice}
          </AddressLine>
        }
        {userdata.zipInvoice &&
          <AddressLine>
            {userdata.zipInvoice + ' ' + userdata.cityInvoice}
          </AddressLine>
        }
        {userdata.countryInvoice &&
          <AddressLine>
            {userdata.countryInvoice}
          </AddressLine>
        }
      </div>
    );
  }
}

  const EmptyLine = props => {
    return(
      <div className='summary-row address'>
        <div className='summary-element line'></div>
      </div>
    );
  }
  const HeaderLine = props => {
    return(
      <div className='summary-row header'>
        <div className='summary-element line'>
          {props.children}
        </div>
      </div>
    );
  }
  const AddressLine = props => {
    return(
      <div className='summary-row address'>
        <div className='summary-element line'>
          {props.children}
        </div>
      </div>
    );
  }

class PaymentmMethods extends React.Component {
  constructor(){
    super();
    this.state = { payment: 'sofort' }
    this.handleSelect = this.handleSelect.bind(this);
  }
  
  handleSelect(e) {
    this.setState({ payment: e.target.id });
  }

  // TODO: invoice disable if grand total > 30
  render() {
    const selectedStyle = { background: '#67aabc', color: 'white', fontSize: '90%', fontWeight: 'bold', }
    return(
      <div id='paymentPanel'>
        <PaymentTile
          id='sofort'
          caption='Sofort'
          state={this.state.payment}
          action={this.handleSelect}
          selectedStyle={selectedStyle}>
          <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5Ljg2NiA0OS44NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5Ljg2NiA0OS44NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0xMy4yMDEsMTguMjY1Yy0wLjU1MywwLTEuMTA1LDAtMS42NTgsMGMtMC40MTUsMC4wMDEtMC40NTQsMC4wNDItMC40NTQsMC40NjJjMCwyLjAyOSwwLDQuMDU5LDAsNi4wODggICAgYzAsMi4wNjcsMCw0LjEzNCwwLDYuMjAzYzAsMC4zNDMsMC4wNTksMC40LDAuMzk3LDAuNDAyYzAuNTQyLDAuMDAzLDEuMDg1LDAsMS42MjksMGMwLjUxMSwwLDAuNTU4LTAuMDQ1LDAuNTU4LTAuNTQ5ICAgIGMwLTMuNDc4LDAtNi45NTYsMC0xMC40MzNjMC0wLjU3MiwwLjAwMS0xLjE0MywwLTEuNzE1QzEzLjY3MiwxOC4zMzQsMTMuNiwxOC4yNjYsMTMuMjAxLDE4LjI2NXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yLjMzOSwxOC4yNjZjLTAuNTA1LTAuMDAzLTEuMDEtMC4wMDUtMS41MTYsMC4wMDFDMC4yOTMsMTguMjc1LDAsMTguNTc3LDAsMTkuMTA5YzAsMS45NjMsMCwzLjkyNywwLDUuODkgICAgYzAsMS45OTMsMCwzLjk4MywwLDUuOTc2YzAsMC4zNDksMC4wNDcsMC4zOTYsMC4zOTcsMC4zOTZjMC41MTQsMC4wMDQsMS4wMjksMC4wMDQsMS41NDMsMGMwLjU0LTAuMDA0LDAuODExLTAuMjczLDAuODExLTAuODEgICAgYzAtMy45NTUsMC03LjkxMiwwLTExLjg2NkMyLjc1MiwxOC4zNDgsMi42NzksMTguMjY5LDIuMzM5LDE4LjI2NnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik05LjcyNCwzMS4wNzJjLTAuMTQ3LTEuNDY0LTAuNjgtMi43NjMtMS43MDUtMy44MzZjLTEuMTA0LTEuMTU0LTIuNDYyLTEuNzg5LTMuOTQzLTEuOTM2ICAgIGMtMC40NzgtMC4wMDktMC40ODItMC4wMDktMC40NjksMC4zNTJjMC4wMDUsMC4xMzMsMC4wMzEsMC4yNjQsMC4wNTEsMC4zOTZjMC4yNjUsMS43NTUsMS4xMjMsMy4xNTMsMi41NTEsNC4xOTggICAgYzAuOTM2LDAuNjg4LDEuOTk1LDEuMDQ1LDMuMTQ4LDEuMTUzQzkuNywzMS40MzIsOS43NTgsMzEuNDA4LDkuNzI0LDMxLjA3MnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik05LjM2NSwxOC4yOThjLTAuMTMxLDAuMDIxLTAuMjY3LDAuMDEzLTAuMzk3LDAuMDMzYy0xLjUwMiwwLjIzOS0yLjc3NywwLjkwNC0zLjc5MSwyLjA0MyAgICBjLTAuOTI5LDEuMDQyLTEuNDQ1LDIuMjcxLTEuNTY3LDMuNjU5Yy0wLjAzMSwwLjM2Mi0wLjAxMSwwLjM2MywwLjM3LDAuNDEyYzAuNTIzLTAuMTI5LDEuMDY3LTAuMjA4LDEuNTY3LTAuMzk4ICAgIGMyLjQ5Ny0wLjk0OCwzLjg2My0yLjc4OCw0LjE3OC01LjQyOEM5Ljc2NSwxOC4yODQsOS43MDksMTguMjQ2LDkuMzY1LDE4LjI5OHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yMi43NjMsMjQuNDk2Yy0wLjAzOC0xLjQ1Ny0wLjg2Ny0yLjQzMi0yLjI2OS0yLjc3N2MtMS41NTUtMC4zODYtMy4wOTYtMC4xNi00LjYyOSwwLjE2NyAgICBjLTAuMTgyLDAuMDM4LTAuMjU3LDAuMTY5LTAuMjUzLDAuMzZjMC4wMDgsMC4zNDEsMC4wMDIsMC42ODUsMC4wMDIsMS4wMjhjMCwwLjQ4OSwwLjA2NCwwLjUxMywwLjU0OCwwLjQ4NCAgICBjMC45ODctMC4wNTYsMS45NzYtMC4wOTgsMi45NjQtMC4wOThjMC41OSwwLDAuOTQ4LDAuMzMzLDEuMDQ2LDAuODY3YzAuMDMxLDAuMTY2LDAuMDE5LDAuMzQyLDAuMDE5LDAuNTEzICAgIGMwLjAwMiwwLjY2MywwLjAwMSwwLjY2OS0wLjY1MywwLjY2MWMtMC45MTQtMC4wMDktMS44MjUsMC4wMjEtMi43MSwwLjI4OWMtMC45MTQsMC4yNzQtMS41NzEsMC44MTUtMS43NjksMS43ODkgICAgYy0wLjEyNywwLjYyOS0wLjExNCwxLjI2NCwwLjAzOSwxLjg5NmMwLjIxMiwwLjg3NSwwLjc0MiwxLjQ3MSwxLjYwOCwxLjcyOWMwLjk2MiwwLjI4MywxLjkxNSwwLjI0MiwyLjgzLTAuMjAxICAgIGMwLjI2Mi0wLjEyNywwLjUxMS0wLjI4MywwLjgwNC0wLjQ0NmMwLjAxMiwwLjA5MSwwLjAyMSwwLjEzNywwLjAyMywwLjE4NGMwLjAyMiwwLjQzLDAuMDc2LDAuNDg0LDAuNTEyLDAuNDg0ICAgIGMwLjUxNCwwLjAwMSwxLjAyOCwwLjAwMiwxLjU0MywwYzAuMjk5LTAuMDAyLDAuNDA1LTAuMDk3LDAuNDA0LTAuMzg4QzIyLjgwOSwyOC44NTYsMjIuODIsMjYuNjc0LDIyLjc2MywyNC40OTZ6IE0xOS45MzgsMjkuNDA4ICAgIGMtMC41NiwwLjIxNy0xLjEyNiwwLjMzNC0xLjcyNywwLjIzYy0wLjM3NC0wLjA2NC0wLjY0OC0wLjI4Ni0wLjY4LTAuNjY2Yy0wLjAyOC0wLjM0Ny0wLjAwOC0wLjcwNSwwLjA2LTEuMDQ0ICAgIGMwLjA3My0wLjM2MiwwLjMzOS0wLjYyNywwLjcwMi0wLjY3M2MwLjU5Mi0wLjA3MywxLjE5MS0wLjA4OSwxLjc4Ny0wLjExYzAuMDUzLTAuMDAyLDAuMTU0LDAuMTI3LDAuMTU5LDAuMjAxICAgIGMwLjAxOSwwLjI5NCwwLjAwOCwwLjU5LDAuMDA4LDAuODg1YzAsMC4yMy0wLjAxOCwwLjQ2LDAuMDA1LDAuNjg3QzIwLjI4MiwyOS4xODIsMjAuMTc5LDI5LjMxNiwxOS45MzgsMjkuNDA4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBvbHlnb24gcG9pbnRzPSI0OC41OTIsMjAuOTY4IDQ4LjU5MiwyMS4wNDMgNDguODAyLDIxLjA0MyA0OC44MDIsMjEuNjU2IDQ4Ljg5MiwyMS42NTYgNDguODkyLDIxLjA0MyA0OS4xMDIsMjEuMDQzICAgICA0OS4xMDIsMjAuOTY4ICAgIiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDkuODIzLDIwLjk2OGgtMC4xMTlsLTAuMTIzLDAuMzMzYy0wLjAyOSwwLjA4Ny0wLjA1NSwwLjE2Mi0wLjA3MiwwLjIzMmgtMC4wMDFjLTAuMDIxLTAuMDcyLTAuMDQyLTAuMTQ4LTAuMDctMC4yMzIgICAgbC0wLjExNy0wLjMzM2gtMC4xMTNsLTAuMDQ3LDAuNjg4aDAuMDg0bDAuMDItMC4yOTZjMC4wMDYtMC4xMDQsMC4wMTEtMC4yMTksMC4wMTMtMC4zMDRoMC4wMDIgICAgYzAuMDIxLDAuMDgxLDAuMDQ3LDAuMTcsMC4wNzksMC4yNjdsMC4xMTIsMC4zMjloMC4wNjdsMC4xMjEtMC4zMzVjMC4wMzUtMC4wOTUsMC4wNjItMC4xODEsMC4wODYtMC4yNjFoMC4wMDIgICAgYzAsMC4wODQsMC4wMDYsMC4yMDIsMC4wMTMsMC4yOTdsMC4wMTYsMC4zMDNoMC4wOUw0OS44MjMsMjAuOTY4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTM5LjExNSwyNS4xNDZjLTAuMDA2LTAuNTItMC4wNjctMS4wNDYtMC4xOC0xLjU1N2MtMC4yMjUtMS4wNTUtMC44My0xLjc5OC0xLjk0MS0xLjk5MiAgICBjLTEuMjEzLTAuMjE1LTIuMzY5LTAuMDQzLTMuNDEsMC42NjNjLTAuMTAyLDAuMDY4LTAuMjA0LDAuMTMtMC4zNzksMC4yNDFjLTAuMDA4LTAuMjA1LTAuMDItMC4zMzItMC4wMjItMC40NjEgICAgYy0wLjAwOC0wLjMzNi0wLjA2Ni0wLjM5OS0wLjQwNC0wLjQwMWMtMC41MzctMC4wMDMtMS4wNjktMC4wMDQtMS42MDIsMC4wMDFjLTAuMzE0LDAuMDAyLTAuNDA4LDAuMS0wLjQwOCwwLjQxMyAgICBjLTAuMDAxLDIuOTczLTAuMDAxLDUuOTQ1LDAsOC45MThjMCwwLjM0OSwwLjA5NCwwLjQ0NSwwLjQzNiwwLjQ0N2MwLjU5MSwwLjAwMiwxLjE4Mi0wLjAwNiwxLjc3MywwLjAwNSAgICBjMC4yNjQsMC4wMDMsMC4zODMtMC4xMDEsMC4zNzgtMC4zNzJjLTAuMDEtMC41OS0wLjAwMy0xLjE4LTAuMDAzLTEuNzcyYzAtMS41NzItMC4wMDMtMy4xNDQsMC4wMDYtNC43MTYgICAgYzAtMC4xMywwLjAzNC0wLjMyNSwwLjEyMS0wLjM3OWMwLjY1Ni0wLjQwNCwxLjM2LTAuNjUyLDIuMTQzLTAuNTIyYzAuNDMxLDAuMDcxLDAuNzMzLDAuMzI0LDAuODE0LDAuNzY5ICAgIGMwLjA1NywwLjMwOCwwLjEsMC42MjEsMC4xLDAuOTMzYzAuMDEyLDEuODY5LDAuMDA2LDMuNzM2LDAuMDA2LDUuNjA0YzAsMC40MDcsMC4wNDcsMC40NTIsMC40NjQsMC40NTIgICAgYzAuNTM0LDAuMDAzLDEuMDY5LDAuMDAzLDEuNjAyLDBjMC40NjEsMCwwLjUxNC0wLjA1MSwwLjUxNC0wLjUwMkMzOS4xMjMsMjguOTk2LDM5LjEzNiwyNy4wNzIsMzkuMTE1LDI1LjE0NnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00OC4yMTYsMjUuMDM1Yy0wLjAwMS0wLjI5My0wLjAxNS0wLjU5LTAuMDYtMC44ODRjLTAuMTc4LTEuMTQtMC43ODktMS45NTQtMS44OTYtMi4zMjMgICAgYy0wLjQ2NC0wLjE1NS0wLjk1OS0wLjI2Mi0xLjQ0Ni0wLjI5M2MtMS4xNjQtMC4wNzMtMi4zMTQsMC4wNjYtMy40NTMsMC4zMjNjLTAuMjUsMC4wNTgtMC4zNTUsMC4xOTQtMC4zNTQsMC40MzggICAgYzAuMDAxLDAuMzE0LDAsMC42MjksMCwwLjk0M2MwLDAuNTA2LDAuMDcsMC41NDUsMC41NjIsMC41MTljMC45OC0wLjA1NSwxLjk1OS0wLjA5OSwyLjkzOC0wLjEwNSAgICBjMC42MzItMC4wMDIsMC45ODYsMC4zMjMsMS4wOTMsMC45NDhjMC4wNDgsMC4yOCwwLjAyMiwwLjU3MSwwLjAzNywwLjg1NGMwLjAxLDAuMTg4LTAuMDc5LDAuMjUtMC4yNTksMC4yNDQgICAgYy0wLjQxLTAuMDA2LTAuODI1LTAuMDQxLTEuMjI5LDAuMDA4Yy0wLjY5NSwwLjA4Mi0xLjQsMC4xNjItMi4wNzIsMC4zNWMtMC44OTEsMC4yNTEtMS40NjksMC44NzQtMS42MTUsMS44MTIgICAgYy0wLjA1OSwwLjM4OS0wLjA0OSwwLjc5My0wLjAzLDEuMTg5YzAuMDc2LDEuNjA4LDEuMzAzLDIuNjY0LDIuOTA4LDIuNTM0YzAuODExLTAuMDYzLDEuNTc1LTAuMjU2LDIuMjM5LTAuNzUxICAgIGMwLjA0NS0wLjAzMiwwLjEwMi0wLjA1LDAuMTY0LTAuMDc4YzAuMDI5LDAuMDQ0LDAuMDQ3LDAuMDU1LDAuMDQ5LDAuMDczYzAuMDEsMC4wNDgsMC4wMTUsMC4wOTUsMC4wMTcsMC4xNDQgICAgYzAuMDIyLDAuNDE1LDAuMDQ5LDAuNDQsMC40NzUsMC40NGMwLjQ5NiwwLjAwMywwLjk5LDAuMDAzLDEuNDg2LDBjMC4zOTksMCwwLjQ0OC0wLjA0NSwwLjQ0OC0wLjQzOCAgICBDNDguMjE5LDI5LDQ4LjIyMSwyNy4wMTcsNDguMjE2LDI1LjAzNXogTTQ1LjY5NywyOS4wMDljMC4wMDcsMC4xODItMC4wNzEsMC4yNzgtMC4yMywwLjM0OSAgICBjLTAuNTg1LDAuMjU5LTEuMTg2LDAuMzkyLTEuODI5LDAuMjg3Yy0wLjQ2My0wLjA3OS0wLjczNC0wLjM5My0wLjcyNi0wLjk3NWMwLjAxNS0wLjk4OSwwLjIzMy0xLjQzNiwxLjQzNi0xLjUyNyAgICBjMC4zNTktMC4wMjgsMC43MjQsMC4wMDEsMS4wODUtMC4wMDdjMC4yMDMtMC4wMDksMC4yNjgsMC4wODYsMC4yNjQsMC4yNzRjLTAuMDA5LDAuMjc2LTAuMDA0LDAuNTU0LTAuMDA0LDAuODI4ICAgIEM0NS42OTUsMjguNDk0LDQ1LjY4NSwyOC43NSw0NS42OTcsMjkuMDA5eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI5LjY5MiwyMS44NzdjMC4wMDEtMC4yNTUtMC4xMTMtMC4zNjQtMC4zNjYtMC4zNTRjLTAuNzQ0LDAuMDMyLTEuNDE2LDAuMjY2LTIuMDE4LDAuNzAxICAgIGMtMC4wODIsMC4wNi0wLjE2NCwwLjExNS0wLjI4NywwLjIwM0MyNy4wMTEsMjIuMjksMjcsMjIuMjA5LDI3LDIyLjEyN2MtMC4wMDgtMC40MS0wLjA4LTAuNDg2LTAuNDgxLTAuNDg2ICAgIGMtMC41MTctMC4wMDItMS4wMjktMC4wMDEtMS41NDQtMC4wMDFjLTAuNDcxLDAuMDAxLTAuNTQ5LDAuMDc3LTAuNTQ5LDAuNTQ2YzAsMS4zMTQsMCwyLjYzLDAsMy45NDRjMCwxLjU5NC0wLjAwMSwzLjE4NSwwLDQuNzc0ICAgIGMwLDAuNDIyLDAuMDkzLDAuNTE2LDAuNDk0LDAuNTE2YzAuNTQyLDAuMDAzLDEuMDg3LDAuMDAzLDEuNjMsMGMwLjQzOCwwLDAuNTA4LTAuMDY2LDAuNTA4LTAuNTE4ICAgIGMwLjAwMS0yLjExMywwLjAwMy00LjIyOS0wLjAwNC02LjM0N2MwLTAuMjA5LDAuMDYxLTAuMzI4LDAuMjUzLTAuNDE5YzAuNjM2LTAuMjk5LDEuMjg4LTAuNTIzLDIuMDAzLTAuNDk0ICAgIGMwLjI2MiwwLjAxMSwwLjM4OS0wLjA4OCwwLjM4My0wLjM2NUMyOS42ODIsMjIuODA5LDI5LjY4NCwyMi4zNDQsMjkuNjkyLDIxLjg3N3oiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
        </PaymentTile>
        <PaymentTile
          id='paypal'
          caption='Paypal'
          state={this.state.payment}
          action={this.handleSelect}
          selectedStyle={selectedStyle}>
          <svg viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0
              22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm5.5-11.119c0
              .268-.033.542-.085.813-.424 2.209-1.873 2.973-3.724 2.973h-.286c-.226 0-.419.167-.454.394l-.402
              2.545c-.035.227-.227.394-.454.394h-1.368c-.195 0-.344-.174-.314-.366l.693-4.44.031-.028h1.077c2.618
              0 4.255-1.309 4.736-3.784.407.407.55.938.55 1.499zm-7.108 2.125c.058-.413.23-.589.693-.59l1.13-.001c2.287
              0 3.599-1.045 4.011-3.195.4-2.066-1.051-3.22-3.015-3.22h-3.673c-.258 0-.478.191-.518.451-1.152 7.418-1.485
              9.304-1.519 9.879-.011.181.134.336.318.336h1.995l.578-3.66z" />
          </svg>
        </PaymentTile>
        <PaymentTile
          id='amazonpay'
          caption='AmazonPay'
          state={this.state.payment}
          action={this.handleSelect}
          selectedStyle={selectedStyle}>
          <svg viewBox="0 0 24 24">
            <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186
            1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186
            7.705c-.209.189-.512.201-.745.074-1.052-.872-1.238-1.276-1.814-2.106-1.734 1.767-2.962
            2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754
            4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.82-1.775-.82-1.205 0-2.277.618-2.54
            1.897-.054.285-.261.567-.549.582l-3.061-.333c-.259-.056-.548-.266-.472-.66.704-3.716 4.06-4.838 7.066-4.838
            1.537 0 3.547.41 4.758 1.574 1.538 1.436 1.392 3.352 1.392 5.438v4.923c0 1.481.616 2.13 1.192
            2.929.204.287.247.63-.01.839-.647.541-1.794 1.537-2.423 2.099l-.008-.007zm3.559 1.988c-2.748
            1.472-5.735 2.181-8.453 2.181-4.027 0-7.927-1.393-11.081-3.706-.277-.202-.481.154-.251.416
            2.925 3.326 6.786 5.326 11.076 5.326 3.061 0 6.614-1.214 9.066-3.494.406-.377.058-.945-.357-.723zm.67
            2.216c-.091.227.104.32.31.147 1.339-1.12 1.685-3.466 1.411-3.804-.272-.336-2.612-.626-4.04.377-.22.154-.182.367.062.337.805-.096
            2.595-.312 2.913.098.319.41-.355 2.094-.656 2.845z" fillRule="evenodd" clipRule="evenodd" />
          </svg>
        </PaymentTile>
        <PaymentTile
          id='invoice'
          caption='Rechnung'
          state={this.state.payment}
          action={this.handleSelect}
          selectedStyle={selectedStyle}>
          <svg viewBox="0 0 24 24">
            <path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6
            2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811
            13h-10v-1h10v1zm0 2h-10v1h10v-1zm0 3h-10v1h10v-1z" />
          </svg>
        </PaymentTile>
      </div>
    );
  }
}
  const PaymentTile = props => {
    return(
      <div
        className='payment-tile'
        style={props.state === props.id ? props.selectedStyle : {}}>
        {props.children}
        <span className='payment-caption'>{props.caption}</span>
        <a href="javascript:void(0)" id={props.id} onClick={props.action}></a>
      </div>
    );
  }
