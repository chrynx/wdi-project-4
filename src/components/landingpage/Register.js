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
      preferredGender: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      base64: ''
    },
    style: '',
    errors: {}
  };

  componentDidMount() {
    this.setState({ style: this.props.style });
  }

  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/api/register', this.state.user)
      .then(() => this.props.showLogin())
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <RegisterForm
        style={this.props.style}
        user={this.state.user}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
      />
    );
  }
}

export default withRouter(Register);
