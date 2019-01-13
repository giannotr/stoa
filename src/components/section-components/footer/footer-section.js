import React from 'react';
import './footer-section.css';
import logo from '../../../logo.svg';

class FooterSection extends React.Component {
  render() {
    return(
      <section id="footer" className="container static footer-section">
        <div className="logo-wrapper">
          <img src={logo} alt="STOA" />
        </div>
        <div className="links-wrapper">
          <a href="/">Home</a>
          <a href="/">Impressum</a>
          <a href="/">AGB</a>
          <a href="/">Datenschutz</a>
          <a href="/">Sicheres Bezahlen</a>
        </div>
        <div className="copyright-wrapper">&copy; 2019 STOA. all rights reseved</div>
      </section>
    );
  }
}

export default FooterSection;
