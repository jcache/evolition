var React       = require('react');
var Viewport = React.createClass({displayName: "Viewport",
  render: function(){
    return (
      React.createElement("div", {className: "col-xs-8", id: "viewport"}, 
        "..."
      )
    )
  }
});

module.exports = Viewport
