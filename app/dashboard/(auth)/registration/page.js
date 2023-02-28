import styles from './page.module.scss';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: {
    default: 'Create new account',
  },
};

export default function RegistrationPage() {
  return (
    <div className={styles.main}>
      <RegisterForm />
    </div>
  );
}
