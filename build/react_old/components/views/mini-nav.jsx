"use strict";

var React = require('react');
import evApplicationStore from '../../stores/ev-app-store.jsx';
import {changeView} from '../../actions/ev-actions.jsx';

class MiniNav extends React.Component {
  constructor(props){
    super(props);

    this._onChange = this._onChange.bind(this);
    this._changeView = this._changeView.bind(this);

    this.state = {
      views: ev_characters.object.views,
      selected: evApplicationStore.getSelectedView()
    };
  }
  componentWillMount(){
    evApplicationStore.addChangeListener(this._onChange);
  }
  componentWillUnmount(){
    evApplicationStore.addChangeListener(this._onChange);
  }
  _onChange(){
    this.state = {
      views: ev_characters.object.views,
      selected: evApplicationStore.getSelectedView()
    }
  }

  _changeView(e){
    e.preventDefault();
    changeView(e.target.getAttribute("data-view"));
  }

  render(){
    return(
      <div className='col-xs-1' id='mini-nav'>
        <ul>
          <li>
            <a href='#' className="characters-link" onClick={e => this._changeView(e)} data-view='default'></a>
          </li>
          <li>
            <a href='#' className="character-add-link" onClick={e => this._changeView(e)} data-view='character_add'></a>
          </li>
        </ul>
      </div>
    )
  }
}

module.exports = MiniNav
