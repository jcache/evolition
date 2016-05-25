import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  LoadCharacters
} from '../../actions/characterActions';

function CharacterItem(props) {
  return (
    <div className='character-row'>
      <div className='character-details'>
        <div className='image-box'>
          <div className='image'>
            <img src="ev://main/images/darth.png" width='65' />
          </div>
        </div>
        <div className='detail-box'>
          <div className='details'>
            <p className='ch-gamesystem'>Dungeons&Dragons</p>
            <h5 className='ch-charactername'>Flinn</h5>
            <p className='ch-profession'>Undefined </p>
            <p className='ch-campaign'>SuperFun</p>
            <div className='level-box'>
              <p>
                <small>Level</small>
                <span>10</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default connect()(CharacterItem)
