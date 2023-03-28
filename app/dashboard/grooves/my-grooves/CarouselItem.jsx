'use client';
import styles from './page.module.scss';

export default function CarouselItem({ groove, width }) {
  return (
    <div className={styles.carouselItem} style={{ width: width }}>
      <div></div>
      <img className={styles.carouselImage} src={groove.imgUrl} />
      <div className={styles.carouselItemText}>
        {groove.date} at {groove.time}
      </div>
    </div>
  );
}
