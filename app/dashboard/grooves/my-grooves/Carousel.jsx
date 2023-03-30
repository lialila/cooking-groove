'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.scss';

export default function Carousel(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= props.myGrooves.length) {
      newIndex = props.myGrooves.length - 1;
    }
    setActiveIndex(newIndex);
  };
  console.log('props.myGrooves', props.myGrooves);
  console.log('props.myGrooves.length', props.myGrooves.length);
  return (
    <div className={styles.carousel}>
      <div
        className={styles.inner}
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
      >
        {props.myGrooves.map((groove) => {
          return (
            // <CarouselItem groove={groove} />
            <div className={styles.carouselItem}>
              <div className={styles.card}>
                <h3>{groove.name}</h3>
                {!groove.label ? undefined : <p> #{groove.label}</p>}
                <p>
                  {groove.date} at {groove.time}
                </p>{' '}
                <p>{groove.location} </p>
                {groove.imgUrl ? (
                  <img
                    className={styles.img}
                    src={groove.imgUrl}
                    alt="Groove"
                    width={'100%'}
                  />
                ) : (
                  <img
                    className={styles.img}
                    src="/background2.jpg"
                    alt="Groove"
                    width={'100%'}
                  />
                )}{' '}
                <Link
                  href={`/dashboard/grooves/${groove.id}`}
                  className={styles.linkView}
                >
                  View
                </Link>
              </div>{' '}
            </div>
          );
        })}
      </div>
      <div className={styles.carouselButtons}>
        <button
          className={styles.buttonArrow}
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <span class="materialSymbolsOutlined">
            {' '}
            <img src="/additional/arrowBack.png" width="20" alt="arrowBack" />
          </span>{' '}
        </button>
        <div className={styles.indicators}>
          {props.myGrooves.map((groove, index) => {
            return (
              <button
                className={styles.indicatorButtons}
                onClick={() => {
                  updateIndex(index);
                }}
              >
                <span>
                  {index === activeIndex ? (
                    <img
                      className={styles.indicatorButton}
                      src="/additional/radioChecked.png"
                      width="20"
                      alt="radioChecked.png"
                    />
                  ) : (
                    <img
                      className={styles.indicatorButton}
                      src="/additional/radio.png"
                      width="20"
                      alt="radioChecked.png"
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>{' '}
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
          className={styles.buttonArrow}
        >
          <span className={styles.materialSymbolsOutlined}>
            {' '}
            <img src="/additional/arrowNext.png" width="20" alt="arrowNext" />
          </span>
        </button>
      </div>
    </div>
  );
}
