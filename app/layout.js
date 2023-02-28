import './globals.scss';
import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import Image from 'next/image';
import Link from 'next/link';
// import { Inter } from 'next/font/google';
import styles from './layout.module.scss';

const CourierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

const MontserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={styles.html}>
      <body className={styles.body}>
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
                <Link href="/dashboard/signin">Log in</Link>
              </li>
              <li>
                <Link href="/dashboard/registration"> Create account </Link>
              </li>
              <li>
                <Link href="/">
                  <label htmlFor="Search">
                    <input type="search" />
                  </label>{' '}
                </Link>
              </li>
              <li>
                <Image src="/search.png" width="18" height="18" alt="search" />
              </li>
            </ul>
          </nav>
        </header>
        {children}
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
                <Image
                  src="/acebookwhite.png"
                  width="30"
                  height="30"
                  alt="fb"
                />
              </li>
            </Link>
            <Link href="/">
              <li>
                <Image
                  src="/emailwhite.png"
                  width="25"
                  height="25"
                  alt="email"
                />
              </li>
            </Link>
            <Link href="/">
              <li>
                {' '}
                <Image
                  src="/linkedinwhite.png"
                  width="20"
                  height="20"
                  alt="in"
                />
              </li>
            </Link>
          </ul>
        </footer>
      </body>
    </html>
  );
}
