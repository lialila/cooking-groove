import { Courier_Prime } from '@next/font/google';
import {
  getGrooves,
  getGroovesWithIngredients,
} from '../../../database/grooves';
import { getIngredients } from '../../../database/ingredients';
import styles from './page.module.scss';
import SearchGroovesForm from './SearchGroovesForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: {
    default: 'Find you Groove',
  },
};
const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});
export default async function GroovesPage() {
  const groovesWithIngredients = await getGrooves();

  const allIngredients = await getIngredients();
  const groovesWithIngredientsPrep = await getGroovesWithIngredients();

  // const groovesWithIngredientsAlternative = {
  //   id: groovesWithIngredients.id,
  //   name: groovesWithIngredientsPrep.name,
  //   offer: groovesWithIngredientsPrep.offer,
  //   description: groovesWithIngredientsPrep.description,
  //   location: groovesWithIngredientsPrep.location,
  //   label: groovesWithIngredientsPrep.label,
  //   imgUrl: groovesWithIngredientsPrep.imgUrl,
  //   userId: groovesWithIngredientsPrep.userId,
  //   time: groovesWithIngredientsPrep.time,
  //   date: groovesWithIngredientsPrep.date,
  //   language: groovesWithIngredientsPrep.language,
  //   grooveId: groovesWithIngredientsPrep.grooveId,
  //   ingredientName: groovesWithIngredientsPrep.map((ingredient) => {
  //     return {
  //       ingredientName: ingredient.ingredientName,
  //     };
  //   }),
  // };
  // console.log(
  //   'groovesWithIngredientsAlternative: ',
  //   groovesWithIngredientsAlternative,
  // );
  return (
    <>
      {' '}
      <section className={`${styles.main} ${courierPrime.className}`}>
        <SearchGroovesForm
          // allGrooves={allGrooves}
          allIngredients={allIngredients}
          groovesWithIngredients={groovesWithIngredients}
        />
      </section>
    </>
  );
}
