'use client';
import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '../../../../database/users';
import styles from './page.module.scss';

type Props = {
  sessionUser: {
    id: number;
    username: string;
    name: string;
    email: string;
    profileImgUrl: string;
    eatingExperience: string;
    cookingExperience: string;
    favouriteFood: string;
    language: string;
    password: string;
  };
  user: {
    id: number;
    username: string;
    name: string;
    email: string;
    profileImgUrl: string;
    eatingExperience: string;
    cookingExperience: string;
    favouriteFood: string;
    language: string;
    password: string;
  };
};
const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

export default function EditUserForm(props: Props) {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>(props.user);

  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [editUsername, setEditUsername] = useState('');
  const [editName, setEditName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editProfileImgUrl, setEditProfileImgUrl] = useState<string>('');
  const [editEatingExperience, setEditEatingExperience] = useState<string>('');
  const [editCookingExperience, setEditCookingExperience] =
    useState<string>('');
  const [editFavouriteFood, setEditFavouriteFood] = useState<string>('');
  const [editLanguage, setEditLanguage] = useState<string>('');
  const [editPassword, setEditPassword] = useState<string>('');

  const [error, setError] = useState<string>();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'my-uploads');
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/drjnxvwj6/upload',
        {
          method: 'POST',
          body: formData,
        },
      );
      if (response.ok) {
        const data = await response.json();
        setEditProfileImgUrl(data.secure_url);
      } else {
        setError('Failed to upload image');
      }
    }
  };

  return (
    <div className={styles.div}>
      <div className={courierPrime.className}>
        <form className={styles.form}>
          {idOnEditMode !== props.user.id ? (
            <div>
              <img src={props.user.profileImgUrl} width="150" alt="Profile" />
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

          {idOnEditMode !== props.user.id ? (
            <p> Username: {props.user.username}</p>
          ) : (
            <label>
              Username:
              <input
                value={editUsername}
                onChange={(e) => setEditUsername(e.currentTarget.value)}
              />{' '}
            </label>
          )}
          {idOnEditMode !== props.user.id ? (
            <p> Name: {props.user.name}</p>
          ) : (
            <label>
              Name:
              <input
                value={editName}
                onChange={(e) => setEditName(e.currentTarget.value)}
              />{' '}
            </label>
          )}

          {idOnEditMode !== props.user.id ? (
            <p> E-mail: {props.user.email}</p>
          ) : (
            <label>
              E-mail:
              <input
                value={editEmail}
                onChange={(e) => setEditEmail(e.currentTarget.value)}
              />{' '}
            </label>
          )}
          {idOnEditMode !== props.user.id ? (
            <p> Eating experience: {props.user.eatingExperience}</p>
          ) : (
            <label>
              Eating experience:
              <input
                value={editEatingExperience}
                onChange={(e) => setEditEatingExperience(e.currentTarget.value)}
              />{' '}
            </label>
          )}
          {idOnEditMode !== props.user.id ? (
            <p> Cooking experience: {props.user.cookingExperience}</p>
          ) : (
            <label>
              Cooking experience:
              <input
                value={editCookingExperience}
                onChange={(e) =>
                  setEditCookingExperience(e.currentTarget.value)
                }
              />{' '}
            </label>
          )}
          {idOnEditMode !== props.user.id ? (
            <p> Favourite food: {props.user.favouriteFood}</p>
          ) : (
            <label>
              Favourite food:
              <input
                value={editFavouriteFood}
                onChange={(e) => setEditFavouriteFood(e.currentTarget.value)}
              />{' '}
            </label>
          )}
          {idOnEditMode !== props.user.id ? (
            <p>Language: {props.user.language}</p>
          ) : (
            <label>
              Language:
              <input
                value={editLanguage}
                onChange={(e) => setEditLanguage(e.currentTarget.value)}
              />{' '}
            </label>
          )}
          {idOnEditMode !== props.user.id ? (
            props.user.password
          ) : (
            <label>
              Password:
              <input
                value={editPassword}
                onChange={(e) => setEditPassword(e.currentTarget.value)}
              />{' '}
            </label>
          )}

          {props.sessionUser && props.sessionUser.id === props.user.id ? (
            <>
              <Link href="/dashboard/grooves/my-grooves">
                <button>My grooves</button>
              </Link>
              <button
                onClick={() => {
                  setIdOnEditMode(props.user.id);
                  setEditName(props.user.name);
                  setEditUsername(props.user.username);
                  setEditEmail(props.user.email);
                  setEditProfileImgUrl(props.user.profileImgUrl || '');
                  setEditEatingExperience(props.user.eatingExperience || '');
                  setEditCookingExperience(props.user.cookingExperience || '');
                  setEditFavouriteFood(props.user.favouriteFood || '');
                  setEditPassword(props.user.password);
                  setEditLanguage(props.user.language || '');
                }}
              >
                Edit profile
              </button>
              <button
                onClick={async () => {
                  const response = await fetch(
                    `/dashboard/api/users/${props.user.id}`,
                    {
                      method: 'PUT',
                      headers: {
                        'Content-type': 'application/json',
                      },
                      body: JSON.stringify({
                        username: editUsername,
                        name: editName,
                        email: editEmail,
                        profileImgUrl: editProfileImgUrl,
                        eatingExperience: editEatingExperience,
                        cookingExperience: editCookingExperience,
                        favouriteFood: editFavouriteFood,
                        language: editLanguage,
                        password: editPassword,
                      }),
                    },
                  );
                  const data = await response.json();

                  if (data.error) {
                    setError(data.error);
                    return;
                  }
                  setIdOnEditMode(undefined);
                  setUsers([...users, data.user]);
                  router.refresh();
                }}
              >
                Save
              </button>
              <button
                onClick={async () => {
                  const response = await fetch(
                    `/dashboard/api/grooves/${props.sessionUser.id}`,
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
                  router.push('/');
                  setUsers([...users, data.users]);
                  router.refresh();
                }}
              >
                Delete profile
              </button>
            </>
          ) : (
            <Link href="/dashboard/grooves">
              <button>{props.user.username} grooves</button>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}
