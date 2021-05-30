import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import School from '../../pages/School';
import Submission from '../../pages/Submission';

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Submission', path: '/submission' },
];

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/schools/:id">
        <School />
      </Route>
      <Route exact path="/submission/:id?">
        <Submission />
      </Route>
    </Switch>
  );
};

export default Routes;
