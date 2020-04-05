import React, { Component } from 'react';

class TagItem extends Component {
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
