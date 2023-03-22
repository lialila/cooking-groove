import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getGrooves } from '../../../../database/grooves';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getUserBySessionToken } from '../../../../database/users';
import { createTokenFromSecret } from '../../../../utils/csrf';
import CreateGrooveForm from './CreateGrooveForm';
import styles from './page.module.scss';

type Props = {
  grooves: Groove[];
  userId: number;
  groove: Groove;
  csrfToken: string;
};

export default async function CreateGroove() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 2. validate that session
  // 3. get the user profile matching the session

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);
  console.log('user from create groove page', user);

  if (!session) {
    return redirect(`/dashboard/login?returnTo=/dashboard/profile/${user.id}`);
  }

  if (!user) {
    redirect('/dashboard/login');
  }
  console.log('user.id: ', user.id);
  if (!user.id) {
    redirect('/dashboard/login');
  }
  const userId = user.id;
  const grooves = await getGrooves();
  console.log('userId from create groove page: ', userId);

  const groove = grooves.find((groove) => groove.userId === userId);

  const csrfToken = createTokenFromSecret(session.csrfSecret);

  return (
    <div className={styles.main}>
      <CreateGrooveForm
        grooves={grooves}
        userId={userId}
        className={styles.div}
        groove={groove}
        csrfToken={csrfToken}
      />
    </div>
  );
}
