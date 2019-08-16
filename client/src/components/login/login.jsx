import React from "react";
import loginImg from "../../login.svg";
import { request } from "http";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  checkUser(event) {
    event.preventDefault();
    var password = this.state.password;
    let data = {
      username: this.state.username
    }
    
    var request = new Request('http://localhost:5000/api/find-user', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });

    fetch(request)
    .then(function(response){
      response.json()
      .then(function(data){
          var user = data[0];
          if(user.password == password){
            console.log('Access granted!');
          }
          else{
            console.log('You have no permissions');
          }
        }
      )
    })
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.checkUser}>
            Login
          </button>
        </div>
      </div>
    );
  }
}