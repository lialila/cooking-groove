'use client';
import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Comment } from '../../../../database/comments';
import { Groove } from '../../../../database/grooves';
import { User } from '../../../../database/users';
import { Usersgroove } from '../../../../database/usersgrooves';
import styles from './page.module.scss';

type Props = {
  currentGroove: {
    id: number;
    name: string;
    offer: string;
    lookingFor: string;
    description: string;
    location: string;
    label: string;
    time: string;
    date: string;
    language: string;
    imgUrl: string;
    userId: number;
  };
  commentsForCurrentGroove: Comment[];
  currentUserId: number;
  grooves: Groove[];
  usersgroovesParticipating: Usersgroove[]; // connection table between users and grooves who participates

  currentUser: {
    id: number;
    username: string;
    name: string;
    email: string;
    profileImgUrl: string;
    eatingExperience: string | null;
    cookingExperience: string | null;
    favouriteFood: string | null;
    language: string;
  }; // this is the user who is logged in
  users: User[];
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

  // set comment on edit mode
  const [commentContent, setCommentContent] = useState<string>('');

  // set parent comment id
  const [parentCommentId, setParentCommentId] = useState<number>();

  // set groove's comments
  const [commentsInGroove, setCommentsInGroove] = useState<Comment[]>(
    props.commentsForCurrentGroove,
  );

  // const today = new Date(),
  //   todayformat =
  //     [today.getHours().toString, today.getMinutes().toString()].join(':') +
  //     ' ' +
  //     [
  //       today.getDate().toString,
  //       today.getMonth().toString() + 1,
  //       today.getFullYear().toString(),
  //     ].join('.');
  // console.log('todayformat: ', todayformat);
  // set the createdAt
  const today = new Date();
  const hours = today.getHours().toString();
  console.log('hours: ', hours);
  const minutes = today.getMinutes().toString();
  const date = today.getDate().toString();
  const month = today.getMonth().toString();
  const year = today.getFullYear().toString();
  const currentTime = `${hours}:${minutes} ${date}.${month}.${year}`;
  // console.log('tyoe of datetime: ', typeof currentTime);

  // const date =
  //   today.getDate().toString() +
  //   '-' +
  //   today.getMonth().toString() +
  //   '-' +
  //   today.getFullYear().toString();
  // const time =
  //   today.getHours().toString() + ':' + today.getMinutes().toString();
  // const currentTime = time + ' ' + date;
  // console.log('currentTime: ', currentTime);

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

  // get the array of users who participates in the groove
  const userIdParticipating = props.usersgroovesParticipating.map(
    (item) => item.userId,
  );

  // find out, if the current (logged in) user participates in current groove, returns number of id if true, undefined if false
  const findUserId = userIdParticipating.find((item) => {
    return item === props.currentUser.id;
  });

  // array of obj users, who participates in the groove
  const usersProfilesParticipating = props.users.filter((item) => {
    return userIdParticipating.includes(item.id);
  });

  // the user who created the groove - the admin, returns obj
  const grooveAdmin = props.users.find(
    (item) => item.id === props.currentGroove.userId,
  );

  return (
    <div className={styles.main}>
      <div className={courierPrime.className}>
        <div key={props.currentGroove.id} className={styles.div}>
          <form>
            {idOnEditMode !== props.currentGroove.id ? (
              <div>
                {' '}
                <img
                  src={props.currentGroove.imgUrl}
                  width="150"
                  alt="Groove"
                />
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
            {idOnEditMode !== props.currentGroove.id ? (
              <h1>{props.currentGroove.name}</h1>
            ) : (
              <label>
                Groove name:
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.currentTarget.value)}
                />
              </label>
            )}{' '}
            {idOnEditMode !== props.currentGroove.id ? (
              <p>#{props.currentGroove.label}</p>
            ) : (
              <label>
                Add labels
                <input
                  value={editLabel || ''}
                  onChange={(e) => setEditLabel(e.currentTarget.value)}
                />
              </label>
            )}{' '}
            {idOnEditMode !== props.currentGroove.id ? (
              <p>Offer: {props.currentGroove.offer}</p>
            ) : (
              <label>
                Your offer:
                <input
                  value={editOffer}
                  onChange={(e) => setEditOffer(e.currentTarget.value)}
                />{' '}
              </label>
            )}{' '}
            {idOnEditMode !== props.currentGroove.id ? (
              <p>Missing ingridients: {props.currentGroove.lookingFor}</p>
            ) : (
              <label>
                Missing ingridients:
                <input
                  value={editLookingFor}
                  onChange={(e) => setEditLookingFor(e.currentTarget.value)}
                />
              </label>
            )}{' '}
            {idOnEditMode !== props.currentGroove.id ? (
              <p>When? {props.currentGroove.time}</p>
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
            {idOnEditMode !== props.currentGroove.id ? (
              <p>{props.currentGroove.date}</p>
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
            {idOnEditMode !== props.currentGroove.id ? (
              <p>Where? {props.currentGroove.location}</p>
            ) : (
              <label>
                Location:
                <input
                  value={editLocation || ''}
                  onChange={(e) => setEditLocation(e.currentTarget.value)}
                />{' '}
              </label>
            )}{' '}
            {idOnEditMode !== props.currentGroove.id ? (
              <p>About: {props.currentGroove.description}</p>
            ) : (
              <label>
                Description:
                <input
                  value={editDescription || ''}
                  onChange={(e) => setEditDescription(e.currentTarget.value)}
                />
              </label>
            )}{' '}
            {idOnEditMode !== props.currentGroove.id ? (
              <p>Languages: {props.currentGroove.language}</p>
            ) : (
              <label>
                Language:
                <input
                  value={editLanguage}
                  onChange={(e) => setEditLanguage(e.currentTarget.value)}
                />
              </label>
            )}{' '}
          </form>

          <h4>Participants:</h4>
          <ul>
            <li>
              <img src={grooveAdmin.profileImgUrl} width="50" alt="Profile" />
              <p>{grooveAdmin.username}</p>
              <p>Admin</p>
            </li>
            {usersProfilesParticipating.map((user) => {
              return (
                <li key={user.id}>
                  <img src={user.profileImgUrl} width="50" alt="Profile" />
                  <p>{user.username}</p>
                </li>
              );
            })}
          </ul>

          {props.currentGroove.userId !== props.currentUserId ? (
            findUserId ? (
              <button
                onClick={async () => {
                  const response = await fetch(
                    `/dashboard/api/grooves/usersgrooves/${props.currentGroove.id}`,
                    {
                      method: 'DELETE',
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
                    `/dashboard/api/grooves/usersgrooves/${props.currentGroove.id}`,
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },

                      body: JSON.stringify({
                        userId: props.currentUserId,
                        grooveId: props.currentGroove.id,
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
                  setIdOnEditMode(props.currentGroove.id);
                  setEditName(props.currentGroove.name);
                  setEditOffer(props.currentGroove.offer);
                  setEditLookingFor(props.currentGroove.lookingFor);
                  setEditDescription(props.currentGroove.description || '');
                  setEditLocation(props.currentGroove.location || '');
                  setEditLabel(props.currentGroove.label || '');
                  setEditTime(props.currentGroove.time);
                  setEditDate(props.currentGroove.date);
                  setEditLanguage(props.currentGroove.language);
                }}
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  const response = await fetch(
                    `/dashboard/api/grooves/${props.currentGroove.id}`,
                    {
                      method: 'PUT',
                      headers: {
                        'Content-type': 'application/json',
                      },
                      body: JSON.stringify({
                        name: editName || props.currentGroove.name,
                        offer: editOffer || props.currentGroove.offer,
                        lookingFor:
                          editLookingFor || props.currentGroove.lookingFor,
                        description:
                          editDescription || props.currentGroove.description,
                        location: editLocation || props.currentGroove.location,
                        label: editLabel || props.currentGroove.label,
                        imgUrl: editImgUrl || props.currentGroove.imgUrl,
                        userId:
                          props.currentUserId ||
                          props.currentGroove.currentUserId,
                        time: editTime || props.currentGroove.time,
                        date: editDate || props.currentGroove.date,
                        language: editLanguage || props.currentGroove.language,
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
                    `/dashboard/api/grooves/${props.currentGroove.id}`,
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
          {props.currentGroove.userId === props.currentUserId || findUserId ? (
            <div className={styles.comments}>
              <ul>
                {props.commentsForCurrentGroove.map((comment) => {
                  const commentedUser = props.users.find(
                    (user) => user.id === comment.userId,
                  );
                  console.log('commentedUser from html: ', commentedUser);
                  return (
                    <li key={comment.id}>
                      <img
                        className={styles.profileImg}
                        src={commentedUser.profileImgUrl}
                        alt="profile"
                        width="50"
                        height="50"
                      />
                      <div>
                        <p> {comment.createdAt}</p>
                        <p>{commentedUser.username}</p>
                        <p>{comment.content}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <img
                className={styles.profileImg}
                src={props.currentUser.profileImgUrl}
                alt="profile"
                width="50"
                height="50"
              />
              <label>
                <input
                  placeholder="What is in your mind..."
                  type="text"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.currentTarget.value)}
                />
              </label>
              <button
                onClick={async () => {
                  const response = await fetch(
                    `/dashboard/api/grooves/comments/${props.currentGroove.id}`,
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        content: commentContent,
                        userId: props.currentUserId,
                        grooveId: props.currentGroove.id,
                        createdAt: currentTime,
                      }),
                    },
                  );

                  const data = await response.json();
                  if (data.error) {
                    setError(data.error);
                    return;
                  }
                  setCommentsInGroove([...commentsInGroove, data.comment]);
                  router.refresh();
                }}
              >
                Add comment
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
