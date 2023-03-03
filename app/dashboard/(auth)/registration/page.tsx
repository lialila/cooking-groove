import styles from './page.module.scss';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: {
    default: 'Create new account',
  },
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default function RegistrationPage(props: Props) {
  return (
    <div className={styles.main}>
      <RegisterForm returnTo={props.searchParams.returnTo} />
    </div>
  );
}
