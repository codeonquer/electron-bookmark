import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentItem from './ContentItem';
import './style.scss';

class ContentView extends Component {
  static propTypes = {
    contents: PropTypes.object,
    currentContentIndex: PropTypes.number,
    flipCreateContentPopup: PropTypes.func,
    setCurrentContentIndex: PropTypes.func,
    setCurrentContent: PropTypes.func
  }

  constructor (props) {
    super(props);

    this.openCreateContentPopup = this.openCreateContentPopup.bind(this);
  }

  openCreateContentPopup () {
    this.props.flipCreateContentPopup && this.props.flipCreateContentPopup(true);
  }

  render () {
    const { contents, currentContentIndex } = this.props;
    return (
      <div className='contents'>
        <div className='c-control'>
          <input className='cc-input' placeholder='Search' />
          <div className='cc-query'>Q</div>
          <div className='cc-add' onClick={this.openCreateContentPopup}>+</div>
        </div>
        {
          contents && contents.contents && contents.contents.length > 0
            ? <ul className='c-ul'>
              {
                contents.contents.map((content, index) => <ContentItem
                  content={content}
                  key={index}
                  index={index}
                  currentContentIndex={currentContentIndex}
                  setCurrentContentIndex={this.props.setCurrentContentIndex}
                  setCurrentContent={this.props.setCurrentContent}
                />)
              }
            </ul>
            : <div className='c-empty'>Empty</div>
        }
      </div>
    );
  }
}

export default ContentView;
