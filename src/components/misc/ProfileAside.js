import React from 'react';
import Axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import '../../scss/components/misc/ProfileAside.scss';
import Auth from './Auth';

class ProfileAside extends React.Component {
    state = {
      user: {}
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
          <Link to={'/users/' + Auth.getPayload().userId}> Edit Profile </Link>
          <div className="profileAsideInfo">
            <img src={this.state.user.imageSRC}/>
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
