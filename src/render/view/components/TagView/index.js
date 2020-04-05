import React, { Component } from 'react';
import TagItem from './TagItem';
import './style.scss';

class TagView extends Component {
  constructor (props) {
    super(props);

    this.openCreateTagPopup = this.openCreateTagPopup.bind(this);
  }

  openCreateTagPopup () {
    this.props.flipCreateTagPopup && this.props.flipCreateTagPopup(true);
  }

  render () {
    const { tags, currentTagIndex } = this.props;

    return (
      <div className='tags'>
        <div className='t-title'>网页管理器</div>
        {
          tags && tags.length > 0
            ? <ul className='t-ul'>
              {
                tags.map((name, index) => <TagItem
                  name={name}
                  key={index}
                  index={index}
                  currentTagIndex={currentTagIndex}
                  setCurrentTagIndex={this.props.setCurrentTagIndex}
                />)
              }
            </ul>
            : <div className='t-empty'>Empty</div>
        }
        <div className='t-add' onClick={this.openCreateTagPopup}>
          <div className='ta-icon'>+&lt;&gt;</div>
          添加新标签...
        </div>
      </div>
    );
  }
}

export default TagView;
