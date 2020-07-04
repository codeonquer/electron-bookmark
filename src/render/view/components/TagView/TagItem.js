import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TagItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    index: PropTypes.number,
    currentTagIndex: PropTypes.number,
    setCurrentTagIndex: PropTypes.func
  }

  render () {
    const { name, index, currentTagIndex } = this.props;
    let styleName = 't-li';
    if (index === currentTagIndex) {
      styleName = 't-li t-li-active';
    }
    return <li
      className={styleName}
      onClick={() => { this.props.setCurrentTagIndex && this.props.setCurrentTagIndex(index); }}
    >
      {name}
    </li>;
  }
}

export default TagItem;
