import React, { useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';

import { sliderData } from './sliderData';
import '../styles/Carousel.css';

export default function Carousel() {
  const sliderRef = useRef();

  const moveTo = {
    next: () => {
      const slider = sliderRef.current;
      if (slider.scrollLeft / slider.offsetWidth === sliderData.length - 1) {
        slider.scrollTo(0, 0);
      } else {
        slider.scrollBy(slider.offsetWidth, 0);
      }
    },
    previous: () => {
      const slider = sliderRef.current;
      if (slider.scrollLeft === 0) {
        slider.scrollTo(slider.offsetWidth * (sliderData.length - 1), 0);
      } else {
        slider.scrollBy(-slider.offsetWidth, 0);
      }
    },
  };

  const renderSlider = () => (
    <div className='carousel__slider' ref={sliderRef}>
      {sliderData.map((image) => (
        <div
          className='carousel__slide'
          aria-label={image.alt}
          key={image.id}
          style={{ backgroundImage: `url(${image.url})` }}
        />
      ))}
    </div>
  );

  return (
    <div className='carousel'>
      {renderSlider()}
      <button type='button' className='carousel__previous-button' onClick={moveTo.previous}>
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </button>
      <button type='button' className='carousel__next-button' onClick={moveTo.next}>
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </button>
    </div>
  );
}
