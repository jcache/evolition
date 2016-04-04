'use strict';

const   React = require('react');
import  {evActions} from '../_actions/actions.js';
import  {Link} from 'react-router';
const   { PropTypes } = React;

class AppFooter extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      active: 'true',
    };

  }

  render () {
    return (
      <div className='app-footer'>
        <p>Footer</p>
      </div>
    );
  }
}
module.exports = AppFooter;
