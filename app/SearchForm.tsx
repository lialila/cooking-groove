'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Groove } from '../database/grooves';
import styles from './layout.module.scss';

type Props = {
  allGrooves: Groove[];
};

export default function SearchFrom(props: Props) {
  // const [grooveSearch, setGrooveSearch] = useState('');

  // console.log('grooveSearch', grooveSearch);
  // function handleOnSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   const search = e.currentTarget.value;
  //   const filteredGrooves = props.allGrooves.filter(
  //     (groove) => groove.name.toLowerCase().includes(search.toLowerCase()),
  //     // ||
  //     // groove.description.toLowerCase().includes(search.toLowerCase()) ||
  //     // groove.language.toLowerCase().includes(search.toLowerCase()) ||
  //     // groove.location.toLowerCase().includes(search.toLowerCase()),
  //   );
  //   console.log(filteredGrooves);
  // }

  return (
    <>
      {' '}
      <Link href="/dashboard/grooves">
        <label htmlFor="search">
          <input
            placeholder="Search for a groove..."
            // value={grooveSearch}
            className={styles.searchInput}
            // onChange={(e) => setGrooveSearch(e.currentTarget.value)}
          />
        </label>

        <button className={styles.searchButton}>
          <Image
            src="/nav-footer/search-white.png"
            width="32"
            height="30"
            alt="search"
          />{' '}
        </button>
      </Link>
    </>
  );
}
