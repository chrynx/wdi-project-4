import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../scss/components/landingpage/LandingPage.scss';
import Login from './Login';
import Register from './Register';
import Auth from '../misc/Auth';

class LandingPage extends Component {
  componentWillMount() {
    if (Auth.isAuthenticated()) {
      this.props.history.replace('/users');
    }
  }

  render() {
    return (
      <section className="LandingPage">
        <div className="forms">
          <Login />
          <Register />
        </div>
      </section>
    );
  }
}

export default withRouter(LandingPage);
