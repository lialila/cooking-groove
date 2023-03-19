import Link from 'next/link';
import { getGrooves, Groove } from '../../../database/grooves';
import styles from './page.module.scss';
import SearchGroovesForm from './SearchGroovesForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: {
    default: 'Find you Groove',
  },
};

type Props = {
  allGrooves: Groove[];
};

export default async function GroovesPage() {
  const allGrooves = await getGrooves();

  return (
    <>
      {' '}
      <section className={styles.main}>
        <SearchGroovesForm allGrooves={allGrooves} />
      </section>
    </>
  );
}
