import { Pool } from 'pg';
import AWS from 'aws-sdk';

const pool = new Pool();
const s3 = new AWS.S3();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export { pool, s3 };
