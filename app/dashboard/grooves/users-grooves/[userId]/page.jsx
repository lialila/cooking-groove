import { Courier_Prime } from '@next/font/google';
import { cookies } from 'next/headers';
import { getGrooves } from '../../../../../database/grooves';
import { getUserBySessionToken, getUsers } from '../../../../../database/users';
import styles from './page.module.scss';
import UsersGrooves from './UsersGrooves';

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

export default async function MyGroovesPage(props) {
  const grooves = await getGrooves();

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const sessionUser = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!sessionUser) {
    return;
  }

  const userId = parseInt(props.params.userId);

  const groovesUserHosts = grooves.filter((groove) => groove.userId === userId);

  const users = await getUsers();

  const user = users.find((singleUser) => singleUser.id === userId);

  console.log('user: ', user);
  return (
    <div className={`${courierPrime.className} ${styles.main}`}>
      <UsersGrooves
        userId={userId}
        sessionUser={sessionUser}
        user={user}
        grooves={grooves}
        groovesUserHosts={groovesUserHosts}
      />
    </div>
  );
}
