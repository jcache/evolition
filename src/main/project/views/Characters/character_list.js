'use strict';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { LeftNavShown } from '../../actions/viewActions';

class CharacterList extends React.Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this._onAppCTRL = this._onAppCTRL.bind(this);
  }

  _onChange () {
    this.setState({});
  }

  _onAppCTRL (cmd) {
    this.props.dispatch(LeftNavShown(true))
  }

  render () {
    return (
      <div className={`app-base character-list`}>
        <p>Character List</p>
        <a className="btn btn-primary" onClick={() => {this.props.dispatch(LeftNavShown(true))}}>make visible</a>
        <a className="btn btn-primary" onClick={() => {this.props.dispatch(LeftNavShown(false))}}>make hidden</a>
      </div>
    );
  }
}
export default connect(LeftNavShown)(CharacterList)


// {this.props.children}
