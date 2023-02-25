import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import Link from 'next/link';
import styles from './page.module.scss';

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

export default function LandingPage() {
  return (
    <main className={styles.main}>
      <div className={styles.div}>
        <h2 className={courierPrime.className}>Cooking Groove</h2>

        <p className={courierPrime.className}>
          groove <br />
          [groov] noun <br />
          is rhythm in which one lives their life; <br />
          pattern of behavior.
        </p>
        <div>
          <button>
            <Link href="signUp/signIn">Log in</Link>
          </button>
          <button>
            <Link href="signUp">Create new account</Link>
          </button>
          <button>
            <Link href="signUp">Search a groove</Link>
          </button>
        </div>
      </div>
    </main>
  );
}
