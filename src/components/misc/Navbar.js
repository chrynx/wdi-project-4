import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/components/misc/Navbar.scss';
import Auth from './Auth';
class Navbar extends React.Component {
  logout = () => {
    Auth.logout();
    this.props.history.push('/');
  }
  render() {
    return (
      <section className="Navbar">
        <div>
          <Link to="/users"><div>Users</div></Link>
          <Link to="/requests"><div>Requests</div></Link>
          <Link to="/matches"><div>Matches</div></Link>
          <Link to="/inbox"><div>Inbox</div></Link>
          <a href="/" onClick={this.logout}><div>Logout</div></a>
        </div>
      </section>
    );
  }
}

export default Navbar;
