'use client';
import { Courier_Prime, Inter, Montserrat } from '@next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './layout.module.scss';

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

export default function Footer(props) {
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlFooter = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlFooter);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlFooter);
      };
    }
  }, [lastScrollY]);

  return (
    <footer className={`active ${show && 'hidden'}`}>
      <ul className={montserratText.className}>
        {props.user ? (
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
              <Link href={`dashboard/profile/${props.user.id}`}>
                {!props.userObj?.profileImgUrl ? (
                  <img
                    src="/default-profile-picture/defult-profile.jpg"
                    width="50"
                    alt="Profile"
                    className={styles.img}
                  />
                ) : (
                  <img
                    className={styles.profileImg}
                    src={props.userObj.profileImgUrl}
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
                <Link className={styles.defaultImgDiv} href="/dashboard/login">
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
    </footer>
  );
}
