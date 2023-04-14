import { Courier_Prime, Montserrat } from '@next/font/google';
import Link from 'next/link';
import styles from './page.module.scss';

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});
const montserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});
export default function PageLayout() {
  return (
    <div className={`${styles.page} ${courierPrime.className}`}>
      <h3 className={montserratText.className}>
        Welcome to the Cooking Groove!
      </h3>

      <h4>
        Got too much food? Got too much hunger? Got too many cooking ideas? New
        in the city and don't know where to meet buddies who are also in love
        with eating and cooking?
      </h4>
      <p>
        Cooking Groove got you covered! You can create your own cooking group,
        or join an existing one. You can also search for cooking groups by
        location, cuisine, or even by the name of the group. You can add missing
        ingredients to your group and mark the ingredients you will bring to the
        grooves you are participating in.
      </p>
      <div className={styles.buttons}>
        {' '}
        <Link href="dashboard/login">
          <button className={courierPrime.className}>Log in</button>
        </Link>{' '}
        <Link href="dashboard/registration">
          Don't have an account yet? Create account
        </Link>{' '}
      </div>
    </div>
  );
}
