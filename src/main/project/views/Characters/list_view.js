import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  LeftNavShown
} from '../../actions/viewActions';

class ListView extends React.Component {
  render () {
    return (
      <div className='default-view'>
        <a className="btn btn-primary" onClick={() => {this.props.dispatch(LeftNavShown(true))}}>make visible</a>
        <a className="btn btn-primary" onClick={() => {this.props.dispatch(LeftNavShown(false))}}>make hidden</a>
      </div>
    );
  }
}

export default connect(LeftNavShown)(ListView)
