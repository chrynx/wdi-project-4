import React from 'react';
import '../../scss/components/landingpage/RegisterForm.scss';

const LoginForm = ({ handleChange, handleSubmit, user }) => {

  return(
    <div className="RegisterForm">
      <legend>Register</legend>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname"> First Name: </label>
        <input
          onChange={handleChange}
          type="text"
          name="firstname"
          value={user.firstname}
          placeholder="Enter your first name here"
        />
        <label htmlFor="lastname"> Last Name: </label>
        <input
          onChange={handleChange}
          type="text"
          name="lastname"
          value={user.lastname}
          placeholder="Enter your last name here"
        />
        <label htmlFor="image"> Image: </label>
        <input
          onChange={handleChange}
          type="text"
          name="image"
          value={user.image}
          placeholder="Enter an image here"
        />
        <label htmlFor="age"> Age: </label>
        <input
          onChange={handleChange}
          type="number"
          name="age"
          value={user.age}
          placeholder="Enter your Age here"
        />
        <div className="genders">
          <label htmlFor="gender"> Gender: </label>
          <select
            onChange={handleChange}
            name="gender"
            value={user.gender}
          >
            <option>Choose your gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Gay</option>
            <option>Lesbian</option>
            <option>Bi</option>
            <option>Apache Helicopter</option>
          </select>
          <label htmlFor="preferredGender"> Preferred Gender: </label>
          <select
            name="preferredGender"
            onChange={handleChange}
            value={user.preferredGender}
          >
            <option>Choose your preferred gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Gay</option>
            <option>Lesbian</option>
            <option>Bi</option>
            <option>Apache Helicopter</option>
          </select>
        </div>
        <label htmlFor="username"> Username: </label>
        <input
          onChange={handleChange}
          type="text"
          name="username"
          value={user.username}
          placeholder="Enter your Username here"
        />
        <label htmlFor="email"> E-mail: </label>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          value={user.email}
          placeholder="Enter your E-mail here"
        />
        <label htmlFor="password"> Password: </label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={user.password}
          placeholder="Enter your Password here"
        />
        <label htmlFor="passwordConfirmation"> Password Confirmation: </label>
        <input
          onChange={handleChange}
          type="password"
          name="passwordConfirmation"
          value={user.passwordConfirmation}
          placeholder="Please confirm your password here"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
