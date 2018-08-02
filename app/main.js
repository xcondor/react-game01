/**
 * Created by xingyucheng on 2018/8/1.
 */
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import App from './components/app.jsx';
import './components/index.less';


ReactDom.render(
    <App />,
    document.getElementById('content')
);