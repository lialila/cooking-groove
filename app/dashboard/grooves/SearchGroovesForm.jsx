'use client';
import Link from 'next/link';
import { useState } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
// import { Ingredient } from '../../../database/ingredients';
import styles from './page.module.scss';

export default function SearchGroovesForm(props) {
  const [grooveSearch, setGrooveSearch] = useState('');
  const [ingredientSearch, setIngredientSearch] = useState('');
  const keys = [
    'name',
    'description',
    'offer',
    'location',
    'label',
    'time',
    'date',
    'language',
    'ingredientName',
  ];
  const ingredientKeys = ['ingredientName'];
  console.log('groovesWithIngredients', props.groovesWithIngredients);

  // const groovesFiltered = props.groovesWithIngredients.filter(
  //   (groove) =>
  //     groove.id ===
  //     props.allIngredients.map((ingredient) => ingredient.grooveId),
  // );
  // console.log('groovesFiltered', groovesFiltered);

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
      {/* <label htmlFor="search">
        <input
          placeholder="Search for ingredient..."
          value={ingredientSearch}
          className={styles.searchInput}
          onChange={(e) => setIngredientSearch(e.currentTarget.value)}
        />
      </label>
      <ul>
        {props.allIngredients
          .filter((igredient1) =>
            igredient1.ingredientName
              .toLowerCase()
              .includes(ingredientSearch.toLowerCase()),
          )
          .map((ingredient) => {
            return groovesFiltered.map((groove) => {
              return (
                <li className={styles.div} key={`groove.${groove.id}`}>
                  <p>{groove.name}</p>
                  <p>{groove.ingredient}</p>
                </li>
              );
            });
          })}
      </ul> */}
      <ul>
        {props.groovesWithIngredients
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
                )}{' '}
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
