'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.scss';

export default function From() {
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [eatingExperience, setEatingExperience] = useState('');
  const [cookingExperience, setCookingExperience] = useState('');
  const [favouriteFood, setFavouriteFood] = useState('');
  const [language, setLanguage] = useState('');

  return (
    <form className={styles.form}>
      <label htmlFor="userName">
        User name:
        <input
          data-test-id="checkout-first-name"
          value={userName}
          required
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="name">Name: </label>
      <input
        data-test-id="checkout-last-name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="email">E-mail:</label>
      <input
        type="email"
        data-test-id="checkout-email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="eatingExperience">Eating experience:</label>
      <input
        data-test-id="checkout-address"
        value={eatingExperience}
        required
        onChange={(e) => setEatingExperience(e.target.value)}
      />{' '}
      <br />
      <label htmlFor="cookingExperience">Cooking experience:</label>
      <input
        data-test-id="checkout-city"
        value={cookingExperience}
        required
        onChange={(e) => setCookingExperience(e.target.value)}
      />{' '}
      <br />
      <label htmlFor="favouriteFood">Favourite food:</label>
      <input
        data-test-id="checkout-postal-code"
        value={favouriteFood}
        required
        onChange={(e) => setFavouriteFood(e.target.value)}
      />{' '}
      <br />
      <label htmlFor="language">Language:</label>
      <input
        data-test-id="checkout-country"
        value={language}
        required
        onChange={(e) => setLanguage(e.target.value)}
      />{' '}
      <br />
      <br />
      <Link href="/">
        <button>Back </button>
      </Link>
      <Link href="/">
        <button
          data-test-id="checkout-confirm-order"
          disabled={
            userName.length === 0 ||
            name.length === 0 ||
            email.length === 0 ||
            address.length === 0 ||
            city.length === 0 ||
            postalCode.length === 0 ||
            country.length === 0 ||
            creditCardNumber.length === 0 ||
            expirationDate.length === 0 ||
            cvc.length === 0
          }
        >
          Sign up
        </button>
      </Link>
    </form>
  );
}
