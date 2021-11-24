import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from '../components/Main';
import NotFoundError from '../components/NotFound';

const Urls = () =>{
  return (
    <Router>
      <Switch>
        <Route exact={true} path='/' 
          component={Main} />
        <Route component={NotFoundError} />
      </Switch>
    </Router>
  );
};

export default Urls;
