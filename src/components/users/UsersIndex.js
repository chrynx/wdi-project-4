import React from 'react';
import Axios from 'axios';
import Modal from 'react-modal';

import '../../scss/components/users/UsersIndex.scss';
import '../../scss/components/misc/Modal.scss';
import Auth from '../misc/Auth';

const customStyle = {
  overlay: {
    transition: '0.5s',
    zIndex: 1000,
    height: '100vh',
    width: '100%',
    backgroundColor: 'rgba(10, 10, 10, 0.5)'
  },
  content: {
    position: 'absolute',
    top: '25%',
    left: '25%',
    right: '25%',
    bottom: '25%',
    border: '1px solid #ccc',
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
    errors: {}
  }
  getModalUser = () => {
    Axios
      .get('/api/users', {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ users: res.data }))
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
  componentDidMount() {
    this.getModalUser();
    this.getProfileAside();
  }
  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
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
  sendRequest = () => {
    this.state.modalUser.requests.push(this.state.profileAside);
    Axios
      .put(`/api/users/${this.state.modalUser.id}`, this.state.modalUser, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  render() {
    console.log('modalUser', this.state.modalUser);
    console.log('profileAside', this.state.profileAside.id);
    return (
      <section id="UsersIndex" className="UsersIndex">
        {this.state.users.map(user => {
          return (
            <div
              key={user.id}
              onClick={() => this.getUserInfo(user.id)}
            >
              <div className="card">
                <img src={user.image} />
                <p>{user.firstname}</p>
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
            <div className="modalContentLeft">
              <img src={this.state.modalUser.image} />
            </div>
            <div className="modalContentRight">
              <h1>{this.state.modalUser.firstname} {this.state.modalUser.lastname}</h1>
              <p>{this.state.modalUser.age}</p>
              <button onClick={this.sendRequest}> Request Match </button>
            </div>
          </div>
        </Modal>
      </section>
    );
  }
}

export default UsersIndex;
