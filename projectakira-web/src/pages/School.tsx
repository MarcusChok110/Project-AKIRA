import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { schoolsActions, selectSchools } from '../redux/schoolsSlice';
import { useAppDispatch } from '../redux/store';

const School: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const schools = useSelector(selectSchools);
  const school = schools.filter((school) => school.id === Number(id))[0];

  // school id not found, go back to home page
  if (!school) {
    history.push('/');
    // will throw an error if school is not present because it moves onto the next line
    // this happens when the user directly goes to a page such as /schools/27
    return <></>;
  }

  // list of information about school to be displayed
  const info = [
    { title: 'ABOUT OUR SCHOOL', body: school.about },
    { title: 'LOCATION', body: school.location },
    { title: 'ADMISSIONS', body: school.admission },
  ];

  const onEditClick = () => history.push(`/submission/${school.id}`);
  const onDeleteClick = () => {
    dispatch(schoolsActions.deleteSchool(school.id));
    history.push('/');
  };

  return (
    <>
      <img
        src={school.image}
        className="card-side-img mb-3"
        alt={school.name}
      />
      <h1 className="text-center card-title">{school.name}</h1>
      <div className="container">
        {info.map((school, index) => (
          <div key={index}>
            <h2 className="display-6">{school.title}</h2>
            <p className="ws-pre-wrap">{school.body}</p>
            <hr />
          </div>
        ))}
        <div className="d-grid gap-2">
          <button className="btn-primary btn" onClick={onEditClick}>
            Edit
          </button>
          <button className="btn-danger btn" onClick={onDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default School;
