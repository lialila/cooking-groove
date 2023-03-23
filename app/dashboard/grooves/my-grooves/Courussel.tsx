'use client';
import 'react-multi-carousel/lib/styles.css';
// import { Carousel } from '@trendyol-js/react-carousel';
import Link from 'next/link';
import { Carousel } from 'react-bootstrap';
// import Carousel from 'react-multi-carousel';
import { Groove } from '../../../../database/grooves';

// import styles from './page.module.scss';

type Props = {
  myGrooves: Groove[];
};

export default function Courussel(props: Props) {
  return (
    <ul>
      {props.myGrooves.map((groove) => {
        return (
          <li key={`groove.${groove.id}`}>
            <Link
              href={`dashboard/grooves/${groove.id}`}
              data-test-id={`product-${groove.id}`}
            >
              <h3>{groove.name}</h3>{' '}
              <img src={groove.imgUrl} width="150" alt="Groove" />
              <p>Offer: {groove.offer}</p>
              <p>Looking for: {groove.lookingFor}</p>
              <p>{groove.description}</p>
              <p>Location: {groove.location} </p>
              <p>Time: {groove.time}</p>
              <p>date: {groove.date}</p>
              <p> #{groove.label}</p>
            </Link>
            <Link
              href={`dashboard/grooves/${groove.id}`}
              data-test-id={`product-${groove.id}`}
            >
              <button>View</button>
            </Link>
          </li>
        );
      })}{' '}
    </ul>
  );
}
