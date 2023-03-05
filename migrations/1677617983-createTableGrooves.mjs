export async function up(sql) {
  await sql`
  CREATE TABLE grooves (
  id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name varchar(30) NOT NULL,
  offer varchar(600) NOT NULL,
  looking_for varchar(600) NOT NULL,
  description varchar(600),
  location varchar(300) NOT NULL,
  label varchar(300),
  img_url varchar(300),
  user_id varchar(20) NOT NULL,
  time varchar(600) ,
  date varchar(600) NOT NULL,
  language varchar(300)
  -- image_url varchar(1000)

);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE grooves
  `;
}
