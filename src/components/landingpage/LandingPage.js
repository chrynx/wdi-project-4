import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../scss/components/landingpage/LandingPage.scss';
import Login from './Login';
import Register from './Register';
import Auth from '../misc/Auth';

class LandingPage extends Component {
  state = {
    registerStyle: 'hidden',
    loginStyle: 'hidden'
  }
  componentWillMount() {
    if (Auth.isAuthenticated()) {
      this.props.history.replace('/users');
    }
  }
  showRegister = () => {
    this.setState({ registerStyle: 'visible' });
    this.setState({ loginStyle: 'hidden' });
  }
  showLogin = () => {
    this.setState({ loginStyle: 'visible' });
    this.setState({ registerStyle: 'hidden' });
  }
  render() {
    return (
      <section className="LandingPage">
        <div className="forms">
          <Login style={this.state.loginStyle}/>
          <div className="question">Would you like to <button onClick={this.showRegister}>Register</button>? Or would you like to <button onClick={this.showLogin}>Log in</button>?</div>
          <Register style={this.state.registerStyle} showLogin={this.showLogin}/>
        </div>
      </section>
    );
  }
}

export default withRouter(LandingPage);
