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
            werden alle Disziplinen als Teil eines großen Ganzen betrachtet.
            So strebt das Label STOA nach einem universellen Musikbegriff,
            der immer wieder neu definiert werden will –
            und in dem die Trennung zwischen den zwei großen Stilkonstrukten Jazz und Klassik aufgehoben wird.
          </FullWidthBlock>
          <FullWidthBlock
            title="Es repräsentiert"
            blockstyle={{
              background: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center', color: "#fff",
            }}
          >
            Künstler mit unterschiedlichsten Ansätzen, ohne sie von einander abzugrenzen.
            {/* ... */}
          </FullWidthBlock>
          <FullWidthBlock title="Ursprünglich">
            als Selfpublishing-Verlag gegründet, entwickelte STOA sich zu einem Independentlabel weiter,
            das – inspiriert von der emotionalen Selbstbeherrschung des stoischen Konzepts –
            das Spannungsfeld zwischen Jazz, Groove, Elektronik und Neuer Musik erkundet.
          </FullWidthBlock>
          <FullWidthBlock
            title="Der Gründer"
            blockstyle={{background: "#8eb6c2"}}
          >
            Ruben Giannotti,
            studierte an der Universität der Künste Berlin
            und der Hochschule für Musik „Hanns Eisler“
            und arbeitet heute als Musiker und Komponist in Berlin.
            {/* ... */}
          </FullWidthBlock>
        </ContentArea>
      </section>
    );
  }
}

export default AboutSection;
