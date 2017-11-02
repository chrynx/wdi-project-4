import React from 'react';
import Axios from 'axios';
import Auth from '../misc/Auth';
import '../../scss/components/users/UsersMatch.scss';
import MessageForm from '../messages/MessageForm';

class UsersMatch extends React.Component {
  state = {
    message: {
      subject: '',
      text: '',
      image: '',
      sender: '',
      receiver: ''
    },
    form: 'hidden',
    matches: [],
    users: [],
    errors: {}
  }
  getMatches = () => {
    Axios
      .get(`/api/requests/${Auth.getPayload().userId}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => {
        const matches = res.data.filter(match => match.status === 'accepted');
        this.setState({ matches });
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.getMatches();
  }
  handleChange = ({ target: { name, value }}) => {
    const message = Object.assign({}, this.state.message, { [name]: value });
    this.setState({ message });
  }
  handleSubmit = (e, friend) => {
    e.preventDefault();
    this.setState({ form: 'hidden' });
    console.log('form submitted');
    const message = {
      ...this.state.message,
      sender: Auth.getPayload().userId,
      receiver: friend.id
    };

    Axios
      .post('/api/messages', message, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .catch(err => this.setState({ errors: err.response.data.errors}));
  }
  showForm =() => {
    this.setState({ form: 'visible' });
  }
  cancelForm =() => {
    this.setState({ form: 'hidden' });
  }
  render() {
    return(
      <section className="UsersMatch">
        {this.state.matches.map((match, i) => {
          return (
            <div className="card" key={i}>
              <div className="image">
                <img src={match.friend.imageSRC}/>
              </div>
              <div className="details">
                <h2>Username: {match.friend.username}</h2>
                <p>First Name: {match.friend.firstname}</p>
                <p>Last Name: {match.friend.lastname}</p>
                <p>Age: {match.friend.age}</p>
                <p>E-mail: {match.friend.email}</p>
                <button onClick={this.showForm}>Message</button>
                <MessageForm
                  style={this.state.form}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  message={this.state.message}
                  friend={match.friend}
                  close={this.cancelForm}
                  errors={this.state.errors}
                />
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}

export default UsersMatch;
