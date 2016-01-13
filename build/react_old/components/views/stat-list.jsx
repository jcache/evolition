"use strict";

var React       = require('react');
var FRC = require('formsy-react-components');
var Input = FRC.Input;

import evApplicationStore from '../../stores/ev-app-store.jsx';
import evActions from '../../actions/ev-actions.jsx';

var StatList = React.createClass({
  getInitialState: function() {
    return {
      gamesystem: this.props.game_system,
      stats: evApplicationStore.getStats(),
      shared_props: this.props.shared_props
    };
  },
  componentWillMount: function(){
    evApplicationStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    evApplicationStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({
      gamesystem: this.props.game_system
    })
  },
  render: function(){
    var sharedProps = {
      rowClassName: 'form-group label-floating'
    };
    var stats = this.state.stats;
    var character_stats = stats.map(function(stat, i) {
      return(
        <Input {...sharedProps} key={stat.id} name={"stats." + stat.abbv} value="" label={stat.abbv} type="text" />
      )
    });

    return (
      <div className='col-xs-12'>
      {character_stats}
      </div>
    )
  }
});

module.exports = StatList
