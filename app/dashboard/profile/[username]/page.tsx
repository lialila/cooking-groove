import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserByUsername,
} from '../../../../database/users';
import styles from './page.module.scss';

type Props = {
  params: {
    username: string;
    eatingExperience: string;
    cookingExperience: string;
    favouriteFood: string;
    language: string;
  };
};

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);

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
    <div className={styles.main}>
      <div>
        <h1>{user.username}</h1>
        <p>{user.name}</p>
        <p>eating experience: {user.eatingExperience}</p>
        <p>cooking experience: {user.cookingExperience}</p>
        <p>favourite food: {user.favouriteFood}</p>
        <p>language: {user.language}</p>
        <Link href="/dashboard/grooves/my-grooves">
          {sessionUser && sessionUser.id === user.id ? (
            <button>My grooves</button>
          ) : (
            <h4>Access denied</h4>
          )}
        </Link>
      </div>
    </div>
  );
}
