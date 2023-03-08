
CREATE TABLE users(
   id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username(30) NOT NULL,
  email varchar(30) NOT NULL,
  eating_experience varchar(600),
  cooking_experience varchar(600),
  favourite_food varchar(600)
  language varchar(300)
);

INSERT INTO users
(username, email, eating_experience, cooking_experience, favourite_food, language)
VALUES ();

CREATE TABLE grooves(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   name varchar(30) NOT NULL,
  offer varchar(600) NOT NULL,
  looking_for varchar(600) NOT NULL,
  description varchar(600),
  time varchar(600) ,
  date varchar(600) NOT NULL,
  location varchar(300) NOT NULL,
  label varchar(300),
  photo varchar(300),
    language varchar(300)
);

INSERT INTO grooves
(name, offer, what_looking_for, description, time, date, location, label, photo, language)
VALUES ('Bake cookies with Ana', 'i have everything for the cookies dough', 'some decoration: chocolate or whatebver you like', 'bring good mood with you!', '14:00', '2.07.2023', 'Wien 1080', 'girls', 'photo', 'english, german, french');
