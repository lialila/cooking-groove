'use client';
import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../../utils/validation';
import { RegisterResponseBody } from '../../api/(auth)/register/route';
import styles from './page.module.scss';

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

const montserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});
export default function RegisterForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImgUrl, setProfileImgUrl] = useState<string>('');
  const [eatingExperience, setEatingExperience] = useState('');
  const [cookingExperience, setCookingExperience] = useState('');
  const [favouriteFood, setFavouriteFood] = useState('');
  const [language, setLanguage] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const file = event.target.elements.fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my-uploads');

    try {
      const cloudinaryResponse = await fetch(
        'https://api.cloudinary.com/v1_1/drjnxvwj6/upload',
        {
          method: 'POST',
          body: formData,
        },
      );
      const cloudinaryData = await cloudinaryResponse.json();
      const profileImgUrl1 = cloudinaryData.secure_url;

      setProfileImgUrl(profileImgUrl1);
      event.preventDefault();

      const response = await fetch('/dashboard/api/register', {
        method: 'POST',
        body: JSON.stringify({
          username,
          name,
          email,
          profileImgUrl,
          eatingExperience,
          cookingExperience,
          favouriteFood,
          language,
          password,
        }),
      });

      const data: RegisterResponseBody = await response.json();

      if ('errors' in data) {
        setErrors(data.errors);
        return;
      } else {
        router.refresh();
      }

      const returnTo = getSafeReturnToPath(props.returnTo);

      if (returnTo) {
        router.push(returnTo);
        return;
      }

      router.replace(`/dashboard/profile/${data.user.username}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {errors.map((error) => (
        <div key={`error-${error.message}`}>Error: {error.message}</div>
      ))}
      <label htmlFor="username" className={courierPrime.className}>
        Username:
        <input
          data-test-id="username"
          value={username}
          required
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </label>
      <br />
      <label htmlFor="name" className={courierPrime.className}>
        Name:{' '}
      </label>
      <input
        data-test-id="name"
        value={name}
        required
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      <label htmlFor="email" className={courierPrime.className}>
        E-mail:
      </label>
      <input
        type="email"
        data-test-id="email"
        value={email}
        required
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      <label htmlFor="eatingExperience" className={courierPrime.className}>
        Eating experience:
      </label>
      <input
        data-test-id="eatingExperience"
        value={eatingExperience}
        required
        onChange={(e) => setEatingExperience(e.currentTarget.value)}
      />{' '}
      <br />
      <label htmlFor="cookingExperience" className={courierPrime.className}>
        Cooking experience:
      </label>
      <input
        data-test-id="cookingExperience"
        value={cookingExperience}
        required
        onChange={(e) => setCookingExperience(e.currentTarget.value)}
      />{' '}
      <br />
      <label htmlFor="favouriteFood" className={courierPrime.className}>
        Favourite food:
      </label>
      <input
        data-test-id="favouriteFood"
        value={favouriteFood}
        required
        onChange={(e) => setFavouriteFood(e.currentTarget.value)}
      />{' '}
      <br />
      <label htmlFor="language" className={courierPrime.className}>
        Language:
      </label>
      <input
        data-test-id="language"
        value={language}
        required
        onChange={(e) => setLanguage(e.currentTarget.value)}
      />{' '}
      <label htmlFor="password" className={courierPrime.className}>
        Password:
      </label>
      <input
        data-test-id="password"
        value={password}
        required
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <label className={courierPrime.className}>
        Upload image:
        <input type="file" name="fileInput" />
      </label>
      <br />
      <button className={courierPrime.className}>Back </button>
      <button className={courierPrime.className}>Sign up</button>
    </form>
  );
}
