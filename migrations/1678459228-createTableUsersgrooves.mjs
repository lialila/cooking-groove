export async function up(sql) {
  await sql`
  CREATE TABLE usersgrooves (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    groove_id INTEGER REFERENCES grooves(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
    )`;
}

export async function down(sql) {
  await sql`
  DROP TABLE usersgrooves
`;
}
