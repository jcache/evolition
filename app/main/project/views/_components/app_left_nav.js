'use strict';

const React = require('react');

import {Link, Route} from 'react-router';

class AppLeftNav extends React.Component {

  constructor (props) {
    super(props);
    this.state = {  };

    this._onChange = this._onChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);

  }

  _onChangeView (e, cmd) {
    console.log(cmd)
  }

  _onChange () {
    this.setState({});
  }

  render () {
    let {pathname} = this.props;
    let {character} = this.state;

    const leftNavClass = pathname == '/signedin/welcome' ? 'app-left-nav hidden' : 'app-left-nav shown'

    return (
      <div className={leftNavClass}>
        <ul>
          <li><Link to={'/character_view'} onClick={this._onChangeView.bind(this, 'default-view')} className='characters-link'></Link></li>
          <li><Link to={'/character_view'} onClick={this._onChangeView.bind(this, 'character-view')} className='character-view-link'></Link></li>
          <li><Link to={'/character_view'} onClick={this._onChangeView.bind(this, 'character-add')} className='character-add-link'></Link></li>
        </ul>
      </div>
    );
  }
};

module.exports = AppLeftNav;
