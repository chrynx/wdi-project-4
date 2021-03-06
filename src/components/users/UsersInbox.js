import React from 'react';
import Axios from 'axios';
import Auth from '../misc/Auth';
import '../../scss/components/users/UsersInbox.scss';
import MessageForm from '../messages/MessageForm';

class UsersInbox extends React.Component {
  state = {
    message: {
      subject: '',
      text: '',
      image: '',
      sender: '',
      receiver: ''
    },
    errors: {},
    form: 'hidden',
    inbox: [],
    sent: [],
    inboxStyle: 'visible',
    sentStyle: 'hidden',
    isInbox: null,
    isSent: true
  }
  getMessages(){
    Axios
      .get('/api/messages')
      .then(res => {
        const inbox = res.data.filter(message => message.receiver.id === Auth.getPayload().userId);
        console.log('8====inbox=====D', inbox);
        const sent = res.data.filter(message => message.sender.id === Auth.getPayload().userId);
        console.log('8====sent====D', sent);
        this.setState({ inbox, sent });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getMessages();
  }
  showInbox = () => {
    this.setState({ inboxStyle: 'visible', sentStyle: 'hidden', isInbox: true, isSent: null });
  }
  showSent = () => {
    this.setState({ inboxStyle: 'hidden', sentStyle: 'visible', isInbox: null, isSent: true });
  }
  showForm =() => {
    this.setState({ form: 'visible' });
  }
  cancelForm =() => {
    this.setState({ form: 'hidden' });
  }
  handleChange = ({ target: { name, value }}) => {
    const message = Object.assign({}, this.state.message, { [name]: value });
    this.setState({ message });
  }
  handleSubmit = (e, friend) => {
    e.preventDefault();
    this.setState({ form: 'hidden' });
    this.setState({ messageSent: 'visible' });
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
  deleteMessage = id => {
    console.log(id);
    Axios
      .delete(`/api/messages/${id}`)
      .then(() => {
        this.state.inbox.filter(message => message.id !== id);
        this.state.sent.filter(message => message.id !== id);
      })
      .catch(err => console.log(err));
  }
  render() {
    return(
      <section className="UsersInbox">
        <div className="buttons">
          <button onClick={this.showInbox}>Inbox</button>
          <button onClick={this.showSent}>Sent</button>
        </div>

        {/* ========================= */}

        {this.state.isInbox && <div className="inbox" style={{ visibility: this.state.inboxStyle }} >
          {this.state.inbox && this.state.inbox.map(message => {
            return (
              <div className="inboxMessage" key={message.id}>
                <MessageForm
                  style={this.state.form}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  message={this.state.message}
                  friend={message.sender}
                  errors={this.state.errors}
                  close={this.cancelForm}
                />
                <div>
                  <img src={message.sender.imageSRC}/>
                </div>
                <div>
                  <h3>{message.subject}</h3>
                  <blockquote>{message.text}</blockquote>
                  <small>Sent by: <em>{message.sender.username}</em></small>
                </div>
                <div>
                  <button onClick={this.showForm}>Reply</button>
                  <button onClick={() => this.deleteMessage(message.id)}>Delete</button>
                </div>
              </div>
            );
          })
          }
        </div>
        }
        {/* ==================================================== */}

        {this.state.isSent && <div className="sent" style={{ visibility: this.state.sentStyle }} >
          {this.state.sent && this.state.sent.map(message => {
            return (
              <div className="sentMessage" key={message.id}>
                <div>
                  <button onClick={() => this.deleteMessage(message.id)}>Delete</button>
                </div>
                <div>
                  <h3>{message.subject}</h3>
                  <blockquote>{message.text}</blockquote>
                  <small>Sent to: <em>{message.receiver.username}</em></small>
                </div>
                <div>
                  <img src={message.receiver.imageSRC}/>
                </div>
              </div>
            );
          })
          }
        </div>
        }
      </section>
    );
  }
}

export default UsersInbox;
