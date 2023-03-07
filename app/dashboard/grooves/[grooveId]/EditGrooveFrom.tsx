'use client';
import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import { useState } from 'react';
import { Groove } from '../../../../database/grooves';
import styles from './page.module.scss';

type Props = {
  id: number;
  name: string;
  offer: string;
  lookingFor: string;
  description: string | null;
  location: string | null;
  label: string | null;
  imgUrl: string | null;
  userId: string;
  time: string;
  date: string;
  language: string;
};

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

const MontserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export default function EditGrooveForm(props: Props) {
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [editName, setEditName] = useState('');
  const [editOffer, setEditOffer] = useState<string>('');
  const [editLookingFor, setEditLookingFor] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [editLocation, setEditLocation] = useState<string>('');
  const [editLabel, setEditLabel] = useState<string>('');
  // const [editImgUrl, setEditImgUrl] = useState<string>('');
  const [editTime, setEditTime] = useState<string>('');
  const [editDate, setEditDate] = useState<string>('');
  const [editLanguage, setEditLanguage] = useState<string>('');

  return (
    <div className={styles.main}>
      <div className={courierPrime.className}>
        <div className={styles.div}>
          {/* {props.props.grooves.map((props.groove) => ( */}
          <div key={props.groove.id} className={styles.groove}>
            <p>Don't forget imgUrl</p>
            {idOnEditMode !== props.groove.id ? (
              props.groove.name
            ) : (
              <input value={editName} />
            )}{' '}
            {idOnEditMode !== props.groove.id ? (
              props.groove.offer
            ) : (
              <input value={editOffer} />
            )}{' '}
            {idOnEditMode !== props.groove.id ? (
              props.groove.lookingFor
            ) : (
              <input value={editLookingFor} />
            )}{' '}
            {idOnEditMode !== props.groove.id ? (
              props.groove.label
            ) : (
              <input value={editLabel || ''} />
            )}{' '}
            {idOnEditMode !== props.groove.id ? (
              props.groove.time
            ) : (
              <input value={editTime} />
            )}{' '}
            {idOnEditMode !== props.groove.id ? (
              props.groove.date
            ) : (
              <input value={editDate} />
            )}{' '}
            {idOnEditMode !== props.groove.id ? (
              props.groove.language
            ) : (
              <input value={editLanguage} />
            )}{' '}
            {idOnEditMode !== props.groove.id ? (
              props.groove.description
            ) : (
              <input value={editDescription || ''} />
            )}{' '}
            {idOnEditMode !== props.groove.id ? (
              props.groove.location
            ) : (
              <input value={editLocation || ''} />
            )}{' '}
            <button
              onClick={() => {
                setIdOnEditMode(props.groove.id);
                setEditName(props.groove.name);
                setEditOffer(props.groove.offer);
                setEditLookingFor(props.groove.lookingFor);
                setEditDescription(props.groove.description || '');
                setEditLocation(props.groove.location || '');
                setEditLabel(props.groove.label || '');
                setEditTime(props.groove.time);
                setEditDate(props.groove.date);
                setEditLanguage(props.groove.language);
              }}
            >
              Edit
            </button>
            <button onClick={() => setIdOnEditMode(undefined)}>Save</button>
            <button>Delete</button>
          </div>
        </div>
        <button>My Grooves</button>
      </div>
    </div>
  );
}
