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
      .get(`/api/requests/${Auth.getPayload().userId}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => {
        const requests = res.data.filter(request => request.status === 'pending');
        this.setState({ requests });
      })
      .catch(err => console.log(err));
  }
  yesButton = id => {
    console.log(id);
    console.log('yes');
    Axios
      .post('/api/requests', { userId: Auth.getPayload().userId, requestId: id }, {
        headers: {'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => console.log('RES', res))
      .catch(err => console.log('ERR', err.response));
  }
  noButton = () => {
    console.log('no');
  }
  render() {
    console.log(this.state.requests);
    return (
      <section className="UsersRequest">
        {!this.state.requests && <p>Requests loading...</p>}
        {this.state.requests && this.state.requests.map((request, i) => {
          return (
            <div key={i}>
              <div className="requestDiv">
                <div className="requestLeft">
                  <img src={request.friend.image}/>
                </div>
                <div className="requestMiddle">
                  <p>First Name: <span>{request.friend.firstname}</span></p>
                  <p>Last Name: <span>{request.friend.lastname}</span></p>
                  <p>Age: <span>{request.friend.age}</span></p>
                </div>
                <div className="requestRight">
                  <button className="yesButton" onClick={() => this.yesButton(request.friend.id)} >YES</button>
                  <button className="noButton" onClick={this.noButton} >NO</button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}

export default UsersRequest;
