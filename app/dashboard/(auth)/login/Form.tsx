'use client';
import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBody } from '../../api/(auth)/register/route';
import styles from './page.module.scss';

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

const montserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export default function Form(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();

        const response = await fetch('/dashboard/api/login', {
          method: 'POST',
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const data: RegisterResponseBody = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }

        if (
          props.returnTo &&
          !Array.isArray(props.returnTo) &&
          // This is checking that the return to is a valid path in your application and not going to a different domain
          /^\/[a-zA-Z0-9-?=/]*$/.test(props.returnTo)
        ) {
          router.push(props.returnTo);
          return;
        }

        router.replace(`/profile/${data.user.username}`);
        router.refresh();
      }}
    >
      {errors.map((error) => (
        <div key={`error-${error.message}`}>Error: {error.message}</div>
      ))}
      <label htmlFor="username" className={courierPrime.className}>
        Username:
        <input
          data-test-id="checkout-first-name"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="password" className={courierPrime.className}>
        password:
      </label>
      <input
        type="password"
        data-test-id="checkout-password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <div>
        <button className={courierPrime.className}>Log in</button>
      </div>
    </form>
  );
}
