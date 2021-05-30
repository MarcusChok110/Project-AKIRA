import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FormControl from '../components/FormControl';
import { SchoolDTO } from '../models/schoolModel';
import { schoolsActions, selectSchools } from '../redux/schoolsSlice';
import { useAppDispatch } from '../redux/store';

const Submission: React.FC = () => {
  // see whether user is editing an existing school or adding a new one
  const { id } = useParams<{ id?: string }>();
  const editing = Boolean(id);
  const title = editing ? 'Edit Your School Page' : 'Add a School';

  const dispatch = useAppDispatch();
  const history = useHistory();

  // find existing school; if trying to edit nonexistent school, go to home page
  const schools = useSelector(selectSchools);
  const school = schools.filter((school) => school.id === Number(id))[0];
  if (editing && !school) history.push('/');

  // form controls
  const [image, setImage] = useState<Blob>();
  const [name, setName] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [admission, setAdmission] = useState<string>('');

  // set initial values if editing
  useEffect(() => {
    if (editing && school) {
      setName(school.name);
      setAbout(school.about);
      setLocation(school.location);
      setAdmission(school.admission);
    }
  }, []);

  const schoolData = {
    image,
    name,
    about,
    location,
    admission,
    id: school?.id,
  } as SchoolDTO;

  // event handlers

  const onCancelClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (editing) history.push(`/schools/${id}`);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!editing && !image) return;

    const formData = new FormData();

    for (const [key, entry] of Object.entries(schoolData)) {
      formData.append(key, entry);
    }

    if (editing) {
      dispatch(schoolsActions.updateSchool(formData));
    } else {
      dispatch(schoolsActions.addSchool(formData));
    }
    history.push('/');
  };

  const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>
        <FormControl
          id="image"
          label={(editing ? 'New ' : '') + 'Image (gif, jpeg, jpg, png)'}
        >
          <input
            className="form-control"
            id="image"
            type="file"
            accept=".gif,.jpeg,.jpg,.png"
            onChange={onFileUpload}
            required={!editing}
          />
        </FormControl>
        <FormControl id="name" label="Name">
          <input
            className="form-control"
            id="name"
            type="text"
            maxLength={255}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="about" label="About">
          <textarea
            className="form-control"
            id="about"
            rows={3}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="location" label="Location">
          <textarea
            className="form-control"
            id="location"
            rows={3}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="admission" label="Admission">
          <textarea
            className="form-control"
            id="admission"
            rows={3}
            value={admission}
            onChange={(e) => setAdmission(e.target.value)}
            required
          />
        </FormControl>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {editing ? (
            <button
              type="button"
              className="btn btn-warning"
              onClick={onCancelClick}
            >
              Cancel
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
};

export default Submission;
