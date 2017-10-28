import React from 'react';
import Axios from 'axios';
import Auth from '../misc/Auth';
import '../../scss/components/users/UsersRequest.scss';

class UsersRequest extends React.Component {
  state = {
    requests: [],
    users: []
  }
  componentDidMount() {
    Axios
      .get(`/api/users/${Auth.getPayload().userId}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ requests: res.data.requests }))
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.state.requests[0]);
    return (
      <section className="UsersRequest">
        {this.state.requests.map((request, i) => {
          let user = {};
          Axios
            .get(`/api/users/${request}`, {
              headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
            })
            .then(res => {
              return user = res.data;
            })
            .catch(err => console.log(err));
          return (
            <div key={i}>
              <p>{user.firstname}</p>
            </div>
          );
        })}
      </section>
    );
  }
}

export default UsersRequest;
