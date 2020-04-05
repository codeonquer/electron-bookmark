import React from 'react';
import ReactDom from 'react-dom';
import View from './view';

const mountedNode = document.getElementById('app');
ReactDom.render(<View />, mountedNode);
