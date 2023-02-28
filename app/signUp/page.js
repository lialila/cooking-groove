// import { Inter } from 'next/font/google';
import Link from 'next/link';
import styles from './page.module.scss';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: {
    default: 'Create new account',
  },
};

export default function SignUpPage() {
  return (
    <div className={styles.main}>
      <RegisterForm />
    </div>
  );
}
