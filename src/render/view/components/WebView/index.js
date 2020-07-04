import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class WebView extends Component {
  static propTypes = {
    content: PropTypes.object
  }

  render () {
    const { content } = this.props;

    if (!content) {
      return <div />;
    }
    return (
      <div className='web-area'>
        <webview id='webframe' className='webframe' src={content.url} />
      </div>
    );
  }

  componentDidMount () {

  }

  componentDidUpdate (prevProps, prevState) {
  }
}

export default WebView;
