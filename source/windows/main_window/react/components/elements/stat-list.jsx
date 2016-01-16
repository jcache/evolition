import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var CharacterStore  = require('../../stores/character-store.jsx');

var FRC = require('formsy-react-components');
var Input = FRC.Input;

var StatList = React.createClass({
  getInitialState: function() {
    return {
      gamesystem: this.props.game_system,
      shared_props: this.props.shared_props,
      character_stats: this.props.character_stats
    };
  },
  componentWillMount: function(){
    CharacterStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    CharacterStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({
      gamesystem: this.props.game_system,
      shared_props: this.props.shared_props,
      character_stats: this.props.character_stats
    })
  },
  render: function(){
    var stats = this.props.character.stats
    var sharedProps = this.state.shared_props;
    var character_stats = stats.map(function(stat, i) {
      return(

        <Input {...sharedProps} key={stat.id} name={"stats." + stat.abbv} value="" label={stat.abbv} type="text" required />
      )
    });

    return (
      <div className='row'>
        <div className='col-xs-12'>
          {character_stats}
        </div>
      </div>
    )
  }
});

module.exports = StatList
