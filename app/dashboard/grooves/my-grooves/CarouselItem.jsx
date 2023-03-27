'use client';
import Link from 'next/link';
import styles from './page.module.scss';

export default function CarouselItem({ groove }) {
  return (
    <div>
      <div
        // key={`groove.${groove.id}`}
        className={styles.carouselItem}
        // style={{ width: width }}
      >
        {/* <div></div>
        <div className={styles.carouselItemContent}> */}
        {/* <Link
            className={styles.linkGroove}
            href={`dashboard/grooves/${groove.id}`}
            data-test-id={`product-${groove.id}`}
          > */}

        <h3>{groove.name}</h3>
        {/* {!groove.label ? undefined : <p> #{groove.label}</p>}
            <p>
              {groove.date} at {groove.time}
            </p>
            <p>{groove.location} </p>
            {!groove.imgUrl ? (
              <img src="/groove-default.jpeg" width="150" alt="Groove" />
            ) : (
              <img src={groove.imgUrl} width="150" alt="Groove" />
            )}
          </Link>
          <Link
            className={styles.linkView}
            href={`dashboard/grooves/${groove.id}`}
            data-test-id={`product-${groove.id}`}
          >
            View
          </Link> */}
        {/* </div> */}
      </div>
    </div>
  );
}
