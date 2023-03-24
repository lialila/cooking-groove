'use client';
import { Courier_Prime, Montserrat } from '@next/font/google';
// import { v2 as cloudinary } from 'cloudinary';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
// import DatePicker from 'react-date-picker';
import { Groove } from '../../../../database/grooves';
import styles from './page.module.scss';

type Props = {
  grooves: Groove[];
  userId: number;
  // groove: Groove[];
  csrfToken: string;
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
  const router = useRouter();

  const [grooves, setGrooves] = useState<Groove[]>(props.grooves);
  const [name, setName] = useState<string>('');
  const [offer, setOffer] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [error, setError] = useState<string>();
  const [imgUrl, setImgUrl] = useState<string>('');
  const [ingredientName, setIngredientName] = useState<string>('');
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const file = event.target.elements.fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my-uploads');

    try {
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const cloudinaryData = await cloudinaryResponse.json();
      if (!cloudinaryData.secure_url) {
        setImgUrl(
          'https://res.cloudinary.com/drjnxvwj6/image/upload/v1679593543/my-uploads/de5z82cg7qcahlobdqdt.jpg',
        );
      }
      const imgUrl1 = cloudinaryData.secure_url;

      setImgUrl(imgUrl1);
      const apiResponse = await fetch('/dashboard/api/grooves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          offer,
          description,
          location,
          label,
          imgUrl,
          userId: props.userId,
          time,
          date,
          language,
          csrfToken: props.csrfToken,
          ingredientName,
        }),
      });
      const apiData = await apiResponse.json();

      if (apiData.error) {
        setError(apiData.error);
        return;
      }

      setGrooves([...grooves, apiData.groove]);

      router.replace(`/dashboard/grooves/${apiData.groove.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`${courierPrime.className} ${styles.div}`}>
      <h3 className={montserratText.className}>Create Groove</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <br />
        <FadeIn>
          <label>
            Groove name:
            <input
              value={name}
              required
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            {' '}
            What you got for the groove:
            <input
              value={offer}
              required
              onChange={(e) => setOffer(e.currentTarget.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Add missing ingredient:{' '}
            <input
              value={ingredientName}
              onChange={(e) => setIngredientName(e.currentTarget.value)}
            />{' '}
          </label>
          <br />
          <label>
            Concept:
            <input
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />{' '}
          </label>{' '}
          <br />
          <label>
            Location:
            <input
              value={location}
              onChange={(e) => setLocation(e.currentTarget.value)}
            />
          </label>{' '}
          <br />
          <p>Choose a label</p>
          <select
            placeholder="Your label"
            value={label}
            onChange={(e) => setLabel(e.currentTarget.value)}
          >
            <option defaultValue="Choose the label">Choose the label</option>

            <option>Vegeterian</option>
            <option>Vegan</option>
            <option>Gluten free</option>
            <option>Diabetic</option>
            <option>Pescatarian</option>
            <option>Carnivore</option>
            <option>Kosher</option>
            <option>Halal</option>
            <option>Raw</option>
            <option>Organic</option>
          </select>
          <br />
          <label>
            Time:
            <input
              type="time"
              value={time}
              required
              onChange={(e) => setTime(e.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            Date:
            <input
              value={date}
              type="date"
              required
              onChange={(e) => setDate(e.currentTarget.value)}
            />{' '}
          </label>{' '}
          <br />
          <label>
            Language:
            <input
              value={language}
              required
              onChange={(e) => setLanguage(e.currentTarget.value)}
            />{' '}
          </label>{' '}
          <br />
          <label>
            Upload image:
            <input type="file" name="fileInput" />
          </label>
          <button onSubmit={() => handleSubmit}>Create</button>
          {typeof error === 'string' && (
            <div style={{ color: 'red' }}>{error}</div>
          )}
        </FadeIn>
      </form>
    </div>
  );
}
