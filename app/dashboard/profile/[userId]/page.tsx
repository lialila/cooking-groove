import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getUserById,
  getUserBySessionToken,
  getUsers,
} from '../../../../database/users';
import EditUserForm from './EditUserForm';
import styles from './page.module.scss';

type Props = {
  params: {
    userId: number;
    username: string;
    name: string;
    email: string;
    profileImgUrl: string;
    eatingExperience: string;
    cookingExperience: string;
    favouriteFood: string;
    language: string;
    password: string;
  };
  csrfToken: string;
};
type SessionUser = {
  id: number;
  username: string;
  csrfToken: string;
};

export default async function UserIdProfile({ params }: Props) {
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

  return (
    <section className={styles.main}>
      <EditUserForm sessionUser={sessionUser} user={user} users={users} />
    </section>
  );
}
