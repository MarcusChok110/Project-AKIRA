import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import SchoolCard from '../components/SchoolCard';
import { selectSchools } from '../redux/schoolsSlice';

const Home: React.FC = () => {
  const history = useHistory();
  let schools = useSelector(selectSchools);
  // get the url search param 'search'
  const query = new URLSearchParams(useLocation().search).get('search');

  // filter list of schools based on search params
  if (query) {
    schools = schools.filter((school) =>
      school.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  const onCreateClick = () => {
    history.push('/submission');
  };

  return (
    <div className="container">
      <div className="d-flex my-2">
        <h1>Home</h1>
        <div className="flex-grow-1"></div>
        <button onClick={onCreateClick} className="btn btn-primary">
          Create
        </button>
      </div>
      {schools.map((school, index) => (
        <SchoolCard school={school} key={index} />
      ))}
    </div>
  );
};

export default Home;
