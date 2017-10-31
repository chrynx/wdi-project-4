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
    messageSent: 'hidden',
    matches: [],
    users: []
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
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ form: 'hidden' });
    this.setState({ messageSent: 'visible' });
    console.log('form submitted');
    // Axios.post('/api/login', this.state.message)
    //   .then((res) => {
    //     Auth.setToken(res.data.token);
    //     this.props.history.push('/users');
    //   })
    //   .catch(() => this.setState({ error: 'Invalid credentials' }));
  }
  showForm =() => {
    this.setState({ form: 'visible' });
    this.setState({ messageSent: 'hidden' });
  }
  render() {
    return(
      <section className="UsersMatch">
        {this.state.matches.map((match, i) => {
          return (
            <div className="card" key={i}>
              <div className="image">
                <img src={match.friend.image}/>
              </div>
              <div className="details">
                <h2>Username: {match.friend.username}</h2>
                <p>First Name: {match.friend.firstname}</p>
                <p>Last Name: {match.friend.lastname}</p>
                <p>Age: {match.friend.age}</p>
                <p>E-mail: {match.friend.email}</p>
                <button onClick={this.showForm}>Message</button>
                <MessageForm
                  sender={Auth.getPayload().userId}
                  receiver={match.friend.id}
                  style={this.state.form}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  message={this.state.message}
                />
                <p style={{ visibility: this.state.messageSent }}>Message sent!!</p>
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}

export default UsersMatch;
