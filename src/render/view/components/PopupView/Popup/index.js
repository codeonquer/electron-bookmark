import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

class Popup extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  constructor (props) {
    super(props);

    this.node = document.createElement('div');
  }

  render () {
    return createPortal(this.props.children, this.node);
  }

  componentDidMount () {
    document.body.appendChild(this.node);
  }

  componentWillUnmount () {
    document.body.removeChild(this.node);
  }
}

export default Popup;
