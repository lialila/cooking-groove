import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../../database/users';
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

  return (
    <div className={styles.main}>
      <h1>{user.username}</h1>
      <p>{user.name}</p>
      <p>eating experience: {user.eatingExperience}</p>
      <p>cooking experience: {user.cookingExperience}</p>
      <p>favourite food: {user.favouriteFood}</p>
      <p>language: {user.language}</p>
    </div>
  );
}
