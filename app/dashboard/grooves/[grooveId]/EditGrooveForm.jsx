'use client';
import { Montserrat } from '@next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import { Comment } from '../../../../database/comments';
// import { Groove } from '../../../../database/grooves';
// import { Ingredient } from '../../../../database/ingredients';
// import { User } from '../../../../database/users';
// import { Usersgroove } from '../../../../database/usersgrooves';
import styles from './page.module.scss';

// const courierPrime = Courier_Prime({
//   weight: '400',
//   subsets: ['latin'],
// });

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export default function EditGrooveForm(props) {
  const router = useRouter();

  const [grooves, setGrooves] = useState(props.grooves);

  const [idOnEditMode, setIdOnEditMode] = useState();
  const [editName, setEditName] = useState('');
  const [editOffer, setEditOffer] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editLabel, setEditLabel] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editLanguage, setEditLanguage] = useState('');
  const [editImgUrl, setEditImgUrl] = useState('');

  const [error, setError] = useState();

  const [ingredientsList, setIngredientsList] = useState([]);

  // set ingredients
  const [ingredient, setIngredient] = useState('');
  // const [updated, setUpdated] = useState(message);

  // set comment on edit mode
  const [commentContent, setCommentContent] = useState('');

  // set groove's comments
  const [commentsInGroove, setCommentsInGroove] = useState(
    props.commentsForCurrentGroove,
  );

  // set the createdAt for comment
  const today = new Date();
  const hours = today.getHours().toString();

  const minutes = today.getMinutes().toString();
  const date = today.getDate().toString();
  const month = today.getMonth().toString();
  const year = today.getFullYear().toString();
  const currentTime = `${hours}:${minutes} ${date}.${month}.${year}`;

  // handle the image upload
  const handleImageUpload = async (e) => {
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
  if (!grooveAdmin) return null;

  const groovesIngredients = props.ingredients.filter((item) => {
    return item.grooveId === props.currentGroove.id;
  });
  // const singleIngredient = groovesIngredients.find((item) => {
  //   return item.id === ingredient.id;
  // });

  const handleIngredientAddition = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `/dashboard/api/grooves/${props.currentGroove.id}/ingredients/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredientName: ingredient,
          grooveId: props.currentGroove.id,
        }),
      },
    );

    const data = await response.json();
    console.log('data', data);
    if (data.error) {
      setError(data.error);
      return;
    }
    setIngredientsList([...ingredientsList, data.ingredient]);

    setIngredient('');
    router.refresh();
  };

  const handleIngredientDelete = async (id) => {
    const response = await fetch(
      `/dashboard/api/grooves/${props.currentGroove.id}/ingredients/${id}`,
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

    setIngredientsList([...ingredientsList, data.ingredient]);
    router.refresh();
  };

  return (
    <div
      key={props.currentGroove.id}
      className={`${montserrat.className} ${styles.div}`}
    >
      <form>
        {/* if the groove is not on edit mode */}
        {idOnEditMode !== props.currentGroove.id ? (
          <div className={styles.h1}>
            <h1>{props.currentGroove.name}</h1>
            {props.currentGroove.userId !== props.currentUserId ? (
              // if the current user is not the admin of the groove, show participate button or participating message
              findUserId ? (
                <p className={styles.going}>You are going!</p>
              ) : (
                <button
                  className={styles.addComment}
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
              // if the current user is the admin of the groove and the groove is not on edit mode, show edit button
              <button
                onClick={() => {
                  setIdOnEditMode(props.currentGroove.id);
                  setEditName(props.currentGroove.name);
                  setEditOffer(props.currentGroove.offer);
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
            )}
          </div>
        ) : (
          <label className={styles.onEdit}>
            Groove name
            <input
              value={editName}
              onChange={(e) => setEditName(e.currentTarget.value)}
            />
          </label>
        )}{' '}
        {idOnEditMode !== props.currentGroove.id ? (
          <>
            {' '}
            <div className={styles.datetimelocation}>
              <div className={styles.time}>
                <img src="/groove/time1.png" alt="time" width="20" />
                <p>
                  {props.currentGroove.date} at {props.currentGroove.time}
                </p>
              </div>
              <div className={styles.location}>
                <img src="/groove/place1.png" alt="location" width="20" />
                <p>{props.currentGroove.location}</p>
              </div>
            </div>
            <div className={styles.offer}>
              <img src="/groove/donerose.png" alt="done" width="30" />
              <p>{props.currentGroove.offer}</p>
            </div>
            <div className={styles.missing}>
              {' '}
              <div>
                <img src="/groove/questionrose.png" alt="missing" width="60" />
              </div>
              <div className={styles.list}>
                {groovesIngredients.map((oneIngredient) => {
                  return (
                    <label
                      key={`ingredient.${oneIngredient.id}`}
                      className={styles.ingredients}
                    >
                      {' '}
                      {oneIngredient.ingredientName}
                      <input type="checkbox" />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className={styles.hosted}>
              <Link href={`/dashboard/profile/${grooveAdmin.id}`}>
                <img
                  src={grooveAdmin.profileImgUrl}
                  width="40"
                  height="40"
                  alt="Profile"
                  className={styles.profileImg}
                />
              </Link>{' '}
              <p>Hosted by {grooveAdmin.username}</p>
            </div>
          </>
        ) : (
          <>
            <label className={styles.onEdit}>
              Time
              <input
                type="time"
                value={editTime}
                onChange={(e) => setEditTime(e.currentTarget.value)}
              />
            </label>
            <label className={styles.onEdit}>
              Date
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.currentTarget.value)}
              />
            </label>
            <label className={styles.onEdit}>
              Location
              <input
                value={editLocation || ''}
                onChange={(e) => setEditLocation(e.currentTarget.value)}
              />{' '}
            </label>
            <label className={styles.onEdit}>
              Offer
              <input
                value={editOffer}
                onChange={(e) => setEditOffer(e.currentTarget.value)}
              />{' '}
            </label>

            <p>Add missing ingredient</p>
            <div className={styles.onEditMissingIngredient}>
              <label className={styles.onEdit}>
                <input
                  value={ingredient}
                  onChange={(e) => setIngredient(e.currentTarget.value)}
                />{' '}
              </label>
              <button
                className={styles.plus}
                onClick={handleIngredientAddition}
              >
                +
              </button>
            </div>
            <div className={styles.missingIngredientInList}>
              <img src="/groove/questionrose.png" alt="missing" width="60" />
              <div>
                {groovesIngredients.map((singleIngredient) => {
                  return (
                    <div key={`ingredient.${singleIngredient.id}`}>
                      <label className={styles.ingredients}>
                        {singleIngredient.ingredientName}

                        <button
                          type="button"
                          onClick={() =>
                            handleIngredientDelete(singleIngredient.id)
                          }
                        >
                          X
                        </button>
                      </label>{' '}
                    </div>
                  );
                })}{' '}
              </div>
            </div>
          </>
        )}{' '}
        {idOnEditMode !== props.currentGroove.id ? (
          !props.currentGroove.imgUrl ? (
            <img src="/groove-default.jpeg" width="150" alt="Groove" />
          ) : (
            <div>
              {' '}
              <img
                className={styles.grooveImg}
                src={props.currentGroove.imgUrl}
                width="300"
                alt="Groove"
              />
            </div>
          )
        ) : (
          <label className={styles.onEdit}>
            Image{' '}
            <input type="file" name="fileInput" onChange={handleImageUpload} />{' '}
          </label>
        )}
        {idOnEditMode !== props.currentGroove.id ? (
          <div className={styles.about}>
            <h4>About</h4>

            <p>{props.currentGroove.description}</p>
          </div>
        ) : (
          <>
            <label className={styles.onEdit}>
              Description
              <input
                value={editDescription || ''}
                onChange={(e) => setEditDescription(e.currentTarget.value)}
              />
            </label>

            <div className={styles.onEdit}>
              Choose a label
              <select
                placeholder="Your label"
                value={editLabel || ''}
                onChange={(e) => setEditLabel(e.currentTarget.value)}
              >
                <option defaultValue="Choose the label">
                  Choose the label
                </option>

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
            </div>
          </>
        )}{' '}
        {idOnEditMode !== props.currentGroove.id ? (
          <div className={styles.label}>
            {' '}
            <img src="/groove/hashtag.png" alt="hashtag" width="20" />
            <p>{props.currentGroove.label}</p>
          </div>
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
          <div className={styles.language}>
            <img src="/groove/language.png" alt="language" width="35" />
            <p> {props.currentGroove.language}</p>
          </div>
        ) : (
          <label className={styles.onEdit}>
            Language:
            <input
              value={editLanguage}
              onChange={(e) => setEditLanguage(e.currentTarget.value)}
            />
          </label>
        )}{' '}
      </form>
      {idOnEditMode !== props.currentGroove.id ? (
        usersProfilesParticipating.length === 0 ? (
          <h4>No attendees yet</h4>
        ) : idOnEditMode !== props.currentGroove.id ? (
          <>
            {usersProfilesParticipating.length === 1 ? (
              <h4 className={styles.attendeeH4}>Attendee</h4>
            ) : (
              <h4 className={styles.attendeeH4}>
                Attendees ({usersProfilesParticipating.length})
              </h4>
            )}
            <ul>
              {usersProfilesParticipating.map((user) => {
                return (
                  <li>
                    <Link
                      href={`/dashboard/profile/${user.id}`}
                      key={user.id}
                      className={styles.attendee}
                    >
                      <img
                        src={user.profileImgUrl}
                        width="70"
                        height="70"
                        alt="Profile"
                        className={styles.profileImg}
                      />
                      <p>{user.username}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        ) : null
      ) : null}
      {idOnEditMode === props.currentGroove.id ? (
        <div className={styles.buttonsOnEdit}>
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
                    description:
                      editDescription || props.currentGroove.description,
                    location: editLocation || props.currentGroove.location,
                    label: editLabel || props.currentGroove.label,
                    imgUrl: editImgUrl || props.currentGroove.imgUrl,
                    userId: props.currentUserId || props.currentGroove.userId,
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
        </div>
      ) : null}
      {props.currentGroove.userId !== props.currentUserId ? (
        findUserId ? (
          <button
            className={styles.leave}
            onClick={async () => {
              const response = await fetch(
                `/dashboard/api/grooves/usersgrooves/${props.currentGroove.id}`,
                {
                  method: 'DELETE',
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
            Leave
          </button>
        ) : (
          <h1>PArticipate button</h1>
        )
      ) : null}
      {idOnEditMode !== props.currentGroove.id ? (
        props.currentGroove.userId === props.currentUserId || findUserId ? (
          <div className={styles.comments}>
            <ul>
              {props.commentsForCurrentGroove.map((comment) => {
                const commentedUser = props.users.find(
                  (user) => user.id === comment.userId,
                );

                return (
                  <li key={comment.id}>
                    <Link
                      className={styles.commentBody}
                      href={`/dashboard/profile/${commentedUser?.id}`}
                    >
                      <div>
                        <img
                          className={styles.profileImg}
                          src={commentedUser?.profileImgUrl}
                          alt="profile"
                          width="50"
                          height="50"
                        />{' '}
                        <p>{commentedUser?.username}</p>
                      </div>{' '}
                      <div>
                        <p>{comment.content}</p>{' '}
                        <p>
                          <span> {comment.createdAt}</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* <img
              className={styles.profileImg}
              src={props.currentUser.profileImgUrl}
              alt="profile"
              width="50"
              height="50"
            /> */}
            <div className={styles.commentDiv}>
              <label>
                <input
                  placeholder="What is in your mind..."
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
                className={styles.addComment}
              >
                Add
              </button>
            </div>
          </div>
        ) : null
      ) : null}
    </div>
  );
}
