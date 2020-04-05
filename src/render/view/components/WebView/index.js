import React, { Component } from 'react';

import './style.scss';

class WebView extends Component {
  render () {
    const { content } = this.props;

    if (!content) {
      return <div />;
    }
    return (
      <webview id='webframe' className='webframe' src={content.url} />
    );
  }
}

export default WebView;
