import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getUserById, getUserBySessionToken } from '../../../../database/users';
import styles from './page.module.scss';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: {
    default: 'Create new account',
  },
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function RegistrationPage(props: Props) {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  console.log(sessionTokenCookie);

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // if yes redirect to home
  if (session) {
    redirect('/');
  }
  // const user = await getUserBySessionToken(session);
  // const userId = user?.id;
  console.log('session from registration page', session);
  return (
    <div className={styles.main}>
      <RegisterForm
        // user={user}
        // userId={userId}
        returnTo={props.searchParams.returnTo}
      />
    </div>
  );
}
