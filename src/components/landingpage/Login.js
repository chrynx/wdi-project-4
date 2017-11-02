import React from 'react';
import { withRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import Axios from 'axios';
import Auth from '../misc/Auth';

class Login extends React.Component {
  state = {
    credentials: {
      email: '',
      password: ''
    },
    style: '',
    error: null
  };
  componentDidMount() {
    this.setState({ style: this.props.style });
  }
  handleChange = ({ target: { name, value } }) => {
    const credentials = Object.assign({}, this.state.credentials, { [name]: value });
    this.setState({ credentials });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/api/login', this.state.credentials)
      .then((res) => {
        Auth.setToken(res.data.token);
        this.props.history.push('/users');
      })
      .catch(() => this.setState({ error: 'Invalid credentials' }));
  }

  render() {
    return (
      <LoginForm
        style={this.props.style}
        credentials={this.state.credentials}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        error={this.state.error}
      />
    );
  }
}

export default withRouter(Login);
