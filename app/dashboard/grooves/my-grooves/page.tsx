import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getGrooves, Groove } from '../../../../database/grooves';
import { getUserBySessionToken } from '../../../../database/users';
import { getUsersgroovesByUserId } from '../../../../database/usersgrooves';
import Courussel from './Courussel';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: {
    default: 'My Grooves',
  },
};
const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});
const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
});
type Grooves = Groove[];
type User =
  | {
      id: string;
      name: string;
      csrfSecret: string;
    }
  | undefined;

export default async function MyGrooves() {
  const grooves = await getGrooves();

  console.log('grooves.id from my-grooves page', grooves);

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  const myGrooves = grooves.filter((groove) => groove.userId === user?.id);

  // array of object with userid with current user id
  const usersgrooves = await getUsersgroovesByUserId(user.id);
  console.log('usersgrooves from my-grooves page', usersgrooves);

  // get the grooves i participate in, returns an array of objects
  const myParticipatingGrooves = grooves.filter((groove) => {
    return usersgrooves.some(
      (usersgroove) => usersgroove.grooveId === groove.id,
    );
  });
  console.log(
    'myParticipatingGrooves from my-grooves page',
    myParticipatingGrooves,
  );

  return (
    <div className={courierPrime.className}>
      <div className={styles.main}>
        <div className={styles.div}>
          {!user && <h2>Log in to view your grooves</h2>}
          {!myGrooves.length ? (
            <h2>You have no grooves</h2>
          ) : (
            <>
              {' '}
              <h2>My Grooves</h2>
              <Courussel myGrooves={myGrooves} />
            </>
          )}
          {!myParticipatingGrooves ? (
            <h2>You are not participating in any grooves</h2>
          ) : (
            <>
              <h2 id="sectionParticipating">The Grooves I participate in:</h2>
              <ul>
                {myParticipatingGrooves.map((myParticipatingGroove) => {
                  return (
                    <li key={`groove.${myParticipatingGroove.id}`}>
                      <Link
                        href={`dashboard/grooves/${myParticipatingGroove.id}`}
                      >
                        <h3>{myParticipatingGroove.name}</h3>
                        <img
                          src={myParticipatingGroove.imgUrl}
                          width="150"
                          alt="Groove"
                        />
                        <p>Offer: {myParticipatingGroove.offer}</p>
                        <p>
                          Missing ingridients:{' '}
                          {myParticipatingGroove.lookingFor}
                        </p>
                        <p>About: {myParticipatingGroove.description}</p>
                        <p>Location: {myParticipatingGroove.location} </p>
                        <p>Time: {myParticipatingGroove.time}</p>
                        <p>date: {myParticipatingGroove.date}</p>
                        <p> #{myParticipatingGroove.label}</p>
                      </Link>
                      <Link
                        href={`dashboard/grooves/${myParticipatingGroove.id}`}
                        data-test-id={`product-${myParticipatingGroove.id}`}
                      >
                        <button>View</button>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
