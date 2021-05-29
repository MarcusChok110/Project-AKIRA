import { Pool } from 'pg';
import dotenv from 'dotenv';
import { pool } from '../data/connections';
import { dbName } from '../services/schoolService';

/**
 * Creates a new table in the Postgres database to store school info
 *
 * Will delete old table if it exists
 * @param pool Pool with connection to database
 */
export async function createDb(pool: Pool) {
  await pool.query(`DROP TABLE IF EXISTS ${dbName}`);
  await pool.query(`
    CREATE TABLE ${dbName} (
      id serial PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      about TEXT,
      location TEXT,
      admission TEXT,
      image VARCHAR(255)
    );
  `);
}

dotenv.config(); // ensure that environment variables are loaded
createDb(pool);
