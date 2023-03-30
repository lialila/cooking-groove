'use client';

import Link from 'next/link';
import FadeIn from 'react-fade-in/lib/FadeIn';
import Carousel from './Carousel';
import styles from './page.module.scss';

export default function MyGrooves(props) {
  return (
    <FadeIn>
      {!props.user && <h2>Log in to view your grooves</h2>}
      {!props.myGrooves.length ? (
        <div className={styles.div}>
          <div className={styles.text}>
            <h4>You don't host any grooves yet...</h4>
            <h4>Start your groove</h4>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.link}
              href="/dashboard/grooves/create-groove"
            >
              Let'go!
            </Link>
            <Link
              className={styles.link}
              href="/dashboard/grooves/participation-grooves"
            >
              My participations
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.div}>
          <Carousel myGrooves={props.myGrooves} />
        </div>
      )}
    </FadeIn>
  );
}
