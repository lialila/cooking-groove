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

export default async function MyGrooves() {
  const grooves = await getGrooves();

  console.log('grooves.id from my-grooves page', grooves);

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  const myGrooves = grooves.filter((groove) => groove.userId === user?.id);

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
              <ul>
                {myGrooves.map((groove) => {
                  return (
                    <li key={`groove.${groove.id}`}>
                      <Link
                        href={`dashboard/grooves/${groove.id}`}
                        data-test-id={`product-${groove.id}`}
                      >
                        <h3>{groove.name}</h3>{' '}
                        <img src={groove.imgUrl} width="150" alt="Groove" />
                        <p>
                          {groove.offer} {groove.lookingFor}
                          {groove.description} {groove.location} {groove.label}
                        </p>{' '}
                      </Link>
                      <Link
                        href={`dashboard/grooves/${groove.id}`}
                        data-test-id={`product-${groove.id}`}
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
