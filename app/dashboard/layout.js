import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
// import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
// import { getUserBySessionToken } from '../../database/users';
// import CookieBanner from './CookieBanner';
import styles from './layout.module.scss';

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

const MontserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }) {
  return (
    <section className={styles.html}>
      <nav className={MontserratText.className}>
        {/* <ul>
          <li>
            <Link href="/">
              <Image
                src="/logowithoutbackground3.png"
                width="100"
                height="83"
                alt="logo"
              />
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <Link href="/dashboard/logout" prefetch={false}>
              Log out
            </Link>
          </li>
          <li>
            <Link href="/dashboard/grooves">
              <Image src="/search.png" width="18" height="18" alt="search" />
            </Link>
          </li>
        </ul> */}
      </nav>
      <div className={MontserratText.className}>{children}</div>
      <footer className={MontserratText.className}>
        <ul>
          <Link href="/">
            <li>
              <Image
                src="/twitterwhite.png"
                width="30"
                height="30"
                alt="twitter"
              />
            </li>
          </Link>
          <Link href="/">
            <li>
              {' '}
              <Image src="/acebookwhite.png" width="30" height="30" alt="fb" />
            </li>
          </Link>
          <Link href="/">
            <li>
              <Image src="/emailwhite.png" width="25" height="25" alt="email" />
            </li>
          </Link>
        </ul>
      </footer>
    </section>
  );
}
