'use client';
import { Courier_Prime } from '@next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
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
  };
  users: User[];
};
const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

export default function EditUserForm(props: Props) {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>(props.users);

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
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string>();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const image = e.target.files[0];
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'my-uploads');
      setLoading(true);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      if (response.ok) {
        const data = await response.json();
        setEditProfileImgUrl(data.secure_url);
        setLoading(false);
      } else {
        setError(error);
      }
    }
  };

  return (
    <div className={`${courierPrime.className} ${styles.card}`}>
      <div className={styles.form}>
        <div className={styles.profileTitel}>
          {idOnEditMode !== props.user.id ? (
            <div>
              {!props.user.profileImgUrl ? (
                <img
                  src="/default-profile-picture/defult-profile.jpg"
                  width="130"
                  alt="Profile"
                  className={styles.img}
                />
              ) : (
                <img
                  src={props.user.profileImgUrl}
                  width="130"
                  alt="Profile"
                  className={styles.img}
                />
              )}
              <div className={styles.profile}>
                {props.sessionUser.id === props.user.id && (
                  <button
                    className={courierPrime.className}
                    onClick={() => {
                      setIdOnEditMode(props.user.id);
                      setEditName(props.user.name);
                      setEditUsername(props.user.username);
                      setEditEmail(props.user.email);
                      setEditProfileImgUrl(props.user.profileImgUrl || '');
                      setEditEatingExperience(
                        props.user.eatingExperience || '',
                      );
                      setEditCookingExperience(
                        props.user.cookingExperience || '',
                      );
                      setEditFavouriteFood(props.user.favouriteFood || '');
                      setEditLanguage(props.user.language || '');
                    }}
                  >
                    <img src="/additional/edit1.png" alt="edit" width="17" />
                  </button>
                )}
                <h3>{props.user.username}</h3>
              </div>
            </div>
          ) : null}{' '}
          <br />
          <br />
          {props.sessionUser.id === props.user.id &&
          idOnEditMode !== props.user.id ? (
            <div className={styles.profileMenu}>
              <Link href="/dashboard/grooves/my-grooves">
                <div className={courierPrime.className}>My grooves</div>
              </Link>
              <Link href="/dashboard/grooves/participation-grooves">
                <div className={courierPrime.className}>Participation</div>
              </Link>
            </div>
          ) : null}{' '}
        </div>
        {props.sessionUser.id !== props.user.id ? (
          <div className={styles.profileMenu}>
            <Link href={`/dashboard/grooves/users-grooves/${props.user.id}`}>
              <div className={courierPrime.className}>
                {props.user.username} grooves
              </div>
            </Link>
          </div>
        ) : null}
        <FadeIn>
          {idOnEditMode !== props.user.id ? (
            <>
              <p> Eating experience: {props.user.eatingExperience}</p>
              <p> Cooking experience: {props.user.cookingExperience}</p>
              <p> Favourite food: {props.user.favouriteFood}</p>
              <p>Language: {props.user.language}</p>
            </>
          ) : (
            <div className={styles.formOnEdit}>
              <label className={styles.input}>
                Username
                <input
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.currentTarget.value)}
                />
              </label>
              <label className={styles.input}>
                Name
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.currentTarget.value)}
                />
              </label>{' '}
              <label className={styles.input}>
                E-mail
                <input
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.currentTarget.value)}
                />{' '}
              </label>
              <label className={styles.input}>
                Eating experience:
                <input
                  value={editEatingExperience}
                  onChange={(e) =>
                    setEditEatingExperience(e.currentTarget.value)
                  }
                />{' '}
              </label>{' '}
              <label className={styles.input}>
                Cooking experience
                <input
                  value={editCookingExperience}
                  onChange={(e) =>
                    setEditCookingExperience(e.currentTarget.value)
                  }
                />{' '}
              </label>
              <label className={styles.input}>
                Favourite food
                <input
                  value={editFavouriteFood}
                  onChange={(e) => setEditFavouriteFood(e.currentTarget.value)}
                />{' '}
              </label>
              <label className={styles.input}>
                Language
                <input
                  value={editLanguage}
                  onChange={(e) => setEditLanguage(e.currentTarget.value)}
                />{' '}
              </label>
              <label className={styles.input}>
                Image preview{' '}
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <img src={editProfileImgUrl} width="60" alt="profile image" />
                )}
                <input
                  type="file"
                  name="fileInput"
                  onChange={handleImageUpload}
                />{' '}
              </label>
            </div>
          )}
        </FadeIn>
      </div>

      {props.sessionUser.id === props.user.id ? (
        idOnEditMode === props.user.id ? (
          <div className={styles.buttonsOnEdit}>
            <button
              className={courierPrime.className}
              onClick={async () => {
                const response = await fetch(
                  `/dashboard/api/profile/${props.user.id}`,
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
              Remove profile
            </button>
            <button
              className={courierPrime.className}
              onClick={async () => {
                const response = await fetch(
                  `/dashboard/api/profile/${props.user.id}`,
                  {
                    method: 'PUT',
                    headers: {
                      'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                      username: editUsername || props.user.username,
                      name: editName || props.user.name,
                      email: editEmail || props.user.email,
                      profileImgUrl:
                        editProfileImgUrl || props.user.profileImgUrl,
                      eatingExperience:
                        editEatingExperience || props.user.eatingExperience,
                      cookingExperience:
                        editCookingExperience || props.user.cookingExperience,
                      favouriteFood:
                        editFavouriteFood || props.user.favouriteFood,
                      language: editLanguage || props.user.language,
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
          </div>
        ) : (
          <div className={styles.signes}>
            <Link href="/logout" prefetch={false}>
              <img
                className={styles.logout}
                src="/nav-footer/logout.png"
                width="23"
                height="23"
                alt="search"
              />
            </Link>
          </div>
        )
      ) : (
        <Link
          className={styles.signes}
          href={`/dashboard/profile/${props.sessionUser.id}/chat`}
        >
          <img
            className={styles.message}
            src="/additional/chat1.png"
            width="30"
            alt="chat"
          />
        </Link>
      )}
    </div>
  );
}
