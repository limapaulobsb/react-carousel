import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

import { sliderData } from './sliderData';
import '../styles/Carousel.css';

export default function Carousel({ allowAuto, showSelectors }) {
  const sliderRef = useRef();
  const timeoutRef = useRef();
  const [auto, setAuto] = useState(allowAuto);
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
    slide: (i) => {
      setSlideIndex(i);
    },
  };

  useEffect(() => {
    if (auto) {
      const timeout = setTimeout(() => {
        moveTo.next();
      }, 3000);
      timeoutRef.current = timeout;
    }

    return () => clearTimeout(timeoutRef.current);
  });

  useEffect(() => {
    const slider = sliderRef.current;
    slider.scrollTo(slideIndex * slider.offsetWidth, 0);
  }, [slideIndex]);

  const renderSlider = () => (
    <div className='carousel__slider' ref={sliderRef}>
      {sliderData.map((image, index) => (
        <div
          className={cx('carousel__slide', { active: index === slideIndex })}
          aria-label={image.alt}
          key={image.id}
          style={{ backgroundImage: `url(${image.url})` }}
        />
      ))}
    </div>
  );

  const renderSelectors = () => (
    <div className='carousel__selectors-container'>
      {sliderData.map((image, index) => (
        <button
          type='button'
          className={cx('carousel__selector-button', { active: index === slideIndex })}
          key={image.id}
          onClick={() => {
            moveTo.slide(index);
            allowAuto && setAuto(false);
          }}
        ></button>
      ))}
    </div>
  );

  return (
    <div className='carousel'>
      {renderSlider()}
      {showSelectors && renderSelectors()}
      <button
        type='button'
        className='carousel__previous-button'
        onClick={() => {
          moveTo.previous();
          allowAuto && setAuto(false);
        }}
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </button>
      <button
        type='button'
        className='carousel__next-button'
        onClick={() => {
          moveTo.next();
          allowAuto && setAuto(false);
        }}
      >
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </button>
      {allowAuto && (
        <button
          type='button'
          className='carousel__play-button'
          onClick={() => {
            if (!auto) moveTo.next();
            setAuto(!auto);
          }}
        >
          <FontAwesomeIcon icon={auto ? faPause : faPlay} />
        </button>
      )}
    </div>
  );
}

Carousel.propTypes = {
  allowAuto: PropTypes.bool,
  showSelectors: PropTypes.bool,
};
