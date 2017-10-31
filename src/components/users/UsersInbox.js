import React from 'react';
import Axios from 'axios';
import Auth from '../misc/Auth';
import '../../scss/components/users/UsersInbox.scss';


class UsersInbox extends React.Component {
  state = {
    inbox: [],
    sent: [],
    inboxStyle: 'visible',
    sentStyle: 'hidden'
  }

  componentDidMount() {
    Axios
      .get('/api/messages')
      .then(res => {
        const inbox = res.data.filter(message => message.receiver === Auth.getPayload().userId);
        const sent = res.data.filter(message => message.sender === Auth.getPayload().userId);
        this.setState({ inbox, sent });
      })
      .catch(err => console.log(err));
  }
  showInbox = () => {
    this.setState({ inboxStyle: 'visible', sentStyle: 'hidden' });
  }
  showSent = () => {
    this.setState({ inboxStyle: 'hidden', sentStyle: 'visible' });
  }
  render() {
    return(
      <section className="UsersInbox">
        <div className="buttons">
          <button onClick={this.showInbox}>Inbox</button>
          <button onClick={this.showSent}>Sent</button>
        </div>
        <div className="inbox" style={{ visibility: this.state.inboxStyle }} >
          {this.state.inbox && this.state.inbox.map(message => {
            return (
              <div key={message.id}>
                <p>{message.text}</p>
              </div>
            );
          })
          }
        </div>
        <div className="sent" style={{ visibility: this.state.sentStyle }} >
          {this.state.sent && this.state.sent.map(message => {
            return (
              <div key={message.id}>
                <p>{message.text}</p>
              </div>
            );
          })
          }
        </div>
      </section>
    );
  }
}

export default UsersInbox;
