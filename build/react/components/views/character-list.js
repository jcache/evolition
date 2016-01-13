"use strict";

var React = require('react');
var evApplicationStore = require('../../stores/ev-app-store.jsx');
var evActions = require('../../actions/ev-actions.jsx');

var Character = React.createClass({displayName: "Character",
  getInitialState: function(){
    return {
      sel: false,
      selected_character: evApplicationStore.getSelectedCharacter()
    }
  },
  componentWillMount: function(){
    evApplicationStore.addChangeListener(this._onChange);
  },

  componentDidMount: function(){
    $('#character-list').perfectScrollbar();

  },
  componentWillUnmount: function(){
    evApplicationStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      selected: evApplicationStore.getSelectedView(),
      selected_character: evApplicationStore.getTheSelectedCharacter()
    });
  },
  viewCharacter: function(e){
    e.preventDefault();
    evActions.changeView(e.target.getAttribute("data-view"));
    evActions.focusedCharacter(this.props.character);
  },
  removeCharacter: function() {
    evActions.removeCharacter(this.props.character);
  },
  selectCharacter: function(character){
    evActions.selectedCharacter(character);
  },
  editCharacter: function(e){
    e.preventDefault();
    evActions.changeView(e.target.getAttribute("data-view"));
    evActions.focusedCharacter(this.props.character);
  },
  delCharacter: function(e){
    e.preventDefault();
  },
  render: function(){
    var active_character = "";
    var show_option = "";
    var character = this.props.character;

    if(typeof this.state.selected_character === 'undefined'){
      show_option = {display:'none'};
      active_character = "";
    } else {
      if (this.props.character.id == this.state.selected_character.id){
        show_option = {display:'block'};
        active_character = "active";
      } else {
        show_option = {display:'none'};
        active_character = "";
      }
    }


    return(
      React.createElement("li", {className: active_character, onClick: this.selectCharacter.bind(this, character)}, 
        React.createElement("div", {className: "character-details"}, 
          React.createElement("div", {className: "image-box"}, 
            React.createElement("div", {className: "image"}, 
              React.createElement("img", {src: "../images/darth.png", width: "50", height: "50"})
            )
          ), 
          React.createElement("div", {className: "detail-box"}, 
            React.createElement("div", {className: "details"}, 
              React.createElement("h5", null, character.character_name), 
              React.createElement("p", null, React.createElement("small", null, character.game_system_name, React.createElement("strong", null, " (", character.campaign_name ? character.campaign_name : 'undefined', ") "))), 
              React.createElement("p", null, "lvl: ", character.level ? character.level : 'undefined', " ")
            )
          )
        ), 
        React.createElement("div", {className: "character-options", style: show_option}, 
          React.createElement("ul", null, 
            React.createElement("li", {className: "view"}, 
              React.createElement("a", {href: "#", onClick: this.viewCharacter, "data-view": "character_view"}, "view")
            ), 
            React.createElement("li", {className: "change"}, 
              React.createElement("a", {href: "#", onClick: this.editCharacter, "data-view": "character_edit"}, "change")
            ), 
            React.createElement("li", {className: "remove"}, 
              React.createElement("a", {href: "#", onClick: this.removeCharacter}, "remove")
            )
          )
        )
      )
    );
  }
});

var CharacterList = React.createClass({displayName: "CharacterList",
  getInitialState: function(){
    return {
      character_list: ev_characters.object.characters
    }
  },

  componentWillMount: function(){
    evApplicationStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    evApplicationStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({
      selected: true
    })
  },
  render: function(){
    var characters = this.state.character_list;
    var character_list = [];
    for (var key in characters) {
      character_list.push(React.createElement(Character, {key: key, character: characters[key]}));
    }
    return (
      React.createElement("div", {className: "col-xs-3", id: "character-list"}, 
        React.createElement("ul", null, 
          character_list
        )
      )
    )
  }
});

module.exports = CharacterList
