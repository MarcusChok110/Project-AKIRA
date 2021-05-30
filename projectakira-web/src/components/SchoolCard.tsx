import React from 'react';
import { useHistory } from 'react-router';
import { School } from '../models/schoolModel';

export interface SchoolCardProps {
  school: School;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  const history = useHistory();

  const onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    history.push(`/schools/${school.id}`);
  };

  return (
    <div onClick={onClick} className="card mb-3 zoom">
      <div className="row g-0">
        <div className="col-md-4 position-relative">
          <img className="card-side-img" src={school.image} alt={school.name} />
          <div className="hover-overlay">
            <h2 className="hover-text">VIEW</h2>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body d-flex flex-column h-100">
            <h5 className="card-title">{school.name}</h5>
            <div className="flex-grow-1">
              <p className="card-text preview-text">{school.about}</p>
            </div>
            <div className="text-end">
              <span className="badge mt-auto bg-success">ENROLLING NOW!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
