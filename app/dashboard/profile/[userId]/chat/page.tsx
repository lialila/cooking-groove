import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getUserById,
  getUserBySessionToken,
  getUsers,
} from '../../../../../database/users';
import Chat from './Chat';
import styles from './page.module.scss';

type Props = {
  params: {
    userId: number;
  };
};
type sessionUser = {
  id: number;
  name: string;
  email: string;
  csrfSecret: string;
};
export default async function UserIdChat({ params }: Props) {
  const user = await getUserById(params.userId);

  const users = await getUsers();

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const sessionUser = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!sessionUser) {
    return redirect(`/dashboard/login?returnTo=/dashboard/profile/${user.id}`);
  }

  // ably chat
  const ably = new Ably.Realtime.Promise('q9iq5Q.pLvcXg:*****');
  await ably.connection.once('connected');
  console.log('Connected to Ably!');

  return (
    <section className={styles.main}>
      <Chat sessionUser={sessionUser} users={users} />{' '}
    </section>
  );
}
