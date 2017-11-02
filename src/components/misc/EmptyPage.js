import React from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import '../../scss/components/misc/EmptyPage.scss';
class EmptyPage extends React.Component {
  state = {
    gifs: [],
    error: null
  }
  componentDidMount() {
    console.log('asdasdf', this.props.history);
    Axios.get('http://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: 'a6d3ea5cddf84362a8ea33e9b57d4833',
        q: this.props.history.location.pathname,
        limit: 25,
        offset: Math.random(1,100)
      }
    })
      .then(res => this.setState({ gifs: res.data.data }, () => {
        console.log('this is the response', res.data.data);
      }))
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.state);
    return(
      <section className="EmptyPage">
        <div>
          <p>SORRY, DID NOT FIND THIS PAGE</p>
        </div>
        <div>
          {this.state.gifs && this.state.gifs.map((gif, i) => {
            return (
              <img style={{ width: '150px' }} key={i} src={gif.images.fixed_height.url} />
            );
          })}
        </div>
      </section>
    );
  }
}
export default withRouter(EmptyPage);
