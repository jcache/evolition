'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CharacterStore  from '../../stores/character-store.jsx';
import FRC from 'formsy-react-components';
let {Input} = FRC;

class StatList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      gamesystem: this.props.game_system,
      shared_props: this.props.shared_props,
      character_stats: this.props.character_stats
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    CharacterStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CharacterStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      gamesystem: this.props.game_system,
      shared_props: this.props.shared_props,
      character_stats: this.props.character_stats
    })
  }

  render(){
    let {character} = this.props;
    let {stats} = character;
    let {sharedProps} = this.state;

    var character_stats = stats.map(function(stat, i) {
      return(
        <Input
          {...sharedProps} 
          key={stat.id}
          name={"stats." + stat.abbv}
          value=""
          label={stat.abbv}
          type="text"
          required
        />
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
}


module.exports = StatList
