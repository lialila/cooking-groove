import { Courier_Prime, Gruppo, Montserrat } from '@next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import styles from './page.module.scss';

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
});
const font = Gruppo({
  weight: '400',
  subsets: ['latin'],
});
export const metadata = {
  title: 'Cooking Groove',
  description: 'Cooking together',
};
export default async function LandingPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <section className={styles.main}>
      <div className={styles.div}>
        <h2 className={montserrat.className}>Cooking Groove</h2>

        <p className={courierPrime.className}>
          <span>GROOVE</span> <br />
          [groov] noun <br />
          is rhythm in which one lives their life; <br />
          pattern of behavior.
        </p>
        {user ? null : (
          <Link href="/dashboard/login">
            <button className={courierPrime.className}>Let's go!</button>
          </Link>
        )}
      </div>
    </section>
  );
}
