import { Courier_Prime } from '@next/font/google';
import { cookies } from 'next/headers';
import { getGrooves } from '../../../../database/grooves';
import { getUserBySessionToken } from '../../../../database/users';
import { getUsersgroovesByUserId } from '../../../../database/usersgrooves';
import MyGroovesParticipation from './MyGroovesParticipation';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: {
    default: 'My Grooves',
  },
};

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

export default async function MyGroovesPage() {
  const grooves = await getGrooves();

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    return;
  }

  // array of object with userid with current user id
  const usersgrooves = await getUsersgroovesByUserId(user.id);

  // get the grooves i participate in, returns an array of objects
  const myParticipatingGrooves = grooves.filter((groove) => {
    return usersgrooves.some(
      (usersgroove) => usersgroove.grooveId === groove.id,
    );
  });

  return (
    <div className={`${courierPrime.className} ${styles.main}`}>
      <MyGroovesParticipation myParticipatingGrooves={myParticipatingGrooves} />
    </div>
  );
}
