import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Routes, { navLinks } from './components/routes';
import { schoolsActions } from './redux/schoolsSlice';
import { useAppDispatch } from './redux/store';
const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // fetch list of schools on app start
  useEffect(() => {
    dispatch(schoolsActions.fetchSchools());
  }, []);

  return (
    <BrowserRouter>
      <Layout links={navLinks}>
        <Routes></Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
