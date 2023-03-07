'use client';
import { Courier_Prime, Montserrat } from '@next/font/google';
import { useState } from 'react';
import { Groove } from '../../../../database/grooves';
import styles from './page.module.scss';

type Props = {
  grooves: Groove[];
};

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

const montserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export default function CreateGrooveForm(props: Props) {
  const [grooves, setGrooves] = useState<Groove[]>(props.grooves);

  const [name, setName] = useState<string>('');
  const [offer, setOffer] = useState<string>('');
  const [lookingFor, setLookingFor] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [error, setError] = useState<string>();

  return (
    <form className={styles.form}>
      <h3>Create Groove</h3>
      <label className={courierPrime.className}>
        UserId (change!!)
        <input
          value={userId}
          required
          onChange={(e) => setUserId(e.currentTarget.value)}
        />
      </label>
      <br />
      <label className={courierPrime.className}>
        Groove name:
        <input
          value={name}
          required
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </label>
      <br />
      <label className={courierPrime.className}>
        {' '}
        What you got for the groove:
        <input
          value={offer}
          required
          onChange={(e) => setOffer(e.currentTarget.value)}
        />
      </label>
      <br />
      <label className={courierPrime.className}>
        What ingridients do you miss for the groove:{' '}
        <input
          value={lookingFor}
          required
          onChange={(e) => setLookingFor(e.currentTarget.value)}
        />{' '}
      </label>
      <br />
      <label className={courierPrime.className}>
        Describe the idea of your groove:
        <input
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />{' '}
      </label>{' '}
      <br />
      <label className={courierPrime.className}>
        location:
        <input
          value={location}
          onChange={(e) => setLocation(e.currentTarget.value)}
        />
      </label>{' '}
      <br />
      <label className={courierPrime.className}>
        label:
        <input
          value={label}
          onChange={(e) => setLabel(e.currentTarget.value)}
        />{' '}
      </label>{' '}
      <br />
      <label className={courierPrime.className}>
        imgUrl
        <input
          value={imgUrl}
          onChange={(e) => setImgUrl(e.currentTarget.value)}
        />{' '}
      </label>{' '}
      <label className={courierPrime.className}>
        time:
        <input
          value={time}
          required
          onChange={(e) => setTime(e.currentTarget.value)}
        />
      </label>
      <br />
      <label className={courierPrime.className}>
        Date:
        <input
          value={date}
          required
          onChange={(e) => setDate(e.currentTarget.value)}
        />{' '}
      </label>{' '}
      <br />
      <label className={courierPrime.className}>
        Language:
        <input
          value={language}
          required
          onChange={(e) => setLanguage(e.currentTarget.value)}
        />{' '}
      </label>{' '}
      <br />
      <button
        className={courierPrime.className}
        onClick={async () => {
          const response = await fetch('/dashboard/api/grooves', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              name,
              offer,
              lookingFor,
              description,
              location,
              label,
              imgUrl,
              userId,
              time,
              date,
              language,
            }),
          });
          const data = await response.json();
          console.log(data);

          if (data.error) {
            setError(data.error);
            return;
          }
          // you should use this
          // router.refresh();

          setGrooves([...grooves, data.groove]);
        }}
      >
        Create a Groove
      </button>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}
