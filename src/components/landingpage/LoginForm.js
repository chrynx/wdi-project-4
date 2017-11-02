import React from 'react';
import '../../scss/components/landingpage/LoginForm.scss';

const LoginForm = ({ handleChange, handleSubmit, style, error }) => {
  return(
    <div className="LoginForm">
      <form style={{ visibility: style}} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='form-group'>
          <label htmlFor="email"> E-mail: </label>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="Enter your e-mail here"
          />
        </div>

        <div className='form-group'>
          <label htmlFor="password"> Password: </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password here"
          />
        </div>
        {error && <div>
          <small className="has-error">{error}</small>
        </div>}
        <button>Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
