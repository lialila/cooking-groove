'use client';
import Link from 'next/link';
import { useState } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
// import { Ingredient } from '../../../database/ingredients';
import styles from './page.module.scss';

// type Props = {
//   allGrooves: {
//     [key: string]: string;
//     id: number;
//     name: string;
//     description: string;
//     offer: string;
//     location: string;
//     label: string;
//     time: string;
//     date: string;
//     language: string;
//     imgUrl: string;
//   }[];

//   allIngredients: Ingredient[];
// };

export default function SearchGroovesForm(props) {
  const [grooveSearch, setGrooveSearch] = useState('');

  const keys = [
    'name',
    'description',
    'offer',
    'location',
    'label',
    'time',
    'date',
    'language',
  ];

  return (
    <FadeIn className={styles.div}>
      <label htmlFor="search">
        <input
          placeholder="Search for a groove..."
          value={grooveSearch}
          className={styles.searchInput}
          onChange={(e) => setGrooveSearch(e.currentTarget.value)}
        />
      </label>

      <ul>
        {props.allGrooves
          .filter((groove) =>
            keys.some(
              (key) =>
                typeof groove[key] === 'string' &&
                groove[key].toLowerCase().includes(grooveSearch.toLowerCase()),
            ),
          )
          .map((groove) => {
            const ingredients = props.allIngredients.filter(
              (ingredient) => ingredient.grooveId === groove.id,
            );

            return (
              <li className={styles.div} key={`groove.${groove.id}`}>
                <Link
                  href={`dashboard/grooves/${groove.id}`}
                  data-test-id={`product-${groove.id}`}
                >
                  <h3>{groove.name}</h3>{' '}
                </Link>
                <p>
                  {groove.date} at {groove.time}
                </p>
                <p>Offer: {groove.offer}</p>
                {ingredients.length > 1 ? (
                  <p>Missing ingredients:</p>
                ) : (
                  <p>Missing ingredient:</p>
                )}
                {ingredients.map((ingredient) => {
                  return (
                    <p key={`ingredient.${ingredient.id}`}>
                      {ingredient.ingredientName}
                    </p>
                  );
                })}
                <p> {groove.location} </p>
                {!groove.label ? null : <p># {groove.label}</p>}
                <div>
                  {!groove.imgUrl ? (
                    <img src="/groove-default.jpeg" width="150" alt="Groove" />
                  ) : (
                    <img src={groove.imgUrl} width="150" alt="Groove" />
                  )}
                </div>{' '}
                <Link
                  className={styles.linkView}
                  href={`dashboard/grooves/${groove.id}`}
                  data-test-id={`product-${groove.id}`}
                >
                  View
                </Link>
              </li>
            );
          })}
      </ul>
    </FadeIn>
  );
}
