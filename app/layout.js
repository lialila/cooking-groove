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

export const metadata = {
  title: 'Cooking Groove',
  description: 'Cooking together',
};

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
                  />
                </Link>
              </li>
              <li>
                <Link href="signUp/signIn">Log in</Link>
              </li>
              <li>
                <Link href="signUp"> Create account </Link>
              </li>
              <li>
                <Link href="/">
                  <label htmlFor="Search">
                    <input value="search" />
                  </label>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
        <footer className={MontserratText.className}>
          <ul>
            <Link href="/">
              <li>
                <Image src="/twitterwhite.png" width="30" height="30" />
              </li>
            </Link>
            <Link href="/">
              <li>
                {' '}
                <Image src="/acebookwhite.png" width="30" height="30" />
              </li>
            </Link>
            <Link href="/">
              <li>
                <Image src="/emailwhite.png" width="25" height="25" />
              </li>
            </Link>
            <Link href="/">
              <li>
                {' '}
                <Image src="/linkedinwhite.png" width="20" height="20" />
              </li>
            </Link>
          </ul>
        </footer>
      </body>
    </html>
  );
}
