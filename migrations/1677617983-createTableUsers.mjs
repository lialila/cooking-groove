export async function up(sql) {
  await sql`
  CREATE TABLE grooves (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL,
  user_id varchar(20) NOT NULL,
  offer varchar(600) NOT NULL,
  what_looking_for varchar(600) NOT NULL,
  description varchar(600),
  time varchar(600) ,
  date varchar(600) NOT NULL,
  location varchar(300) NOT NULL,
  label varchar(300),
  photo varchar(300),
  language varchar(300)
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE grooves
  `;
}
