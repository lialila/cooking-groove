'use client';
import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.scss';

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

const MontserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export default function From() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form className={styles.form}>
      <label htmlFor="userName">
        User name:
        <input
          data-test-id="checkout-first-name"
          value={userName}
          required
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="email">E-mail:</label>
      <input
        type="email"
        data-test-id="checkout-email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <div>
        <Link href="/../signUp">
          <button
          //  disabled={userName.length === 0 || email.length === 0}
          >
            Sign up
          </button>
        </Link>{' '}
        <Link href="/">
          <button>Log in</button>
        </Link>
      </div>
    </form>
  );
}
