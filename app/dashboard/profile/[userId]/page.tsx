import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  getUserById,
  getUserBySessionToken,
  getUserByUsername,
  getUsers,
  User,
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
};
type SessionUser = {
  id: number;
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
type user = User[];

export default async function UserIdProfile({ params }: Props) {
  const user = await getUserById(params.userId);
  console.log('userId from profile page: ', params.userId);
  const users = await getUsers();

  if (!user) {
    notFound();
  }

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const sessionUser = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  console.log('user: in editUser page', user);
  console.log('users in editUSer page: ', users);
  console.log('params in editUser page: ', params);
  console.log('params.userId in editUser page: ', params.userId);
  console.log('sessionsUser in editUser page: ', sessionUser);

  return (
    <section className={styles.main}>
      <EditUserForm sessionUser={sessionUser} user={user} users={users} />
    </section>
  );
}
