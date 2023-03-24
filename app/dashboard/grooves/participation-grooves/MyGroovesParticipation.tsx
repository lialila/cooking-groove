'use client';
import Link from 'next/link';
import FadeIn from 'react-fade-in/lib/FadeIn';
import styles from './page.module.scss';

type Props = {
  myParticipatingGrooves: {
    id: number;
    name: string;
    offer: string;
    location: string;
    label: string;
    time: string;
    date: string;
    imgUrl: string;
  }[];
  myGrooves: {
    id: number;
    name: string;
    offer: string;
    location: string;
    label: string;
    time: string;
    date: string;
    imgUrl: string;
  }[];
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    sessionToken: string;
  };
};

export default function MyGroovesParticipation(props: Props) {
  return (
    <FadeIn>
      {!props.user && <h2>Log in to view your participations</h2>}
      {!props.myParticipatingGrooves.length ? (
        <div className={styles.div}>
          <div className={styles.text}>
            <h4>You don't participate in any grooves yet...</h4>
            <h4>Browser for a groove</h4>
          </div>
          <div className={styles.buttons}>
            <Link className={styles.link} href="/dashboard/grooves">
              Let'go!
            </Link>
            <Link className={styles.link} href="/dashboard/grooves/my-grooves">
              My grooves
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.div}>
          <h2 className={styles.textForList}>My participations</h2>
          <ul className={styles.ul}>
            {props.myParticipatingGrooves.map((myParticipatingGroove) => {
              return (
                <li key={`groove.${myParticipatingGroove.id}`}>
                  <Link href={`dashboard/grooves/${myParticipatingGroove.id}`}>
                    <h3>{myParticipatingGroove.name}</h3>
                    {!myParticipatingGroove.label ? undefined : (
                      <p> #{myParticipatingGroove.label}</p>
                    )}
                    <p>
                      {myParticipatingGroove.date} at{' '}
                      {myParticipatingGroove.time}
                    </p>{' '}
                    <p>{myParticipatingGroove.location} </p>
                    {!myParticipatingGroove.imgUrl ? (
                      <img
                        src="/groove-default.jpeg"
                        width="150"
                        alt="Groove"
                      />
                    ) : (
                      <img
                        src={myParticipatingGroove.imgUrl}
                        width="150"
                        alt="Groove"
                      />
                    )}
                  </Link>
                  <Link
                    className={styles.linkView}
                    href={`dashboard/grooves/${myParticipatingGroove.id}`}
                    data-test-id={`product-${myParticipatingGroove.id}`}
                  >
                    View
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </FadeIn>
  );
}
