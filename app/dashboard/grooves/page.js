import Link from 'next/link';
import { getGrooves } from '../../../database/grooves';
import styles from './page.module.scss';
import SearchForm from './SearchForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: {
    default: 'Find you Groove',
  },
};

export default async function GroovesPage() {
  const grooves = await getGrooves();
  return (
    <>
      {' '}
      <section className={styles.main}>
        <h1>Find your groove</h1>
        <SearchForm />

        <ul>
          {grooves.map((groove) => {
            return (
              <li key={groove.id}>
                <Link
                  href={`/grooves/${groove.id}`}
                  data-test-id={`product-${groove.id}`}
                >
                  {/* <Image
                    className={styles.img}
                    src={`/images/${groove.type}-${groove.id}.png`}
                    alt={groove.type}
                    width="140"
                    height="140"
                  /> */}
                  <h3>{groove.name}</h3>
                  <h2>
                    {groove.offer} {groove.what_looking_for}
                    {groove.description} {groove.restriction}{' '}
                    {groove.restriction} {groove.location} {groove.label}
                  </h2>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
