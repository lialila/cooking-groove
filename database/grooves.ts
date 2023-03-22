import { cache } from 'react';
import { sql } from './connect';

export type Groove = {
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

export const createGroove = cache(
  async (
    name: string,
    offer: string,
    lookingFor: string,
    description: string,
    location: string,
    label: string,
    imgUrl: string,
    userId: number,
    time: string,
    date: string,
    language: string,
    token: string,
  ) => {
    const [groove] = await sql<Groove[]>`
     INSERT INTO grooves
  ( name, offer,
    looking_for,
    description,
          location, label,
    img_url, user_id, time, date, language  )
     VALUES
  (${name}, ${offer}, ${lookingFor}, ${description}, ${location}, ${label}, ${imgUrl}, ${userId}, ${time}, ${date}, ${language})
 RETURNING
 id, name, offer, looking_for, description,  location, label, img_url, user_id, time, date, language
  `;
    return groove;
  },
);

export const getGrooves = cache(async () => {
  const grooves = await sql<Groove[]>`
SELECT * FROM grooves
  `;
  return grooves;
});

export const getGrooveById = cache(async (id: number) => {
  const [groove] = await sql<Groove[]>`
  SELECT * FROM
    grooves
  WHERE
    id = ${id}
  `;
  return groove;
});

// get a groove only if i have a valid session token
export const getGrooveByIdAndSessionToken = cache(
  async (id: number, token: string) => {
    const [groove] = await sql<Groove[]>`
  SELECT
    grooves.*
  FROM
     grooves
    -- return all from grooves table
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.expiry_timestamp > now()
      )
  WHERE
    grooves.id = ${id}
  `;
    return groove;
  },
);

export const deleteGrooveById = cache(async (id: number) => {
  const [groove] = await sql<Groove[]>`
  DELETE FROM
    grooves
  WHERE
    id = ${id}
  RETURNING
    *
  `;
  return groove;
});

export const updateGrooveById = cache(
  async (
    id: number,
    name: string,
    offer: string,
    lookingFor: string,
    description: string,
    location: string,
    label: string,
    imgUrl: string,
    userId: number,
    time: string,
    date: string,
    language: string,
  ) => {
    const [groove] = await sql<Groove[]>`
      UPDATE
        grooves
      SET
      name=${name}, offer=${offer},
    looking_for=${lookingFor},
    description=${description},
    location=${location},  label=${label},
    img_url=${imgUrl}, user_id=${userId}, time=${time}, date=${date}, language=${language}

      WHERE
        id = ${id}
      RETURNING *
    `;
    return groove;
  },
);
