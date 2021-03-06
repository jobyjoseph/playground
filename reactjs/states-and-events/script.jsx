// Create component
var Button = React.createClass({ // creates a component and assign to button var
  getInitialState: function(){
    return {
      counter: 0
    }
  },
  handleClick: function(){
  	this.setState({counter: this.state.counter+1});
  },
  render: function() {
    return (
      <button onClick={this.handleClick}>{this.state.counter}</button>
    );
  }
});

// Use component
ReactDOM.render(<Button/>, document.getElementById("root"));
