import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserByUsername,
  getUsers,
  User,
} from '../../../../database/users';
import EditUserForm from './EditUserForm';
import styles from './page.module.scss';

type Props = {
  params: {
    username: string;
    profileImgUrl: string;
    eatingExperience: string;
    cookingExperience: string;
    favouriteFood: string;
    language: string;
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

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);

  const users = await getUsers();

  if (!user) {
    notFound();
  }

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const sessionUser = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  // console.log('sessionUser.id from profile page: ', sessionUser.id);
  // console.log('user.id from profile page: ', user.id);

  return (
    <section className={styles.main}>
      <EditUserForm sessionUser={sessionUser} user={user} users={users} />
    </section>
  );
}
