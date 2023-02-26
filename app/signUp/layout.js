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

export const metadata = {
  title: 'Create new account',
};

export default function SignUpLayout({ children }) {
  return (
    <html className={styles.html} lang="en">
      <head />
      <body>
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
                <Link href="/">
                  <label htmlFor="Search">
                    <input value="search" />
                  </label>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className={MontserratText.className}>{children}</div>
        {/* <footer className={MontserratText.className}>
          <ul>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </footer> */}
      </body>
    </html>
  );
}
