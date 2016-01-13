var React       = require('react');
var Formsy = require('formsy-react');
var FRC = require('formsy-react-components');

var CharacterForm = React.createClass({displayName: "CharacterForm",
  render: function(){
    return (
      React.createElement("div", {className: "row", id: "introduction-view"}, 
        React.createElement("div", {className: "col-xs-12"}, 
          React.createElement("h1", null, "Character Form"), 
          React.createElement("p", null, "This is some cool stuff")
        )
      )
    )
  }
});

module.exports = CharacterForm
