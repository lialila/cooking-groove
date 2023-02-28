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
                <Link href="/">Profile</Link>
              </li>
              <li>
                <Link href="/signUp/grooves">
                  <label htmlFor="Search">
                    <input value="search" />
                  </label>
                  <Image src="/search.png" width="18" height="18" />
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
