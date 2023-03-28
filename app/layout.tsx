import './globals.scss';
import { Courier_Prime, Inter, Montserrat } from '@next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Groove } from '../database/grooves';
import { getUserBySessionToken, getUsers } from '../database/users';
import Footer from './Footer';
import styles from './layout.module.scss';

export const metadata = {
  title: {
    default: 'Cooking Groove',
    template: '%s | Find your Groove',
  },
};

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});
const inter = Inter({
  weight: '400',
  subsets: ['latin'],
});
const montserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});
type Props = {
  children: React.ReactNode;
  allGrooves: Groove[];
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

  return (
    <html lang="en" className={styles.html}>
      <body className={styles.body}>
        <header className={montserratText.className}>
          <nav className={montserratText.className}>
            <ul className={styles.nav}>
              <li>
                <Link href="/">
                  <Image
                    src="/icons-main/icon8yellow.png"
                    width="72"
                    height="72"
                    alt="logo"
                    className={styles.logo}
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className={styles.children}>{props.children}</div>
        <Footer user={user} userObj={userObj} />
        {/* <footer className={montserratText.className}>
          <ul>
            {user ? (
              <div className={styles.footer}>
                <li>
                  <Link href="/dashboard/grooves">
                    <Image
                      src="/nav-footer/searchclassic.png"
                      width="32"
                      height="30"
                      alt="search"
                    />{' '}
                  </Link>
                </li>{' '}
                <li>
                  <Link href="/dashboard/grooves/create-groove">
                    <Image
                      src="/nav-footer/plusbutton.png"
                      width="27"
                      height="27"
                      alt="search"
                    />
                  </Link>{' '}
                </li>{' '}
                <li>
                  {' '}
                  <Link href={`dashboard/profile/${user.id}`}>
                    {!userObj?.profileImgUrl ? (
                      <img
                        src="/default-profile-picture/defult-profile.jpg"
                        width="50"
                        alt="Profile"
                        className={styles.img}
                      />
                    ) : (
                      <img
                        className={styles.profileImg}
                        src={userObj.profileImgUrl}
                        width="40"
                        // height="50"
                        alt="Profile"
                      />
                    )}
                  </Link>
                </li>
              </div>
            ) : (
              <div className={courierPrime.className}>
                <div className={styles.footer}>
                  <li>
                    <Link href="/dashboard/grooves">
                      <Image
                        src="/nav-footer/searchclassic.png"
                        width="25"
                        height="25"
                        alt="search"
                      />{' '}
                    </Link>
                  </li>{' '}
                  <li>
                    <Link
                      className={styles.defaultImgDiv}
                      href="/dashboard/registration"
                    >
                      <Image
                        src="/nav-footer/sign-up.png"
                        width="20"
                        height="20"
                        alt="search"
                      />{' '}
                      <p> sign up</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.defaultImgDiv}
                      href="/dashboard/login"
                    >
                      <img
                        alt="profile"
                        src="/default-profile-picture/defult-profile.jpg"
                        width="25"
                        className={styles.img}
                      />
                      <p>log in</p>
                    </Link>
                  </li>
                </div>
              </div>
            )}
          </ul>
        </footer> */}
      </body>
    </html>
  );
}
