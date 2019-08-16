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
    this.checkRegistrationData = this.checkRegistrationData.bind(this);
    this.check_email = this.check_email.bind(this);
    this.check_pass = this.check_pass.bind(this);
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

  check_email(mail){
    var mail_regex = /@.*\..+/;
    var mail_exist_regex = /[^@].*\..+/;
    var existing_mails = ['gmail.com', 'yahoo.com'];
    if(mail_regex.test(mail)){
        var is_good = false;
        var matcher = mail_regex.exec(mail);
        var current_mail = mail_exist_regex.exec(matcher[0]);
        for(var x = 0; x < existing_mails.length; x++){
            if(current_mail[0] == existing_mails[x]){
                is_good = !is_good;
                break;
            }
        }
        if(is_good){
            console.log('Your email is good');
            return true;
        }
        else{
            console.log('Something is wrong with your mail');
            return false;
        }
    }
    else{
        console.log('Your email is wrong');
        return false;
    }
  }

  check_pass(pass){
    var pass_regex_0 = /\w{8,}/;
    var pass_regex_1 = /[a-z]+/;
    var pass_regex_2 = /[A-Z]+/;
    var pass_regex_3 = /[0-9]+/;
  
    var good_lenght = false;
    var has_small_letters = false;
    var has_big_letters = false;
    var has_numbers = false;
    
    if(pass_regex_0.test(pass)){
        good_lenght = !good_lenght
        if(pass_regex_1.test(pass)){
            has_small_letters = !has_small_letters;
        }
  
        if(pass_regex_2.test(pass)){
            has_big_letters = !has_big_letters;
        }
  
        if(pass_regex_3.test(pass)){
            has_numbers = !has_numbers;
        }
    }
  
    if(good_lenght){
        if(has_small_letters && has_big_letters && has_numbers){
            console.log('Good password');
            return true;
        }
        else{
            if(!has_small_letters){
                console.log('Password must have at least 1 small letter');
            }
            if(!has_big_letters){
                console.log('Password must have at least 1 big letter');
            }
            if(!has_numbers){
                console.log('Password must have at least 1 number');
            }
            return false;
        }
    }
    else{
        console.log('Password is too short');
        return false;
    }
  }

  checkRegistrationData(event) {
    var isMailGood = this.check_email(this.state.email);
    var isPassGood = this.check_pass(this.state.password);
    event.preventDefault();
    if(isMailGood && isPassGood) {
      this.createNewUser();
    }
    else{
      console.log('Something went wrong.\nPlease check text higher.')
    }
  }

  addUser(usernameIn, emailIn, passwordIn) {
    let data = {
      username: usernameIn,
      email: emailIn,
      password: passwordIn
    }
    var request = new Request('http://localhost:5000/api/new-user', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });

    fetch(request)
    .then((response) => {
      response.json
      .then((data) => {
        let username = this.state.username;
        username.concat(data);
      })
    })
    .catch(err => console.log)
  }

  createNewUser() {
    console.log(this.state.username + " " + this.state.email + " " + this.state.password);
    this.addUser(this.state.username, this.state.email, this.state.password);
    // axios.post('http://localhost:5000/api/owners/', this.state)
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(error =>{
    //   console.log(error);
    // })
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
          <button type="button" className="btn" onClick={this.checkRegistrationData}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

