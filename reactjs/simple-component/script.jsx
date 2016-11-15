// Create component
var Button = React.createClass({ // creates a component and assign to button var
  render: function() {
    return (
      <button>Go</button>
    );
  }
});

// Use component
ReactDOM.render(<Button/>, document.getElementById("root"));
