import React from 'react';
import DragDrop from '../misc/DragDrop';
import '../../scss/components/landingpage/RegisterForm.scss';

const LoginForm = ({ handleChange, handleSubmit, user, style, errors }) => {

  return(
    <div className="RegisterForm">
      <form style={{ visibility: style }} onSubmit={handleSubmit}>
        <h2>Register</h2>


        <div className={errors.firstname ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="firstname"> First Name: </label>
          <input
            onChange={handleChange}
            type="text"
            name="firstname"
            value={user.firstname}
            placeholder="Enter your first name here"
          />
          {errors.firstname && <small className="has-error">{errors.firstname}</small>}
        </div>


        <div className={errors.lastname ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="lastname"> Last Name: </label>
          <input
            onChange={handleChange}
            type="text"
            name="lastname"
            value={user.lastname}
            placeholder="Enter your last name here"
          />
          {errors.lastname && <small className="has-error">{errors.lastname}</small>}
        </div>


        <div className={errors.image ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="image"> Image: </label>
          <DragDrop
            onChange={handleChange}
            value={user.base64 || user.imageSRC}
          />
          {errors.image && <small className="has-error">{errors.image}</small>}
        </div>


        <div className={errors.age ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="age"> Age: </label>
          <input
            onChange={handleChange}
            type="number"
            name="age"
            value={user.age}
            placeholder="Enter your Age here"
          />
          {errors.age && <small className="has-error">{errors.age}</small>}
        </div>


        <div className={errors.gender ? 'form-group has-error' : 'form-group'}>
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
          {errors.gender && <small className="has-error">{errors.gender}</small>}
        </div>





        <div className={errors.preferredGender ? 'form-group has-error' : 'form-group'}>
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
          {errors.preferredGender && <small className="has-error">{errors.preferredGender}</small>}
        </div>



        <div className={errors.username ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="username"> Username: </label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            value={user.username}
            placeholder="Enter your Username here"
          />
          {errors.username && <small className="has-error">{errors.username}</small>}
        </div>




        <div className={errors.email ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="email"> E-mail: </label>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={user.email}
            placeholder="Enter your E-mail here"
          />
          {errors.email && <small className="has-error">{errors.email}</small>}
        </div>




        <div className={errors.password ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="password"> Password: </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={user.password}
            placeholder="Enter your Password here"
          />
          {errors.password && <small className="has-error">{errors.password}</small>}
        </div>




        <div className={errors.passwordConfirmation ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="passwordConfirmation"> Password Confirmation: </label>
          <input
            onChange={handleChange}
            type="password"
            name="passwordConfirmation"
            value={user.passwordConfirmation}
            placeholder="Please confirm your password here"
          />
          {errors.passwordConfirmation && <small className="has-error">{errors.passwordConfirmation}</small>}
        </div>





        <button>Submit</button>
      </form>
    </div>
  );
};
export default LoginForm;
