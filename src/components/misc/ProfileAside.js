import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../../scss/components/misc/ProfileAside.scss';
import Auth from './Auth';

class ProfileAside extends React.Component {
    state = {
      user: {}
    }
    logout = () => {
      Auth.logout();
      this.props.history.push('/');
    }
    componentDidMount() {
      Axios
        .get(`/api/users/${Auth.getPayload().userId}`,{
          headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
        })
        .then(res => this.setState({ user: res.data}))
        .catch(err => console.log(err));
    }
    render() {
      return (
        <section className="ProfileAside">
          <div>
            <button onClick={this.logout}>Logout</button>
          </div>
          <div className="profileAsideInfo">
            <img src={this.state.user.image}/>
            <h3>First Name: </h3>
            <p>{this.state.user.firstname}</p>
            <h3>Last Name: </h3>
            <p>{this.state.user.lastname}</p>
            <h3>Age: </h3>
            <p>{this.state.user.age}</p>
            <h3>Preferred Gender: </h3>
            <p>{this.state.user.preferredGender}</p>
          </div>
        </section>
      );
    }
}

export default withRouter(ProfileAside);
