// Create component
var Button = React.createClass({ // creates a component and assign to button var
  localHandleClick: function(){
    this.props.localHandleClick(this.props.increment);
  },
  render: function() {
    return (
      <button onClick={this.localHandleClick}>+{this.props.increment}</button>
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
  handleClick: function(increment){
  	this.setState({counter: this.state.counter+increment});
  },
  render: function(){
    return (
      <div>
        <Button localHandleClick={this.handleClick} increment={1}/>
        <Button localHandleClick={this.handleClick} increment={5}/>
        <Button localHandleClick={this.handleClick} increment={10}/>
        <Button localHandleClick={this.handleClick} increment={100}/>
        <Result localCounter={this.state.counter}/>
      </div>
    )
  }
});

// Use component
ReactDOM.render(<Main/>, document.getElementById("root"));
