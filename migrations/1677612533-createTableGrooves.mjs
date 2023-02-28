export async function up(sql) {
  await sql`
CREATE TABLE users(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username varchar(30) NOT NULL UNIQUE,
  name varchar(80) NOT NULL,
  email varchar(50) NOT NULL,
  eating_experience varchar(600),
  cooking_experience varchar(600),
  favourite_food varchar(600),
  language varchar(300),
  password_hash varchar(70) UNIQUE
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE users
  `;
}
