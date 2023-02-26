// import { Inter } from 'next/font/google';
import Link from 'next/link';
import Form from './Form';
import styles from './page.module.scss';

export const metadata = {
  title: {
    default: 'Create new account',
  },
};

export default function SignUpPage() {
  return (
    <div className={styles.main}>
      <Form />
    </div>
  );
}
