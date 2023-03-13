export async function up(sql) {
  await sql`
  CREATE TABLE usersgrooves (
    grooves_id INTEGER NOT NULL,
    users_id INTEGER NOT NULL,
    PRIMARY KEY (grooves_id, users_id),
    FOREIGN KEY (grooves_id) REFERENCES grooves(id) ON DELETE CASCADE,
    FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE
  )`;
}

export async function down(sql) {
  await sql`
  DROP TABLE usersgrooves
`;
}
