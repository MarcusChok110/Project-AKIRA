import { Pool } from 'pg';
import { School } from '../models/schoolModel';

export const dbName = 'schools';

// Returns all schools from database
export async function getSchools(pool: Pool): Promise<School[]> {
  const result = await pool.query<School>(`SELECT * FROM ${dbName};`);
  return result.rows;
}

// Returns one school by id from database
export async function findSchool(pool: Pool, id: number): Promise<School[]> {
  const result = await pool.query<School>(
    `SELECT * FROM ${dbName} WHERE id = $1;`,
    [id]
  );
  return result.rows;
}

// Creates a new school in the database
export async function insertSchool(
  pool: Pool,
  school: School
): Promise<School | undefined> {
  const result = await pool.query<School>(
    `
    INSERT INTO ${dbName} (name, about, location, admission, image)
    VALUES ($1, $2, $3, $3, $4, $5)
    RETURNING *;
    `,
    extractFieldsFromSchool(school)
  );

  return result.rows[0];
  // TODO: handle image uploading with s3
}

// Updates a school in the database by id
export async function updateSchool(
  pool: Pool,
  school: School
): Promise<School | undefined> {
  const oldSchool = await findSchool(pool, school.id);

  if (oldSchool.length == 0) return await insertSchool(pool, school);

  const result = await pool.query<School>(
    `
    UPDATE ${dbName}
    SET name = $1,
        about = $2,
        location = $3,
        admission = $4,
        image = $5
    WHERE id = $6
    RETURNING *;
    `,
    extractFieldsFromSchool(school)
  );

  return result.rows[0];
  // TODO: handle image uploading with s3
}

// Deletes a school from the database by id
export async function deleteSchool(pool: Pool, id: number): Promise<boolean> {
  const result = await pool.query<School>(
    `DELETE FROM ${dbName} WHERE id = $1 RETURNING id;`,
    [id]
  );

  return result.rowCount > 0;
}

// For inserting/updating values in specified order for SQL queries
export function extractFieldsFromSchool(school: School) {
  return [
    school.name,
    school.about,
    school.location,
    school.admission,
    school.image,
    school.id,
  ];
}
