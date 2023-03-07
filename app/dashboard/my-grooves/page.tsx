import { getGrooves } from '../../../database/grooves';

export default async function MyGrooves() {
  const grooves = await getGrooves();

  return (
    <div>
      <label>
        Name:
        <input />
      </label>
      <label>
        Name:
        <input />
      </label>
      <label>
        Name:
        <input />
      </label>
      <label>
        Name:
        <input />
      </label>
      <label>
        Name:
        <input />
      </label>
      <label>
        Name:
        <input />
      </label>
      <label>
        Name:
        <input />
      </label>
      <label>
        Name:
        <input />
      </label>
      <label>
        Name:
        <input />
      </label>
      <label>
        Name:
        <input />
      </label>
      <label>
        Name:
        <input />
      </label>
    </div>
  );
}
