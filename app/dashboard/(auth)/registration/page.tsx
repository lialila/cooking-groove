import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../../database/sessions';
import styles from './page.module.scss';
import RegisterForm from './RegisterForm';

interface Metadata {
  title: {
    default: string;
  };
}

export const metadata: Metadata = {
  title: {
    default: 'Create new account',
  },
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function RegistrationPage(props: Props) {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // if yes redirect to home
  if (session) {
    redirect('/');
  }

  return (
    <div className={styles.main}>
      <RegisterForm returnTo={props.searchParams.returnTo} />
    </div>
  );
}
