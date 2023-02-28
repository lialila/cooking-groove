import Form from './Form';
import styles from './page.module.scss';

export const metadata = {
  title: {
    default: 'Log in',
  },
};
export default function SignInPAge() {
  return (
    <section className={styles.main}>
      <Form />
    </section>
  );
}
