'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.scss';

// type Props = {
//   allGrooves: Groove[];
// };

export default function SearchFrom() {
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
