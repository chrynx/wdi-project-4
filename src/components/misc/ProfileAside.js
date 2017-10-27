import React from 'react';
import Axios from 'axios';
import '../../scss/components/misc/ProfileAside.scss';

class ProfileAside extends React.Component {
    state = {
      user: {}
    }
    componentDidMount() {
      Axios
        .get('/api/users')
        .then(res => this.setState({ user: res.data[1]}))
        .catch(err => console.log(err));
    }
    render() {
      return (
        <section className="ProfileAside">
          <div>
            <button>Edit</button>
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

export default ProfileAside;
