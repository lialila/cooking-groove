import { getGrooves } from '../../../../database/grooves';
import CreateGrooveForm from './CreateGrooveForm';
import styles from './page.module.scss';

export default async function CreateGroove() {
  const grooves = await getGrooves();
  return (
    <div className={styles.main}>
      <div className={styles.div}>
        <CreateGrooveForm grooves={grooves} />
      </div>
    </div>
  );
}
