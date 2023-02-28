// import { Inter } from 'next/font/google';
import Form from './Form';
import styles from './page.module.scss';

export const metadata = {
  title: {
    default: 'Log in',
  },
};
export default function SignInPAge() {
  return (
    <main className={styles.main}>
      <Form />
    </main>
  );
}
