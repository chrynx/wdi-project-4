import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import Auth from './Auth';

const ProtectedRoute = ({ component: Component, ...other }) => {
  return (
    <Route {...other} render={props => (
      Auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    )}/>
  );
};


export default withRouter(ProtectedRoute);
