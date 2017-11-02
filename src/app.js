import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './scss/style.scss';

// --------------global components-------------
import Navbar from './components/misc/Navbar';
import ProfileAside from './components/misc/ProfileAside';
import EmptyPage from './components/misc/EmptyPage';
import ProtectedRoute from './components/misc/ProtectedRoute';
import Auth from './components/misc/Auth';
// --------------global components END-------------

// ----------landing page components------------
import LandingPageHeader from './components/landingpage/LandingPageHeader';
import LandingPage from './components/landingpage/LandingPage';
import ProfileEdit from './components/misc/ProfileEdit';
// -------------landing page components END-------------

// --------------path "/users"------------------
import UsersIndex from './components/users/UsersIndex';
import UsersRequest from './components/users/UsersRequest';
import UsersMatch from './components/users/UsersMatch';
import UsersInbox from './components/users/UsersInbox';
// --------------path "/users" END------------------

class App extends React.Component {
  logout = () => {
    this.props.history.push('/');
    Auth.logout();
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <Route exact path="/" component={LandingPageHeader} />
            <ProtectedRoute logout={this.logout} component={Navbar} />
          </header>
          <div className="middle">
            <main>
              <Route exact path="/" component={LandingPage} />
              <ProtectedRoute exact path="/users" component={UsersIndex} />
              <ProtectedRoute path="/users/:id" component={ProfileEdit} />
              <ProtectedRoute exact path="/requests" component={UsersRequest} />
              <ProtectedRoute exact path="/matches" component={UsersMatch} />
              <ProtectedRoute exact path="/inbox" component={UsersInbox} />
            </main>
            <aside>
              {!Auth.isAuthenticated() && <Route exact path="/" component={EmptyPage} /> }
              <ProtectedRoute component={ProfileAside} />
            </aside>
          </div>
          <footer>
            <p>Chrynx 2017</p>
            <p>Made with &hearts;</p>
            <p>General Assembly</p>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
