import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getGrooves } from '../../../../database/grooves';
import { getUserBySessionToken } from '../../../../database/users';
import CreateGrooveForm from './CreateGrooveForm';
import styles from './page.module.scss';

export default async function CreateGroove() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);
  console.log('user from create groove page', user);

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

  return (
    <div className={styles.main}>
      <div className={styles.div}>
        <CreateGrooveForm grooves={grooves} userId={userId} />
      </div>
    </div>
  );
}
