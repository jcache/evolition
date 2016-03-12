import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CharacterActions from '../actions/character-actions.jsx';
import CharacterStore from '../stores/character-store.jsx';
import AddCharacter from './viewports/character.add.jsx';
import EditCharacter from './viewports/character.edit.jsx';
import ViewCharacter from './viewports/character.view.jsx';
import DefaultView from './viewports/default.view.jsx';
import FakePage1 from './viewports/fake.p1.jsx';
import FakePage2 from './viewports/fake.p2.jsx';

let view;

class Viewport extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: ev_characters('selected_view').first(),
      character:  CharacterStore.getSelectedCharacter(),
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount(){
    CharacterStore.addChangeListener(this._onChange);
  }

  componentDidMount(){
    $('.viewz').perfectScrollbar();
  }

  componentWillUnmount(){
    CharacterStore.removeChangeListener(this._onChange);
  }

  _onChange(){
    this.setState({
      selected: CharacterStore.getSelectedView(),
      character:  CharacterStore.getSelectedCharacter(),
    })
  }

  render(){
    switch (this.state.selected.view_name) {
      case "default":
        view = <DefaultView />
        break;
      case "character_edit":
        view = <EditCharacter />
        break;
      case "character_view":
        view = <ViewCharacter character={this.state.character} />
        break;
      case "character_add":
        view = <AddCharacter />
        break;
      case "fake_page_1":
        view = <FakePage1 />
        break;
      case "fake_page_2":
        view = <FakePage2 />
        break;
      default:
    }

    return (
      <div className={"col-xs-12 viewz"} id='viewport'>
        {view}
      </div>
    )
  }
};

module.exports = Viewport
