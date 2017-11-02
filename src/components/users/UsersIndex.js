import React from 'react';
import Axios from 'axios';
import Modal from 'react-modal';

import '../../scss/components/users/UsersIndex.scss';
import '../../scss/components/misc/Modal.scss';
import Auth from '../misc/Auth';

const customStyle = {
  overlay: {
    zIndex: 1000,
    height: '100vh',
    width: '100%',
    backgroundColor: 'rgba(10, 10, 10, 0.5)'
  },
  content: {
    position: 'absolute',
    top: '35%',
    left: '35%',
    right: '35%',
    bottom: '35%',
    border: '5px solid #e1e2dc',
    background: 'black',
    overflow: 'hidden',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'

  }
};

class UsersIndex extends React.Component {
  state = {
    users: [],
    modalUser: {},
    profileAside: {},
    modalIsOpen: false,
    buttonDisabled: 'none',
    requestMessage: 'hidden',
    preferredGender: '',
    errors: {}
  }
  getModalUser = () => {
    Axios
      .get('/api/users', {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => {
        const users = res.data.filter(user => user.id !== Auth.getPayload().userId);
        this.setState({ users });
      })
      .catch(err => console.log(err));
  }
  getProfileAside = () => {
    Axios
      .get(`/api/users/${Auth.getPayload().userId}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ profileAside: res.data }))
      .catch(err => console.log(err));
  }
  getPreferredGender = () => {
    console.log('8====preferredGender===D');
    Axios
      .get(`/api/users/${Auth.getPayload().userId}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ preferredGender: res.data.preferredGender }))
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.getPreferredGender();
    this.getProfileAside();
    this.getModalUser();
  }
  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
    this.setState({buttonDisabled: 'visible'});
    this.setState({requestMessage: 'hidden'});
  }
  getUserInfo = id => {
    this.openModal();
    Axios
      .get(`/api/users/${id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ modalUser: res.data }))
      .catch(err => console.log(err));
  }
  getParent() {
    return document.querySelector('#UsersIndex');
  }
  // =============
  sendRequest = () => {
    this.setState({ buttonDisabled: 'hidden' });
    this.setState({ requestMessage: 'visible' });

    Axios
      .post('/api/requests', { userId: Auth.getPayload().userId, requestId: this.state.modalUser.id }, {
        headers: {'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => console.log('RES', res))
      .catch(err => console.log('ERR', err.response));
  }
  // ===============
  render() {
    console.log('modalUser', this.state.modalUser);
    console.log('profileAside', this.state.profileAside.id);
    return (
      <section id="UsersIndex" className="UsersIndex">
        {this.state.users.filter(user => {
          return user.gender === this.state.preferredGender;
        }).map(user => {
          return (
            <div
              key={user.id}
              onClick={() => this.getUserInfo(user.id)}
            >
              <div className="card">
                <img src={user.imageSRC} />
                <p>{user.username}</p>
                <p>{user.age}</p>
              </div>
            </div>
          );
        })}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyle}
          contentLabel="Modal"
          parentSelector={this.getParent}
        >
          <div className="modalContent">
            <div style={{background: `url(${this.state.modalUser.imageSRC}) no-repeat`, backgroundSize: 'cover'}} className="modalContentLeft">
            </div>
            <div className="modalContentRight">
              <h1>{this.state.modalUser.username}</h1>
              <h1>{this.state.modalUser.age}</h1>
              <button style={{ visibility: this.state.buttonDisabled }} onClick={this.sendRequest}> Request Match </button>
              <p style={{ visibility: this.state.requestMessage }}>Request Sent!</p>
            </div>
          </div>
        </Modal>
      </section>
    );
  }
}

export default UsersIndex;
