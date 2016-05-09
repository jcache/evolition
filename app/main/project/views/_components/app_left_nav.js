'use strict';

const React = require('react');
const { PropTypes } = React;
import { Link, Route } from 'react-router';
import { connect } from 'react-redux';
import { changeView } from '../../_actions/viewActions';
class AppLeftNav extends React.Component {

  static fetchData({ params, store, url }) {
    console.log(params, store, url);
    return store.dispatch( toggleLeftMenu(url))
  }

  constructor (props) {
    super(props);
    this._onChangeView = this._onChangeView.bind(this);
  }

  _onChangeView (e, cmd) {
    changeView(cmd)
  }

  render () {
    // console.log( "props: ", this.props);
    let { view } = this.props;
    // console.log(view.menuVisibility);
    // const leftNavClass = pathname == '/signedin/welcome' ? 'app-left-nav hidden' : 'app-left-nav shown'
    return (
      <div className={`app-left-nav ${view.menuVisibility}`}>
        <ul>
          <li><Link to={'/character_view'} className='characters-link'></Link></li>
          <li><Link to={'/character_view'} className='character-view-link'></Link></li>
          <li><Link to={'/character_view'} className='character-add-link'></Link></li>
        </ul>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    view: state.view
  }
}
export default connect(mapStateToProps)(AppLeftNav)
