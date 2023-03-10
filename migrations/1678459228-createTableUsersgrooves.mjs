export async function up(sql) {
  await sql`
  CREATE TABLE usersgrooves (
    groove_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (groove _id, user_id),
    FOREIGN KEY (groove_id) REFERENCES groove(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`;
}

export async function down(sql) {
  await sql`
  DROP TABLE usersgrooves
`;
}
