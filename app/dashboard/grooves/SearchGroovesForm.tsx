'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Groove } from '../../../database/grooves';
import styles from './page.module.scss';

type Props = {
  allGrooves: Groove[];
};

export default function SearchGroovesForm(props: Props) {
  const [grooveSearch, setGrooveSearch] = useState('');

  const keys = [
    'name',
    'description',
    'offer',
    'lookingFor',
    'location',
    'label',
    'time',
    'date',
    'language',
  ];
  // const today = new Date();
  // const date = today.getDate().toString();
  // const month = today.getMonth().toString();
  // const year = today.getFullYear().toString();
  // const currentDate = `${year}.${month}.${date}`;
  // console.log('currentDate', currentDate);

  return (
    <>
      <label htmlFor="search">
        <input
          placeholder="Search for a groove..."
          value={grooveSearch}
          className={styles.searchInput}
          onChange={(e) => setGrooveSearch(e.currentTarget.value)}
        />
      </label>
      {/* <button className={styles.searchButton}>
        <Image
          src="/nav-footer/search-white.png"
          width="32"
          height="30"
          alt="search"
        />{' '}
      </button>{' '} */}
      <ul>
        {props.allGrooves
          // .filter((groove) => groove.date > currentDate)
          .filter((groove) =>
            keys.some((key) =>
              groove[key].toLowerCase().includes(grooveSearch.toLowerCase()),
            ),
          )
          .map((groove) => {
            return (
              <li className={styles.div} key={`groove.${groove.id}`}>
                <Link
                  href={`dashboard/grooves/${groove.id}`}
                  data-test-id={`product-${groove.id}`}
                >
                  <div>
                    <img src={groove.imgUrl} width="150" alt="Groove" />
                  </div>{' '}
                  <h3>{groove.name}</h3>{' '}
                </Link>

                <p>Offer: {groove.offer}</p>
                <p>Looking for: {groove.lookingFor}</p>
                {/* <p>{groove.description}</p> */}
                <p>Location: {groove.location} </p>
                <p>Time: {groove.time}</p>
                <p>date: {groove.date}</p>
                <p> #{groove.label}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
}
