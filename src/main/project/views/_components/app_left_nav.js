'use strict';

const React = require('react');
const { PropTypes } = React;
import { Link, Route } from 'react-router';
import { connect } from 'react-redux';
import { LeftNavShown } from '../../actions/viewActions';
class AppLeftNav extends React.Component {

  // static fetchData({ params, store, url }) {
  //   console.log(params, store, url);
  //   return store.dispatch( LeftNavShown(url))
  // }

  constructor (props) {
    super(props);
    this._onChangeView = this._onChangeView.bind(this);
  }

  _onChangeView (e, cmd) {
    changeView(cmd)
  }

  render () {
    // console.log( "props: ", this.props);
    let { visible } = this.props;
    const leftNavClass = visible.view.visible_flag == true ? 'app-left-nav shown' : 'app-left-nav hidden'
    return (
      <div className={`${leftNavClass}`}>
        <ul>
          <li><Link to={'/dashboard'} className='characters-link'></Link></li>
          <li><Link to={'/character_view'} className='character-view-link'></Link></li>
          <li><Link to={'/character_view'} className='character-add-link'></Link></li>
        </ul>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    visibility: state.LeftNavShown
  }
}

export default connect(LeftNavShown)(AppLeftNav)
