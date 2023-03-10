export async function up(sql) {
  await sql`
  CREATE TABLE usersgrooves (
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    groove_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (groove_id) REFERENCES grooves(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`;
}

export async function down(sql) {
  await sql`
  DROP TABLE usersgrooves
`;
}
