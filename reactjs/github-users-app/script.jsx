var Card = React.createClass({
  getInitialState: function(){
    return {};
  },
  componentDidMount: function() {
    var component = this;
    $.get("https://api.github.com/users/" + component.props.login, function(data) {
      component.setState(data);
    });
  },
  render: function(){
    return (
      <div>
        <img src={this.state.avatar_url} width="80"/>
        <h3>{this.state.name}</h3>
        <hr/>
      </div>
    );
  }
});

// Form component
var Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var loginInput = this.refs.loginitem;
    this.props.addCard(loginInput.value);
    loginInput = ''; // clearinig input field

  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Github login" ref="loginitem"/>
        <button>Add</button>
      </form>
    );
  }
});

// Create Main component
var Main = React.createClass({ // creates a component and assign to button var
  getInitialState: function() {
    return {
      logins: []
    };
  },
  addCard: function(githublogin){
    this.setState({'logins': this.state.logins.concat(githublogin)});
  },
  render: function() {
    var cards = this.state.logins.map(function(login){
      return (<Card login={login}/>);
    });
    return (
      <div>
        <Form addCard={this.addCard}/>
        {cards}
      </div>
    );
  }
});

// Use component
ReactDOM.render(<Main/>, document.getElementById("root"));
