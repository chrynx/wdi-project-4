import React from 'react';
import Axios from 'axios';
import '../../scss/components/users/UsersIndex.scss';
class UsersIndex extends React.Component {
  state = {
    users: [],
    errors: {}
  }
  componentDidMount() {
    Axios
      .get('/api/users')
    // .then(res => console.log(res.data))
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }
  handleClick = (e) => {
    console.dir(e);
  }
  render() {
    console.log(this.state.users);
    return (
      <section className="UsersIndex">
        {this.state.users.map((user, i) => {
          return (
            <div
              key={i}
              onClick={this.handleClick}
            >
              <div className="card">
                <img src={user.image} />
                <p>{user.firstname}</p>
                <p>{user.age}</p>
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}

export default UsersIndex;
