import React, { Component } from 'react';
import MainInterface from './components/main-interface/main-interface';
import HomeSection from './components/section-components/home/home-section';
import ShopSection from './components/section-components/shop/shop-section';
import AboutSection from './components/section-components/about/about-section';
import ContactSection from './components/section-components/contact/contact-section';
import FooterSection from './components/section-components/footer/footer-section';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MainInterface />
        <AppContent />
      </React.Fragment>
    );
  }
}

const AppContent = () => {
  return(
    <main id="app-content" className="wrapper">
      <HomeSection />
      <ShopSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}

export default App;
