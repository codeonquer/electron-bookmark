import React, { Component } from 'react';

import './scss/normalize.scss';
import './style.scss';

import TagView from './components/TagView';
import ContentView from './components/ContentView';
import WebView from './components/WebView';

import CreateTagPopup from './components/PopupView/CreateTagPopup';
import CreateContentPopup from './components/PopupView/CreateContentPopup';

import {
  GET_BOOKMARK_CONFIG,
  SEND_BOOKMARK_CONFIG,
  UPDATE_BOOKMARK_CONFIG
} from '../../constants/IPC_EVENT';

const { ipcRenderer } = require('electron');

class View extends Component {
  constructor (props) {
    super(props);

    this.state = {
      bookmarkJson: null,
      currentTagIndex: 0,
      currentContentIndex: -1,
      currentContent: null,

      showCreateTagPopup: false,
      showCreateContentPopup: false
    };

    this.flipCreateTagPopup = this.flipCreateTagPopup.bind(this);
    this.flipCreateContentPopup = this.flipCreateContentPopup.bind(this);
    this.setCurrentTagIndex = this.setCurrentTagIndex.bind(this);
    this.setCurrentContentIndex = this.setCurrentContentIndex.bind(this);
    this.setCurrentContent = this.setCurrentContent.bind(this);

    this.addTag = this.addTag.bind(this);
    this.addContent = this.addContent.bind(this);
  }

  /**
   * 更改UI状态
   */

  flipCreateTagPopup (showCreateTagPopup) {
    this.setState({
      showCreateTagPopup
    });
  }

  flipCreateContentPopup (showCreateContentPopup) {
    this.setState({
      showCreateContentPopup
    });
  }

  setCurrentTagIndex (index) {
    this.setState({
      currentTagIndex: index,
      currentContentIndex: -1
    });
  }

  setCurrentContentIndex (index) {
    this.setState({
      currentContentIndex: index
    });
  }

  setCurrentContent (content) {
    this.setState({
      currentContent: content
    });
  }

  /**
   * 更新数据
   */

  addTag (tag) {
    const newBookmarkJson = Object.assign({}, this.state.bookmarkJson);
    newBookmarkJson.tags.push(tag);
    this.setState({
      bookmarkJson: newBookmarkJson
    });
    ipcRenderer.send(UPDATE_BOOKMARK_CONFIG, newBookmarkJson);
  }

  addContent (content) {
    const newBookmarkJson = Object.assign({}, this.state.bookmarkJson);
    newBookmarkJson.tags[this.state.currentTagIndex].contents.push(content);
    this.setState({
      bookmarkJson: newBookmarkJson
    });
    ipcRenderer.send(UPDATE_BOOKMARK_CONFIG, newBookmarkJson);
  }

  render () {
    const {
      bookmarkJson, currentTagIndex, currentContentIndex, currentContent,
      showCreateTagPopup, showCreateContentPopup
    } = this.state;

    if (!bookmarkJson) {
      return <div />;
    }

    const originTags = bookmarkJson.tags || [];
    const tags = originTags.map(item => item.name);
    const contents = originTags[currentTagIndex];

    return (
      <div className='container'>
        <TagView
          tags={tags}
          currentTagIndex={currentTagIndex}
          flipCreateTagPopup={this.flipCreateTagPopup}
          setCurrentTagIndex={this.setCurrentTagIndex}
        />
        <ContentView
          contents={contents}
          currentContentIndex={currentContentIndex}
          flipCreateContentPopup={this.flipCreateContentPopup}
          setCurrentContentIndex={this.setCurrentContentIndex}
          setCurrentContent={this.setCurrentContent}
        />
        <WebView
          content={currentContent}
        />
        {
          showCreateTagPopup
            ? <CreateTagPopup
              flipCreateTagPopup={this.flipCreateTagPopup}
              addTag={this.addTag}
            />
            : null
        }
        {
          showCreateContentPopup
            ? <CreateContentPopup
              flipCreateContentPopup={this.flipCreateContentPopup}
              addContent={this.addContent}
            />
            : null
        }
      </div>
    );
  }

  componentDidMount () {
    ipcRenderer.send(GET_BOOKMARK_CONFIG);
    ipcRenderer.on(SEND_BOOKMARK_CONFIG, (event, bookmarkJson) => {
      if (!bookmarkJson) {
        alert('基础配置文件读取失败');
        return;
      }

      this.setState({
        bookmarkJson
      });
    });
  }
}

export default View;
