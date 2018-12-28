import React from 'react';
import { ContentArea, FullWidthBlock } from '../../building-blocks/base-components';
import img from './stoa_bridge.jpg';
import './about-section.css';

// TODO: add symbols
// TODO: section padding
class AboutSection extends React.Component {
  render() {
    return(
      <section id='about' className='container static about-section'>
        <ContentArea>
          <h2>About</h2>
          <FullWidthBlock
            title="In der Stoa"
            blockstyle={{background: "#4a92a8", color: "#fff"}}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </FullWidthBlock>
          <FullWidthBlock
            title="Es repräsentiert"
            blockstyle={{background: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', color: "#fff"}}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </FullWidthBlock>
          <FullWidthBlock title="Ursprünglich als Self-Publishing-Verlag gegründet">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </FullWidthBlock>
          <FullWidthBlock
            title="Der Gründer"
            blockstyle={{background: "#8eb6c2"}}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </FullWidthBlock>
        </ContentArea>
      </section>
    );
  }
}

export default AboutSection;
