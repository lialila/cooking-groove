import Link from 'next/link';
import { getGrooves } from '../../../database/grooves';
import styles from './page.module.scss';

// import SearchForm from './SearchForm';

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
        <ul>
          {grooves.map((groove) => {
            return (
              <li key={`groove.${groove.id}`}>
                <Link
                  href={`dashboard/grooves/${groove.id}`}
                  data-test-id={`product-${groove.id}`}
                >
                  <div>
                    <img src={groove.imgUrl} width="150" alt="Groove" />
                  </div>{' '}
                  <h3>{groove.name}</h3>{' '}
                  <p>
                    {groove.offer} {groove.lookingFor}
                    {groove.description} {groove.location} {groove.label}
                  </p>{' '}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
