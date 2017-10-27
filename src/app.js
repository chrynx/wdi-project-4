import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './scss/style.scss';

// --------------global components-------------
import Navbar from './components/misc/Navbar';
import ProfileAside from './components/misc/ProfileAside';
import EmptyPage from './components/misc/EmptyPage';
// --------------global components END-------------

// ----------landing page components------------
import LandingPageHeader from './components/landingpage/LandingPageHeader';
import LandingPage from './components/landingpage/LandingPage';
// -------------landing page components END-------------

// --------------path "/users"------------------
import UsersIndex from './components/users/UsersIndex';
import UsersRequest from './components/users/UsersRequest';
import UsersMatch from './components/users/UsersMatch';
import UsersInbox from './components/users/UsersInbox';
import UsersSent from './components/users/UsersSent';
// --------------path "/users" END------------------

class App extends React.Component {
  state = {
    user: {}
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            { this.state.user ? <Navbar /> : <LandingPageHeader /> }
          </header>
          <div className="middle">
            <main>
              <Route exact path="/" component={LandingPage} />
              <Route path="/users" component={UsersIndex} />
              <Route path="/requests" component={UsersRequest} />
              <Route path="/matches" component={UsersMatch} />
              <Route path="/inbox" component={UsersInbox} />
              <Route path="/sent" component={UsersSent} />
            </main>
            <aside>
              { this.state.user ?
                <ProfileAside />
                :
                <EmptyPage />
              }
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
