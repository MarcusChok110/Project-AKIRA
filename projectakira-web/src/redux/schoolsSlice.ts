import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { School } from '../models/schoolModel';
import { API_ROUTES } from '../utils/constants';
import { RootState } from './store';
import StatusCodes from 'http-status-codes';

export const schoolsInitialState: School[] = [];

export const fetchSchools = createAsyncThunk(
  'schools/fetchStatus',
  async () => {
    const response = await axios.get(`${API_ROUTES.SCHOOLS}`);
    return response.data;
  }
);

export const addSchool = createAsyncThunk(
  'schools/addStatus',
  async (school: FormData) => {
    const response = await axios.post(`${API_ROUTES.SCHOOLS}`, school);
    return response.data;
  }
);

export const updateSchool = createAsyncThunk(
  'schools/updateStatus',
  async (school: FormData) => {
    const response = await axios.put(
      `${API_ROUTES.SCHOOLS}/${school.get('id')}`,
      school
    );
    return response.data;
  }
);

export const deleteSchool = createAsyncThunk(
  'schools/deleteStatus',
  async (schoolId: number) => {
    const response = await axios.delete(`${API_ROUTES.SCHOOLS}/${schoolId}`);
    return { status: response.status, id: schoolId };
  }
);

export const schoolsSlice = createSlice({
  name: 'schools',
  initialState: schoolsInitialState,
  reducers: {},
  extraReducers: {
    [fetchSchools.fulfilled.type]: (_state, { payload }) => {
      return payload;
    },
    [addSchool.fulfilled.type]: (state, { payload }) => {
      return [...state, payload];
    },
    [updateSchool.fulfilled.type]: (state, { payload }) => {
      return state.map((school) =>
        school.id === payload.id ? payload : school
      );
    },
    [deleteSchool.fulfilled.type]: (state, { payload }) => {
      if (payload.status === StatusCodes.NO_CONTENT)
        return state.filter((school) => school.id !== payload.id);
    },
  },
});

// add async thunks to school slice actions
export const schoolsActions = {
  fetchSchools,
  addSchool,
  updateSchool,
  deleteSchool,
};
export const selectSchools = (state: RootState) => state.school;
