import React from 'react';
import '../../scss/components/landingpage/LandingPage.scss';
import Login from './Login';
import Register from './Register';

const LandingPage = () => {
  return (
    <section className="LandingPage">
      <div className="forms">
        <Login />
        <Register />
      </div>
    </section>
  );
};

export default LandingPage;
