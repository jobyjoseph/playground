// Create component
var Button = React.createClass({ // creates a component and assign to button var
  render: function() {
    return (
      <button onClick={this.props.localHandleClick}>+1</button>
    );
  }
});

// Another component
var Result = React.createClass({
  render: function(){
    // here localCounter is not a state for Result. it is just a value passed by parent
    return (
      <div>{this.props.localCounter}</div>
    )
  }
});

// Main component which includes all other components
var Main = React.createClass({
  getInitialState: function(){
    return {
      counter: 0
    }
  },
  handleClick: function(){
  	this.setState({counter: this.state.counter+1});
  },
  render: function(){
    return (
      <div>
        <Button localHandleClick={this.handleClick} />
        <Result localCounter={this.state.counter}/>
      </div>
    )
  }
});

// Use component
ReactDOM.render(<Main/>, document.getElementById("root"));
