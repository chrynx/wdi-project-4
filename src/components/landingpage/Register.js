import React from 'react';
import { withRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import Axios from 'axios';

class Register extends React.Component {

  state = {
    user: {
      firstname: '',
      lastname: '',
      image: '',
      age: 0,
      gender: '',
      prefferedGender: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  };

  componentDidMount() {
    console.log(this.props);
  }
  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/api/register', this.state.user)
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <RegisterForm
        user={this.state.user}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
      />
    );
  }
}

export default withRouter(Register);
