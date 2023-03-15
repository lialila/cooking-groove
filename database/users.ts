// import { Martian_Mono } from '@next/font/google';
import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  profileImgUrl: string;
  eatingExperience: string | null;
  cookingExperience: string | null;
  favouriteFood: string | null;
  language: string;
  passwordHash: string;
};

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<
    {
      id: number;
      username: string;
      name: string;
      profileImgUrl: string;
      eatingExperience: string;
      cookingExperience: string;
      favouriteFood: string;
      language: string;
      passwordHash: string;
    }[]
  >`
  SELECT
*
  FROM
    users
  WHERE
    username = ${username}
  `;
  return user;
});

export const getUserByUsernameWithPasswordHash = cache(
  async (username: string) => {
    const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
    return user;
  },
);

export const getUserByUserIdWithPasswordHash = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<{ id: number; username: string }[]>`
    SELECT
      users.id,
      users.username
    FROM
      users
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return user;
});

export const getUsers = cache(async () => {
  const users = await sql<User[]>`
SELECT * FROM users
  `;
  return users;
});

export const createUser = cache(
  async (
    username: string,
    name: string,
    email: string,
    profileImgUrl: string,
    eatingExperience: string,
    cookingExperience: string,
    favouriteFood: string,
    language: string,
    passwordHash: string,
  ) => {
    const [user] = await sql<User[]>`
     INSERT INTO users
  (username, name,
  email, profile_img_url,
  eating_experience,
  cooking_experience,
  favourite_food,
  language,
  password_hash)
     VALUES
  (${username}, ${name}, ${email}, ${profileImgUrl}, ${eatingExperience}, ${cookingExperience}, ${favouriteFood}, ${language}, ${passwordHash})
 RETURNING
id, username, name, email, profile_img_url, eating_experience, cooking_experience, favourite_food, language
  `;
    return user;
  },
);

export const deleteUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
  DELETE FROM
    users
  WHERE
    username = ${username}
  RETURNING *
  `;
  return user;
});

export const deleteUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
  DELETE FROM
    users
  WHERE
    id = ${id}
  RETURNING *
  `;
  return user;
});

export const getUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
  SELECT * FROM users
  WHERE id = ${id}
  `;
  return user;
});

export const updateUserById = cache(
  async (
    id: number,
    username: string,
    name: string,
    email: string,
    profileImgUrl: string,
    eatingExperience: string,
    cookingExperience: string,
    favouriteFood: string,
    language: string,
  ) => {
    const [user] = await sql<User[]>`
      UPDATE
        users
      SET
      username=${username}, name=${name},
      email=${email},
      profile_img_url=${profileImgUrl},
      eating_experience=${eatingExperience},  cooking_experience=${cookingExperience},
      favourite_food=${favouriteFood}, language=${language}
      WHERE
        id = ${id}
      RETURNING *
    `;
    return user;
  },
);

export const updateUserByUsername = cache(
  async (
    id: number,
    username: string,
    name: string,
    email: string,
    profileImgUrl: string,
    eatingExperience: string,
    cookingExperience: string,
    favouriteFood: string,
    language: string,
  ) => {
    const [user] = await sql<User[]>`
      UPDATE
        users
      SET
      username=${username}, name=${name},
      email=${email},
      profile_img_url=${profileImgUrl},
      eating_experience=${eatingExperience},  cooking_experience=${cookingExperience},
      favourite_food=${favouriteFood}, language=${language}
      WHERE
        username = ${username}
      RETURNING *
    `;
    return user;
  },
);
