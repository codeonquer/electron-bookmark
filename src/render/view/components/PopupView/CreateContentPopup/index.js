import React, { Component } from 'react';
import Popup from '../Popup';

import './style.scss';

class CreateContentPopup extends Component {
  constructor (props) {
    super(props);

    this.state = {
      nameValue: '',
      urlValue: ''
    };

    this.closeCreateContentPopup = this.closeCreateContentPopup.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  closeCreateContentPopup () {
    this.props.flipCreateContentPopup && this.props.flipCreateContentPopup(false);
  }

  handleCreate () {
    this.props.addContent && this.props.addContent({
      name: this.state.nameValue,
      url: this.state.urlValue,
      ts: Date.now()
    });
    this.closeCreateContentPopup();
  }

  handleChange (key, value) {
    this.setState({
      [key]: value
    });
  }

  render () {
    return (
      <Popup>
        <div className='create-content-popup'>
          <div className='ccp-close' onClick={this.closeCreateContentPopup}>X</div>
          <div className='ccp-name'>名称</div>
          <input className='ccp-name-input' defaultValue={this.state.nameValue} onChange={(e) => { this.handleChange('nameValue', e.target.value); }} />
          <div className='ccp-url'>链接</div>
          <input className='ccp-url-input' defaultValue={this.state.urlValue} onChange={(e) => { this.handleChange('urlValue', e.target.value); }} />
          <div className='ccp-confirm' onClick={this.handleCreate}>确认</div>
        </div>
      </Popup>
    );
  }
}

export default CreateContentPopup;
