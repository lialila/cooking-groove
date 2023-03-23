'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
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

  return (
    <FadeIn>
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
                    {!groove.imgUrl ? (
                      <img
                        src="/backgroundphoto3.jpg"
                        width="150"
                        alt="Groove"
                      />
                    ) : (
                      <img src={groove.imgUrl} width="150" alt="Groove" />
                    )}
                  </div>{' '}
                  <h3>{groove.name}</h3>{' '}
                </Link>

                <p>Offer: {groove.offer}</p>
                <p>Missing ingredient: {groove.lookingFor}</p>
                <p> {groove.location} </p>
                <p>
                  {groove.date} at {groove.time}
                </p>
                {!groove.label ? null : <p># {groove.label}</p>}
              </li>
            );
          })}
      </ul>
    </FadeIn>
  );
}
