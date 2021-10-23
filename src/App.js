import React from 'react';

import Carousel from './components/Carousel';
import { sliderData } from './components/sliderData';

function App() {
  return (
    <main>
      <Carousel allowAuto showSelectors>
        {sliderData.map((image) => (
          <div
            aria-label={image.alt}
            key={image.id}
            style={{ backgroundImage: `url(${image.url})` }}
          />
        ))}
      </Carousel>
    </main>
  );
}

export default App;
