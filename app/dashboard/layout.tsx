import { Montserrat } from '@next/font/google';
import styles from './layout.module.scss';

// const courierPrime = Courier_Prime({
//   weight: '400',
//   subsets: ['latin'],
// });

const montserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

type Props = {
  children: React.ReactNode;
};
export const dynamic = 'force-dynamic';

export default function DashboardLayout(props: Props) {
  return (
    <section className={styles.html}>
      <div className={`${montserratText.className} ${styles.body}`}>
        {props.children}
      </div>
    </section>
  );
}
