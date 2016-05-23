'use strict';
import React from 'react';
import CharacterList from '../_components/CharacterList';
import ListView from './list_view';

export default class List extends React.Component {
  render () {
    return (
      <div className={`app-base`}>
        <CharacterList/>
        <ListView />
      </div>
    );
  }
}
