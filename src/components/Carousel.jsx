import React, { Children, cloneElement, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

import '../styles/Carousel.css';

export default function Carousel({ allowAuto, children, showSelectors }) {
  const sliderRef = useRef();
  const timeoutRef = useRef();
  const [auto, setAuto] = useState(allowAuto);
  const [slideIndex, setSlideIndex] = useState(0);

  const slideCount = Children.count(children);

  const moveTo = {
    next: () => {
      if (slideIndex === slideCount - 1) setSlideIndex(0);
      else setSlideIndex(slideIndex + 1);
    },
    previous: () => {
      if (slideIndex === 0) setSlideIndex(slideCount - 1);
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
      {Children.map(children, (child, index) => {
        return cloneElement(child, {
          className: cx('carousel__slide', child.props.className, {
            active: index === slideIndex,
          }),
        });
      })}
    </div>
  );

  const renderSelectors = () => {
    return (
      <div className='carousel__selectors-container'>
        {Array(slideCount)
          .fill()
          .map((_, index) => (
            <button
              type='button'
              className={cx('carousel__selector-button', {
                active: index === slideIndex,
              })}
              key={index}
              onClick={() => {
                moveTo.slide(index);
                allowAuto && setAuto(false);
              }}
            />
          ))}
      </div>
    );
  };

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
  children: PropTypes.node,
  showSelectors: PropTypes.bool,
};
