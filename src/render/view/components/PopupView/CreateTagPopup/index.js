import React, { Component } from 'react';
import Popup from '../Popup';

import './style.scss';

class CreateTagPopup extends Component {
  constructor (props) {
    super(props);

    this.state = {
      nameValue: ''
    };

    this.closeCreateTagPopup = this.closeCreateTagPopup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  closeCreateTagPopup () {
    this.props.flipCreateTagPopup && this.props.flipCreateTagPopup(false);
  }

  handleCreate () {
    this.props.addTag && this.props.addTag({
      name: this.state.nameValue,
      ts: Date.now(),
      contents: []
    });
    this.closeCreateTagPopup();
  }

  handleChange (e) {
    this.setState({
      nameValue: e.target.value
    });
  }

  render () {
    return (
      <Popup>
        <div className='create-tag-popup'>
          <div className='ctp-close' onClick={this.closeCreateTagPopup}>X</div>
          <div className='ctp-name'>标签</div>
          <input className='ctp-name-input' defaultValue={this.state.nameValue} onChange={this.handleChange} />
          <div className='ctp-confirm' onClick={this.handleCreate}>确认</div>
        </div>
      </Popup>
    );
  }
}

export default CreateTagPopup;
