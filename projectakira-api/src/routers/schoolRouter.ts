import express from 'express';
import * as schoolService from '../services/schoolService';
import { pool, s3 } from '../data/connections';
import { StatusCodes } from 'http-status-codes';
import { SchoolDTO } from '../models/schoolModel';

export const schoolRouter = express.Router();

// GET /schools
schoolRouter.get('/', async (_req, res) => {
  const schools = await schoolService.getSchools(pool);
  res.json(schools);
});

// GET /schools/:id
schoolRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const school = await schoolService.findSchool(pool, id);
  res.json(school);
});

// POST /schools
schoolRouter.post('/', async (req, res) => {
  const school: SchoolDTO = { ...req.body, image: req.file };

  const result = await schoolService.insertSchool(pool, s3, school);
  res.json(result);
});

// PUT /schools/:id
schoolRouter.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const school = { ...req.body, image: req.file, id };
  const result = await schoolService.updateSchool(pool, s3, school);
  res.json(result);
});

// DELETE /schools/:id
schoolRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const result = await schoolService.deleteSchool(pool, id);

  return result
    ? res.status(StatusCodes.NO_CONTENT).send()
    : res.status(StatusCodes.NOT_FOUND).send();
});
