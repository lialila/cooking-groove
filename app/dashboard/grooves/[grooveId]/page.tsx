import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGrooveById } from '../../../../database/grooves';
import { grooveNotFoundMetadata } from './not-found';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: Props): Promise<Metadata> {
  const singleGroove = await getGrooveById(parseInt(props.params.grooveId));

  if (!singleGroove) {
    return grooveNotFoundMetadata;
  }

  return {
    title: singleGroove.name,
    description: `{singleGroove.name}`,
  };
}

type Props = {
  params: {
    grooveId: string;
  };
};

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

const MontserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export default async function GroovePage(props: Props) {
  const singleGroove = await getGrooveById(parseInt(props.params.grooveId));

  if (!singleGroove) {
    notFound();
  }

  if (!singleGroove) {
    throw new Error('This action is not allowed');
    // notFound();
  }
  return (
    <section className={styles.main}>
      <div className={courierPrime.className}>
        <div className={styles.div}>
          <h2>{singleGroove.name}</h2>
          <h3>
            {singleGroove.offer} {singleGroove.lookingFor}
          </h3>
          <p>{singleGroove.description}</p>
          <p> {singleGroove.label}</p>
          <p>{singleGroove.date}</p>
          <p>{singleGroove.time}</p>
          <p> {singleGroove.location}</p>
          <form name="inputnumber">
            <button>Participate</button>
            <button>My Grooves</button>
          </form>
        </div>
      </div>
    </section>
  );
}
