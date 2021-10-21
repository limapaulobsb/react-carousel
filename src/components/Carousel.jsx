import React, { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';

import { sliderData } from './sliderData';
import '../styles/Carousel.css';

export default function Carousel() {
  const sliderRef = useRef();
  const [slideIndex, setSlideIndex] = useState(0);

  const moveTo = {
    next: () => {
      if (slideIndex === sliderData.length - 1) setSlideIndex(0);
      else setSlideIndex(slideIndex + 1);
    },
    previous: () => {
      if (slideIndex === 0) setSlideIndex(sliderData.length - 1);
      else setSlideIndex(slideIndex - 1);
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

  useEffect(() => {
    const slider = sliderRef.current;
    slider.scrollTo(slideIndex * slider.offsetWidth, 0);
  }, [slideIndex]);

  return (
    <div className='carousel'>
      {renderSlider()}
      <button
        type='button'
        className='carousel__previous-button'
        onClick={moveTo.previous}
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </button>
      <button type='button' className='carousel__next-button' onClick={moveTo.next}>
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </button>
    </div>
  );
}
