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
    <div className={styles.main}>
      <div>
        <h2>My Grooves</h2>
        <ul className={styles.div}>
          {myGrooves.map((groove) => {
            return (
              <li key={`groove.${groove.id}`}>
                <Link
                  href={`dashboard/grooves/${groove.id}`}
                  data-test-id={`product-${groove.id}`}
                >
                  <h3>{groove.name}</h3>{' '}
                </Link>

                <p>
                  {groove.offer} {groove.lookingFor}
                  {groove.description} {groove.location} {groove.label}
                </p>
                <Link
                  href={`dashboard/grooves/${groove.id}`}
                  data-test-id={`product-${groove.id}`}
                >
                  <button>Edit</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
