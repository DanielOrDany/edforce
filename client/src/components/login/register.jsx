import React from "react";
import loginImg from "../../login.svg";
import axios from 'axios';

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      start_date: "Today"
    }
    this.handleChange = this.handleChange.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  createNewUser(event) {
    console.log(this.state.username + " " + this.state.email + " " + this.state.password);
    event.preventDefault();
    axios.post('http://localhost:5000/api/owners/', this.state)
    .then(response => {
      console.log(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
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
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.createNewUser}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

