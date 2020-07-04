import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContentItem extends Component {
  static propTypes = {
    content: PropTypes.object,
    index: PropTypes.number,
    currentContentIndex: PropTypes.number,
    setCurrentContentIndex: PropTypes.func,
    setCurrentContent: PropTypes.func
  }

  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    const { content, index } = this.props;
    this.props.setCurrentContentIndex && this.props.setCurrentContentIndex(index);
    this.props.setCurrentContent && this.props.setCurrentContent(content);
  }

  render () {
    const { content, index, currentContentIndex } = this.props;
    let styleName = 'c-li';
    if (index === currentContentIndex) {
      styleName = 'c-li c-li-active';
    }
    return (
      <li
        className={styleName}
        onClick={this.handleClick}
      >
        <div className='c-li-name'>{ content.name }</div>
        <div className='c-li-url'>{ content.url }</div>
        <div className='c-li-ts'>{ content.ts }</div>
      </li>
    );
  }
}

export default ContentItem;
