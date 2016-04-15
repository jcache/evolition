'use strict';

import React from 'react';
const { PropTypes } = React;
import {Formsy, HOC} from 'formsy-react';
import FRC from 'formsy-react-components';
const { Input, File, Select, Textarea } = FRC;


class CharacterAdd extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='app-main-view'>
        <div className='bodyHeader'>
          <div className='headTitle'>
            <h2>Add a new character</h2>
          </div>

          <div className='headController'>
            <ul>
              <li><a href='#'>Edit</a></li>
              <li><a href='#'>View</a></li>
            </ul>
          </div>

          <div className='bodyContainer'>
            <Formsy.Form className={this.getLayoutClassName()} {...this.props} ref="formsy" >
              {this.props.children}
            </Formsy.Form>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = CharacterAdd;
