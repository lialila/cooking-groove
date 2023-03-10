import './globals.scss';
import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
// import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import styles from './layout.module.scss';

// import LogOut from './LogOut';

export const metadata = {
  title: {
    default: 'Cooking Groove',
    template: '%s | Find your Groove',
  },
};

const CourierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

const MontserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});
type Props = {
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';

export default async function RootLayout(props: Props) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);
  console.log('user from layout', user);

  return (
    <html lang="en" className={styles.html}>
      <body className={styles.body}>
        <header className={MontserratText.className}>
          <nav>
            <ul className={styles.nav}>
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

              {user ? (
                <>
                  <Link href={`dashboard/profile/${user.username}`}>
                    <li>{user.username}</li>
                  </Link>
                  <Link href="/logout" prefetch={false}>
                    Log out
                  </Link>
                  <li>
                    <Link href="/dashboard/grooves/create-groove">
                      <Image
                        src="/plus.png"
                        width="20"
                        height="20"
                        alt="search"
                      />
                    </Link>
                  </li>
                  <Link href="/dashboard/grooves">
                    <li>
                      <Image
                        src="/search.png"
                        width="18"
                        height="18"
                        alt="search"
                      />
                    </li>{' '}
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard/registration">Create account</Link>
                  <Link href="/dashboard/login">Log in</Link>
                </>
              )}
            </ul>
          </nav>
        </header>
        {props.children}
        <footer className={MontserratText.className}>
          <ul className={styles.footer}>
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
          </ul>
        </footer>
      </body>
    </html>
  );
}
