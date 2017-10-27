import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/components/misc/Navbar.scss';
const Navbar = () => {
  return(
    <section className="Navbar">
      <div>
        <Link to="/users"><div>Users</div></Link>
        <Link to="/requests"><div>Requests</div></Link>
        <Link to="/matches"><div>Matches</div></Link>
        <Link to="/inbox"><div>Inbox</div></Link>
        <Link to="/sent"><div>Sent</div></Link>
      </div>
    </section>
  );
};

export default Navbar;
