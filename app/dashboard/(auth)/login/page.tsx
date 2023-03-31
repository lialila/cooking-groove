import { Montserrat } from '@next/font/google';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../../database/sessions';
import Form from './Form';
import styles from './page.module.scss';

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function LoginPAge(props: Props) {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (session) {
    redirect('/');
  }

  return (
    <section className={styles.main}>
      <Form returnTo={props.searchParams.returnTo} />
    </section>
  );
}
