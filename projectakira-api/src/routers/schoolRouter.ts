import express from 'express';
import * as schoolService from '../services/schoolService';
import { pool } from '../data/connections';
import { StatusCodes } from 'http-status-codes';

const schoolRouter = express.Router();

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
  const school = req.body;
  const result = await schoolService.insertSchool(pool, school);
  res.json(result);
});

// PUT /schools/:id
schoolRouter.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const school = { ...req.body, id };
  const result = await schoolService.updateSchool(pool, school);
  res.json(result);
});

// DELETE /schools/:id
schoolRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const result = await schoolService.deleteSchool(pool, id);

  return result
    ? res.status(StatusCodes.NO_CONTENT)
    : res.status(StatusCodes.NOT_FOUND);
});

export { schoolRouter };
