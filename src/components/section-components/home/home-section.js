import React from 'react';
import './home-section.css';
import '../../../App.css';

class HomeSection extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.processScroll = this.processScroll.bind(this);
  }

  handleScroll() {
    const targetElement = document.getElementById('shop');
    const targetScroll = targetElement.getBoundingClientRect().top;
    const initialScroll = document.getElementById('app-content').scrollTop + 1;
    this.processScroll(initialScroll, targetScroll);
  }
  
  processScroll(currentY, destinationY) {
    setTimeout(() => {
      //window.scrollTo(0, currentY);
      document.getElementById('app-content').scrollTop = currentY;
      currentY = 1.1*currentY;
      if (currentY <= destinationY) {
        this.processScroll(currentY, destinationY);
      }
    }, 10);
  }

  render() {
    return(
     <section id='home' className='container parallax home-section'>
        <SuperTitle content='Herzlich Willkommen!' />
        <TypewriterTitle
          static='stoa.berlin:'
          typed='indipendent label & verlag'
        />
        <button className="scroll-down" onClick={this.handleScroll}>
          <svg viewBox="0 0 25 25">
            <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
          </svg>
        </button>
      </section>
    );
  }
}

function SuperTitle(props) {
  return(
    <div className='super-title'>
      <h3>
        {props.content}
      </h3>
    </div>
  );
}

class TypewriterTitle extends React.Component {
  constructor() {
    super();
    this.state = {
      typePosition: 0,
    }
    this.typespeed = 100;
    this.__incrementTypePosition = this.__incrementTypePosition.bind(this);
    this.typeAnimation = this.typeAnimation.bind(this);
  }
  
  __incrementTypePosition() {
    this.setState({
      typePosition: this.state.typePosition + 1,
    });
  }
  
  typeAnimation() {
    if(this.state.typePosition < this.props.typed.length) {
      this.__incrementTypePosition();
      this.typespeed = Math.floor((Math.random() * 100) + 100);
      setTimeout(this.typeAnimation, this.typespeed);
    }
  }
  
  componentDidMount() {
    //this.typeAnimation();
    setTimeout(this.typeAnimation, 1000);
  }
  
  render() {
    return(
      <div className='typewriter-title'>
        <h2>
          {this.props.static}
        </h2>
        <h1 className='typewriter'>
          {this.props.typed.slice(0, this.state.typePosition)}
        </h1>
      </div>
    );
  }
}

export default HomeSection;
