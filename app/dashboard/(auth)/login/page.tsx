import Form from './Form';
import styles from './page.module.scss';

type Props = { searchParams: { returnTo?: string | string[] } };

export default function LoginPAge(props: Props) {
  return (
    <section className={styles.main}>
      <Form returnTo={props.searchParams.returnTo} />
    </section>
  );
}
