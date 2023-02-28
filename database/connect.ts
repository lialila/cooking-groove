import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

// export const sql = postgres({
//   transform: {
//     ...postgres.camel,
//     undefined: null,
//   },
// });

// Type needed for the connection funtion below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database

function connectOneTimeToDatabase() {
  if (!globalThis.postgresSqlClient) {
    globalThis.postgresSqlClient = postgres({
      transform: {
        ...postgres.camel,
        undefined: null,
      },
    });
  }
  return globalThis.postgresSqlClient;
}

export const sql = connectOneTimeToDatabase();
