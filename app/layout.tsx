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
import { getUserBySessionToken, getUsers } from '../database/users';
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
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  // get all users
  const allUsers = await getUsers();
  const userObj = allUsers.find((oneUser) => oneUser.id === user?.id);

  console.log('sessionToken from layout: ', sessionToken?.value);
  // 2. validate that session
  // 3. get the user profile matching the session

  return (
    <html lang="en" className={styles.html}>
      <body className={styles.body}>
        <header className={MontserratText.className}>
          <nav className={MontserratText.className}>
            <ul className={styles.nav}>
              <li>
                <Link href="/">
                  <Image
                    src="/icons-main/icon8yellow.png"
                    width="72"
                    height="72"
                    // src="/icons-main/icon5.png"
                    // width="75"
                    // height="75"
                    alt="logo"
                  />
                </Link>
              </li>
              <Link href="/dashboard/grooves">
                <li>
                  <Image
                    src="/nav-footer/search-white.png"
                    width="32"
                    height="30"
                    alt="search"
                  />
                </li>{' '}
              </Link>
            </ul>
          </nav>
        </header>
        {props.children}
        <footer className={MontserratText.className}>
          <ul className={styles.footer}>
            {user ? (
              <>
                <Link href="/dashboard/grooves/my-grooves" prefetch={false}>
                  <Image
                    src="/icons-main/icon1.png"
                    width="45"
                    height="45"
                    alt="search"
                  />
                </Link>

                <Link href="/dashboard/grooves/create-groove">
                  <li>
                    <Image
                      src="/nav-footer/plusbutton.png"
                      width="24"
                      height="24"
                      alt="search"
                    />
                  </li>{' '}
                </Link>
                <Link href={`dashboard/profile/${user.id}`}>
                  <img
                    className={styles.profileImg}
                    src={userObj.profileImgUrl}
                    width="50"
                    height="50"
                    alt="Profile"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard/registration">create account</Link>
                <Link href="/dashboard/login">log in</Link>
              </>
            )}
          </ul>
        </footer>
      </body>
    </html>
  );
}
