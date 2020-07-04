import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TagItem from './TagItem';
import './style.scss';

class TagView extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    currentTagIndex: PropTypes.number,
    flipCreateTagPopup: PropTypes.func,
    setCurrentTagIndex: PropTypes.func
  }

  constructor (props) {
    super(props);

    this.openCreateTagPopup = this.openCreateTagPopup.bind(this);
  }

  openCreateTagPopup () {
    this.props.flipCreateTagPopup && this.props.flipCreateTagPopup(true);
  }

  processTags (tags = []) {
    const newTags = tags.map((name, index) => {
      return {
        tagName: name,
        tagIndex: index
      };
    });
    newTags.sort((a, b) => {
      const nameA = a.tagName.toLowerCase();
      const nameB = b.tagName.toLowerCase();
      return nameA.localeCompare(nameB, 'zh-CN');
    });
    return newTags;
  }

  render () {
    const { tags, currentTagIndex } = this.props;
    const newTags = this.processTags(tags);

    return (
      <div className='tags'>
        <div className='t-title'>网页管理器</div>
        {
          newTags && newTags.length > 0
            ? <ul className='t-ul'>
              {
                newTags.map((tagItem) => <TagItem
                  name={tagItem.tagName}
                  key={tagItem.tagName}
                  index={tagItem.tagIndex}
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
