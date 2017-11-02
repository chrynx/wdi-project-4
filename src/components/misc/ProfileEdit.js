import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import DragDrop from './DragDrop';
import Auth from './Auth';
import '../../scss/components/misc/ProfileEdit.scss';


class ProfileEdit extends React.Component {
  state = {
    user: {},
    updateStyle: 'hidden',
    errors: {}
  }
  componentDidMount() {
    console.log('8========= profileEdit =============D');
    Axios
      .get(`/api/users/${Auth.getPayload().userId}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log(err));
  }
  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .put(`/api/users/${Auth.getPayload().userId}`, this.state.user , {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => {
        this.setState({ updateStyle: 'visible'});
      })
      .catch((err) => {
        console.log('the form did not submit');
        this.setState({ errors: err.response.data.errors });
      });
    console.log('form submitted');
  }
  cancelButton = () => {
    this.props.history.push('/users');
  }
  deleteUser = () => {
    Axios
      .delete(`/api/users/${Auth.getPayload().userId}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .catch(err => console.log(err));
    Auth.logout();
    this.props.history.push('/');

  }

  render() {
    console.log('within the render', this.state.user);
    return (
      <section className="ProfileEdit">
        <form onSubmit={this.handleSubmit}>
          <h2>Edit Profile</h2>
          <div className={this.state.errors.firstname ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="firstname"> First Name: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="firstname"
              value={this.state.user.firstname}
              placeholder="Enter your first name here"
            />
            {this.state.errors.firstname && <small className="has-error">{this.state.errors.firstname}</small>}
          </div>
          <div className={this.state.errors.lastname ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="lastname"> Last Name: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="lastname"
              value={this.state.user.lastname}
              placeholder="Enter your last name here"
            />
            {this.state.errors.lastname && <small className="has-error">{this.state.errors.lastname}</small>}
          </div>
          <div className={this.state.errors.image ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="image"> Image: </label>
            <DragDrop
              onChange={this.handleChange}
              value={this.state.user.base64 || this.state.user.imageSRC}
            />
            {this.state.errors.image && <small className="has-error">{this.state.errors.image}</small>}
          </div>
          <div className={this.state.errors.age ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="age"> Age: </label>
            <input
              onChange={this.handleChange}
              type="number"
              name="age"
              value={this.state.user.age}
              placeholder="Enter your Age here"
            />
            {this.state.errors.age && <small className="has-error">{this.state.errors.age}</small>}
          </div>
          <div className={this.state.errors.gender ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="gender"> Gender: </label>
            <select
              onChange={this.handleChange}
              name="gender"
              value={this.state.user.gender}
            >
              <option>Choose your gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Gay</option>
              <option>Lesbian</option>
              <option>Bi</option>
              <option>Apache Helicopter</option>
            </select>
            {this.state.errors.gender && <small className="has-error">{this.state.errors.gender}</small>}
          </div>
          <div className={this.state.errors.preferredGender ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="preferredGender"> Preferred Gender: </label>
            <select
              name="preferredGender"
              onChange={this.handleChange}
              value={this.state.user.preferredGender}
            >
              <option>Choose your preferred gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Gay</option>
              <option>Lesbian</option>
              <option>Bi</option>
              <option>Apache Helicopter</option>
            </select>
            {this.state.errors.preferredGender && <small className="has-error">{this.state.errors.preferredGender}</small>}
          </div>
          <div className={this.state.errors.username ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="username"> Username: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="username"
              value={this.state.user.username}
              placeholder="Enter your Username here"
            />
            {this.state.errors.username && <small className="has-error">{this.state.errors.username}</small>}
          </div>




          <div className={this.state.errors.email ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="email"> E-mail: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="email"
              value={this.state.user.email}
              placeholder="Enter your E-mail here"
            />
            {this.state.errors.email && <small className="has-error">{this.state.errors.email}</small>}
          </div>
          <hr />
          <small>WARNING, ONLY FILL OUT THE BOX UNDERNEATH IF YOU WISH TO CHANGE YOUR PASSWORD</small>
          <hr />
          <div className={this.state.errors.password ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="password"> Password: </label>
            <input
              onChange={this.handleChange}
              type="password"
              name="password"
              value={this.state.user.password}
              placeholder="Enter your Password here"
            />
            {this.state.errors.password && <small className="has-error">{this.state.errors.password}</small>}
          </div>
          <div className={this.state.errors.passwordConfirmation ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="passwordConfirmation"> Password Confirmation: </label>
            <input
              onChange={this.handleChange}
              type="password"
              name="passwordConfirmation"
              value={this.state.user.passwordConfirmation}
              placeholder="Please confirm your password here"
            />
            {this.state.errors.passwordConfirmation && <small className="has-error">{this.state.errors.passwordConfirmation}</small>}
          </div>
          <small style={{ visibility: this.state.updateStyle }}>Your profile has been updated, please refresh the page or log out to see the changes</small>
          <button>Submit</button>
          <button onClick={this.cancelButton}>Cancel</button>
          <button className="delete" onClick={this.deleteUser}>Delete Profile</button>
        </form>
      </section>
    );
  }
}

export default withRouter(ProfileEdit);
