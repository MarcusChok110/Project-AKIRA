/**
 * true if NODE_ENV === 'production', false otherwise
 */
export const __prod__ = process.env.NODE_ENV === 'production';

export const SERVER_URL = __prod__
  ? 'https://projectakira-api.herokuapp.com/'
  : 'http://localhost:5000';

export const API_ROUTES = {
  SCHOOLS: `${SERVER_URL}/schools`,
};
