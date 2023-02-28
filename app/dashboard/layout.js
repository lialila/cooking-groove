import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.scss';

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

const MontserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export default function DashboardLayout({ children }) {
  return (
    <section className={styles.html}>
      <header className={MontserratText.className}>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <Image
                  src="/logowithoutbackground3.png"
                  width="80"
                  height="65"
                  alt="logo"
                />
              </Link>
            </li>
            <li>
              <Link href="/">Profile</Link>
            </li>
            <li>
              <Link href="/../grooves">
                <Image src="/search.png" width="18" height="18" alt="search" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
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
          <Link href="/">
            <li>
              {' '}
              <Image src="/linkedinwhite.png" width="20" height="20" alt="in" />
            </li>
          </Link>
        </ul>
      </footer>
    </section>
  );
}
