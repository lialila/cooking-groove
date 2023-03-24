import { Courier_Prime, Montserrat } from '@next/font/google';
import { getGrooves, Groove } from '../../../database/grooves';
import { getIngredients } from '../../../database/ingredients';
import styles from './page.module.scss';
import SearchGroovesForm from './SearchGroovesForm';

export const dynamic = 'force-dynamic';

interface Metadata {
  title: {
    default: string;
  };
}
type AllGrooves = {
  [key: string]: string;
  id: number;
  name: string;
  description: string;
  offer: string;
  location: string;
  label: string;
  time: string;
  date: string;
  language: string;
  imgUrl: string;
}[];
export const metadata: Metadata = {
  title: {
    default: 'Find you Groove',
  },
};
const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});
export default async function GroovesPage() {
  const allGrooves: Groove[] = await getGrooves();

  const allIngredients = await getIngredients();

  return (
    <>
      {' '}
      <section className={`${styles.main} ${courierPrime.className}`}>
        <SearchGroovesForm
          allGrooves={allGrooves}
          allIngredients={allIngredients}
        />
      </section>
    </>
  );
}
