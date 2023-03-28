import { Courier_Prime } from '@next/font/google';
import { cookies } from 'next/headers';
import { getGrooves } from '../../../../database/grooves';
import { getUserBySessionToken } from '../../../../database/users';
import Carousel from './Carousel';
import MyGrooves from './MyGrooves';
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
  const myGrooves = grooves.filter((groove) => groove.userId === user.id);

  return (
    <div className={`${courierPrime.className} ${styles.main}`}>
      <h3 className={styles.textForList}>My grooves</h3>
      {/* <MyGrooves myGrooves={myGrooves} user={user} /> */}
      <Carousel myGrooves={myGrooves} />
    </div>
  );
}
