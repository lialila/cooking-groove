import { cache } from 'react';
import { sql } from './connect';

export type Groove = {
  id: number;
  name: string;
  offer: string;
  lookingFor: string;
  description: string | null;
  restriction: string | null;
  location: string | null;
  label: string | null;
  imgUrl: string | null;
  userId: number;
  time: Date;
  date: Date;
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
  ) => {
    const [groove] = await sql<Groove[]>`
     INSERT INTO grooves
  ( name, offer,
    what_looking_for,
    description,
          location,
    img_url, user_id, time, date, language  )
     VALUES
  (${name}, ${offer}, ${lookingFor}, ${description}, ${location}, ${label}, ${imgUrl}, ${userId}, ${time}, ${date}, ${language})
 RETURNING
 name, offer, looking_for, description,  location, label, img_url, user_id, time, date, language
  `;
    return groove;
  },
);

// get all items in grooves
export const getGrooves = cache(async () => {
  const grooves = await sql<Groove[]>`
SELECT * FROM grooves
  `;
  return grooves;
});

// get a single user
export const getGroove = cache(async (id: number) => {
  const [groove] = await sql<Groove[]>`
  SELECT * FROM grooves
  WHERE id = ${id}
  `;
  return groove;
});

// INSERT INTO grooves
//   (name, offer,
//     looking_for,
//     description,
//      location, label,
//     img_url, user_id, time, date, language)
//      VALUES ('Gaspahcho and margarita', 'some cool bio tomatoes', 'some snacks and tequila', 'would love to organise thursday margarita and gaspacho session at my place', 'Wien Eichenstrasse 37', 'tequila, mexican', 'here will be an image', 8, '20:00', '5.09.2023', 'english, spanish');
