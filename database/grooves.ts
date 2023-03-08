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
 name, offer, looking_for, description,  location, label, img_url, user_id, time, date, language
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
  SELECT * FROM grooves
  WHERE id = ${id}
  `;
  return groove;
});

export const deleteGrooveById = cache(async (id: number) => {
  const [groove] = await sql<Groove[]>`
  DELETE FROM
    grooves
  WHERE
    id = ${id}
  RETURNING *
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

// INSERT INTO grooves
//   (name, offer,
//     looking_for,
//     description,
//      location, label,
//     img_url, user_id, time, date, language)
//      VALUES ('Lets asian', 'some cool bio tomatoes', 'some snacks and tequila', 'would love to organise thursday margarita and gaspacho session at my place', 'Wien Eichenstrasse 37', 'tequila, mexican', 'here will be an image', 8, '20', '5/09', 'spanish');

// 1 | Grill and chill         | grill, huge terasse, bier           | some veggies or meat to grill                                            | i got recently a nice bbq and what like to try it with some nice company   | Wien 1080             | grill                 | here will be an image | 9       | 15:00 | 27.07.2023 | english, german
//   2 | Bake with Ana           | flour, eggs and everything for the  | some sxtra ingri              looking_for                                |                                description                                 |       location        |         label         |dients for your favourite cookies, like chokolate or jam | would love to organise sunday baking session at my place                   | Wien Eichenstrasse 39 | cookies, bak---------------------------------------------------------+----------------------------------------------------------------------------+-----------------------+-----------------------+e, sweets | here will be an image | 8       | 12:00 | 27.05.2023 | english
//   3 | Gaspahcho and margarita | some cool bio tomatoes              | some snacks and meat to grill                                            | i got recently a nice bbq and what like to try it with some nice company   | Wien 1080             | grill                 |tequila                                                  | would love to organise thursday margarita and gaspacho session at my place | Wien Eichenstrasse 37 | tequila, mexdients for your favourite cookies, like chokolate or jam | would love to organise sunday baking session at my place                   | Wien Eichenstrasse 39 | cookies, bake, sweets |ican      | here will be an image | 8       | 20:00 | 5.09.2023  | english, spanish
