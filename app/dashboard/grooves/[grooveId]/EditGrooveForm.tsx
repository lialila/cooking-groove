'use client';
import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Groove } from '../../../../database/grooves';
import styles from './page.module.scss';

type Props = {
  singleGroove: {
    id: number;
    name: string;
    offer: string;
    lookingFor: string;
    description: string | null;
    location: string | null;
    label: string | null;
    imgUrl: string | null;
    userId: number;
    time: string;
    date: string;
    language: string;
  };
  comments: { id: number; text: string; userId: number; grooveId: number }[];
  userId: number;
  grooves: Groove[];
  usersParticipating: { id: number; userId: number; grooveId: number }[];
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
  const router = useRouter();

  const [grooves, setGrooves] = useState<Groove[]>(props.grooves);

  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [editName, setEditName] = useState('');
  const [editOffer, setEditOffer] = useState<string>('');
  const [editLookingFor, setEditLookingFor] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [editLocation, setEditLocation] = useState<string>('');
  const [editLabel, setEditLabel] = useState<string>('');
  const [editTime, setEditTime] = useState<string>('');
  const [editDate, setEditDate] = useState<string>('');
  const [editLanguage, setEditLanguage] = useState<string>('');
  const [editImgUrl, setEditImgUrl] = useState<string>('');
  const [error, setError] = useState<string>();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'my-uploads');
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      if (response.ok) {
        const data = await response.json();
        setEditImgUrl(data.secure_url);
      } else {
        setError('Failed to upload image');
      }
    }
  };
  console.log('props.usersParticipating: ', props.usersParticipating);
  const userIdParticipating = props.usersParticipating.map(
    (item) => item.userId,
  );
  const numUserIdParticipating = parseInt(userIdParticipating);

  console.log('numUserIdParticipating: ', numUserIdParticipating);

  return (
    <div className={styles.main}>
      <div className={courierPrime.className}>
        <div key={props.singleGroove.id} className={styles.div}>
          <form>
            {idOnEditMode !== props.singleGroove.id ? (
              <div>
                {' '}
                <img src={props.singleGroove.imgUrl} width="150" alt="Groove" />
              </div>
            ) : (
              <label>
                Image:{' '}
                <input
                  type="file"
                  name="fileInput"
                  onChange={handleImageUpload}
                />{' '}
              </label>
            )}
            {idOnEditMode !== props.singleGroove.id ? (
              <h1>{props.singleGroove.name}</h1>
            ) : (
              <label>
                Groove name:
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.currentTarget.value)}
                />
              </label>
            )}{' '}
            {idOnEditMode !== props.singleGroove.id ? (
              props.singleGroove.offer
            ) : (
              <label>
                Your offer:
                <input
                  value={editOffer}
                  onChange={(e) => setEditOffer(e.currentTarget.value)}
                />{' '}
              </label>
            )}{' '}
            {idOnEditMode !== props.singleGroove.id ? (
              props.singleGroove.lookingFor
            ) : (
              <label>
                What are you missing:
                <input
                  value={editLookingFor}
                  onChange={(e) => setEditLookingFor(e.currentTarget.value)}
                />
              </label>
            )}{' '}
            {idOnEditMode !== props.singleGroove.id ? (
              props.singleGroove.label
            ) : (
              <label>
                Add labels
                <input
                  value={editLabel || ''}
                  onChange={(e) => setEditLabel(e.currentTarget.value)}
                />
              </label>
            )}{' '}
            {idOnEditMode !== props.singleGroove.id ? (
              <p>When? {props.singleGroove.time}</p>
            ) : (
              <label>
                Enter time:
                <input
                  type="time"
                  value={editTime}
                  onChange={(e) => setEditTime(e.currentTarget.value)}
                />
              </label>
            )}{' '}
            {idOnEditMode !== props.singleGroove.id ? (
              props.singleGroove.date
            ) : (
              <label>
                Enter date:
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.currentTarget.value)}
                />
              </label>
            )}{' '}
            {idOnEditMode !== props.singleGroove.id ? (
              props.singleGroove.language
            ) : (
              <label>
                Language:
                <input
                  value={editLanguage}
                  onChange={(e) => setEditLanguage(e.currentTarget.value)}
                />
              </label>
            )}{' '}
            {idOnEditMode !== props.singleGroove.id ? (
              props.singleGroove.description
            ) : (
              <label>
                Description:
                <input
                  value={editDescription || ''}
                  onChange={(e) => setEditDescription(e.currentTarget.value)}
                />
              </label>
            )}{' '}
            {idOnEditMode !== props.singleGroove.id ? (
              <p>Where? {props.singleGroove.location}</p>
            ) : (
              <label>
                Location:
                <input
                  value={editLocation || ''}
                  onChange={(e) => setEditLocation(e.currentTarget.value)}
                />{' '}
              </label>
            )}{' '}
          </form>

          {props.singleGroove.userId !== props.userId ? (
            numUserIdParticipating === props.userId ? (
              <button
                onClick={async () => {
                  const response = await fetch(
                    `/dashboard/api/grooves/usersgrooves/${props.singleGroove.id}`,
                    {
                      method: 'DELETE',
                      // body: JSON.stringify({
                      //   userId: props.userId,
                      //   grooveId: props.singleGroove.id,
                      // }),
                    },
                  );
                  console.log('response from delete reeq: ', response);

                  const data = await response.json();
                  console.log('data from delete req: ', data);
                  if ('errors' in data) {
                    setError(data.errors);
                    return;
                  } else {
                    router.refresh();
                  }
                }}
              >
                Leave
              </button>
            ) : (
              <button
                onClick={async () => {
                  const response = await fetch(
                    `/dashboard/api/grooves/usersgrooves/${props.singleGroove.id}`,
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },

                      body: JSON.stringify({
                        userId: props.userId,
                        grooveId: props.singleGroove.id,
                      }),
                    },
                  );

                  const data = await response.json();

                  if ('errors' in data) {
                    setError(data.errors);
                    return;
                  } else {
                    router.refresh();
                  }
                }}
              >
                Participate
              </button>
            )
          ) : (
            <div>
              <button
                onClick={() => {
                  setIdOnEditMode(props.singleGroove.id);
                  setEditName(props.singleGroove.name);
                  setEditOffer(props.singleGroove.offer);
                  setEditLookingFor(props.singleGroove.lookingFor);
                  setEditDescription(props.singleGroove.description || '');
                  setEditLocation(props.singleGroove.location || '');
                  setEditLabel(props.singleGroove.label || '');
                  setEditTime(props.singleGroove.time);
                  setEditDate(props.singleGroove.date);
                  setEditLanguage(props.singleGroove.language);
                }}
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  const response = await fetch(
                    `/dashboard/api/grooves/${props.singleGroove.id}`,
                    {
                      method: 'PUT',
                      headers: {
                        'Content-type': 'application/json',
                      },
                      body: JSON.stringify({
                        name: editName || props.singleGroove.name,
                        offer: editOffer || props.singleGroove.offer,
                        lookingFor:
                          editLookingFor || props.singleGroove.lookingFor,
                        description:
                          editDescription || props.singleGroove.description,
                        location: editLocation || props.singleGroove.location,
                        label: editLabel || props.singleGroove.label,
                        imgUrl: editImgUrl || props.singleGroove.imgUrl,
                        userId: props.userId || props.singleGroove.userId,
                        time: editTime || props.singleGroove.time,
                        date: editDate || props.singleGroove.date,
                        language: editLanguage || props.singleGroove.language,
                      }),
                    },
                  );
                  const data = await response.json();

                  if (data.error) {
                    setError(data.error);
                    return;
                  }
                  setIdOnEditMode(undefined);
                  setGrooves([...grooves, data.groove]);
                  router.refresh();
                }}
              >
                Save
              </button>
              <button
                onClick={async () => {
                  const response = await fetch(
                    `/dashboard/api/grooves/${props.singleGroove.id}`,
                    {
                      method: 'DELETE',
                    },
                  );
                  const data = await response.json();
                  router.refresh();

                  if (data.error) {
                    setError(data.error);
                    return;
                  }
                  router.push('/dashboard/grooves/my-grooves');
                  // setGrooves([...grooves, data.groove]);
                  router.refresh();
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
