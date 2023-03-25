import styles from './page.module.scss';

export const grooveNotFoundMetadata = {
  title: 'Groove Not Found',
  description: "sorry, didn't find the groove you are looking for",
};

export default function GrooveNotFound() {
  return (
    <section className={styles.main}>
      <div
      // </section>className={styles.div}
      >
        Sorry, this Groove was not found
      </div>
    </section>
  );
}
