'use client';
import Link from 'next/link';
import FadeIn from 'react-fade-in/lib/FadeIn';
import styles from './page.module.scss';

export default function UsersGrooves(props) {
  console.log('user', props.user);
  return (
    <FadeIn>
      {!props.sessionUser && <h2>Log in to view grooves</h2>}
      {!props.groovesUserHosts.length ? (
        <div className={styles.div}>
          <div className={styles.text}>
            <h4>{props.user.username} doesn't host any grooves yet...</h4>
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
          {' '}
          <h2 className={styles.textForList}>{props.user.username} Grooves</h2>
          <ul>
            {props.groovesUserHosts.map((groove) => {
              return (
                <li key={`groove.${groove.id}`}>
                  <Link
                    href={`dashboard/grooves/${groove.id}`}
                    data-test-id={`product-${groove.id}`}
                  >
                    {' '}
                    <h3>{groove.name}</h3>
                    {!groove.label ? undefined : <p> #{groove.label}</p>}
                    <p>
                      {groove.date} at {groove.time}
                    </p>{' '}
                    <p>{groove.location} </p>
                    {!groove.imgUrl ? (
                      <img
                        src="/groove-default.jpeg"
                        width="150"
                        alt="Groove"
                      />
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
                  </Link>
                </li>
              );
            })}{' '}
          </ul>
        </div>
      )}
    </FadeIn>
  );
}
