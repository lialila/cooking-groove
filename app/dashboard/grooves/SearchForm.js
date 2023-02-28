import styles from './page.module.scss';

export default function SearchFrom() {
  return (
    <label htmlFor="search">
      <input className={styles.searchForm} />
    </label>
  );
}
