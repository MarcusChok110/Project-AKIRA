import { Pool } from 'pg';
import { School, SchoolDTO } from '../models/schoolModel';

export const dbName = 'schools';

// Returns all schools from database
export async function getSchools(pool: Pool): Promise<School[]> {
  const result = await pool.query<School>(
    `SELECT * FROM ${dbName} ORDER BY id;`
  );
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
  s3: AWS.S3,
  school: SchoolDTO
): Promise<School | undefined> {
  const uploadParams = createS3UploadParams(school.image!);
  const uploadResult = await s3.upload(uploadParams).promise();

  const dbResult = await pool.query<School>(
    `
        INSERT INTO ${dbName} (name, about, location, admission, image)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `,
    [...extractFieldsFromSchool(school).slice(0, 4), uploadResult.Location]
  );

  return dbResult.rows[0];
}

// Updates a school in the database by id
export async function updateSchool(
  pool: Pool,
  s3: AWS.S3,
  school: SchoolDTO
): Promise<School | undefined> {
  const oldSchool = await findSchool(pool, school.id);
  if (oldSchool.length === 0) return await insertSchool(pool, s3, school);

  let image = oldSchool[0]?.image;

  // update image URL if image in request
  if (school.image) {
    const uploadParams = createS3UploadParams(school.image);
    const uploadResult = await s3.upload(uploadParams).promise();
    image = uploadResult.Location;
  }

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
    [...extractFieldsFromSchool(school).slice(0, 4), image, school.id]
  );

  return result.rows[0];
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
export function extractFieldsFromSchool(school: School | SchoolDTO) {
  return [
    school.name,
    school.about,
    school.location,
    school.admission,
    school.image,
    school.id,
  ];
}

export function createS3UploadParams(
  image: Express.Multer.File
): AWS.S3.PutObjectRequest {
  return {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: image.originalname,
    Body: image.buffer,
    ACL: 'public-read',
  };
}
