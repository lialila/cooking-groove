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

export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }) {
  return (
    <section className={styles.html}>
      <div className={`${montserratText.className} ${styles.body}`}>
        {children}
      </div>
    </section>
  );
}
