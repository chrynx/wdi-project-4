import React from 'react';
import '../../scss/components/landingpage/LoginForm.scss';

const LoginForm = ({ handleChange, handleSubmit }) => {
  return(
    <div className="LoginForm">
      <fieldset>
        <legend> Log In </legend>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email"> E-mail: </label>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="Enter your e-mail here"
          />

          <label htmlFor="password"> Password: </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password here"
          />
          <button>Log In</button>
        </form>
      </fieldset>
    </div>
  );
};

export default LoginForm;
