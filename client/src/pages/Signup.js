/* eslint-disable no-useless-escape */
import React, { Component } from "react";
import axios from "axios";  // We import "axios" to be able to make requests to the Backend Endpoints.
import { Link } from 'react-router-dom';  //  We import "Link" from "react-router-dom" to be able to link to other Route Components.
import Alerts from "../components/Alerts";
// import DeleteBtn from "../components/DeleteBtn";
// import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      email: "",
      password: "",
      alertmsg: "",
      display: "none",
      opacity: "0",
      pswDisplay: "none",
      pswLengthClass: "invalid",
      pswLetterClass: "invalid",
      pswCapitalClass: "invalid",
      pswNumClass: "invalid"
    };
    // this.showAlert=this.showAlert.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    //this.onKeyUp=this.onKeyUp.bind(this);
    // this.onChangePassword=this.onChangePassword.bind(this);
  }

  onChangeName = event => {
    this.setState({
      name: event.target.value
    });
  };

  onChangePhone = event => {
    this.setState({
      phone: event.target.value
    });
  };

  onChangeEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  handleKeyDown = event => {
    let pswd = event.target.value
    this.setState({
      password: event.target.value
    });
    //  Test console.
    // console.log(event.target.value);
    var length;
    var letter;
    var capital;
    var digit;

    if (letter === true && length === true && capital === true && digit === true) {
      // $('#pswd_info').hide();
      this.setState({
        pswDisplay: "none"
      });
    }
    //Valid length
    if (pswd.length < 8) {
      // $('#length').removeClass('valid').addClass('invalid');
      this.setState({
        pswLengthClass: "invalid"
      });
      length = false;
    } else {
      // $('#length').removeClass('invalid').addClass('valid');
      this.setState({
        pswLengthClass: "valid",
      });
      length = true;
    }
    //validate letter
    if (pswd.match(/[A-z]/)) {
      //  $('#letter').removeClass('invalid').addClass('valid');
      this.setState({
        pswLetterClass: "valid",
      });
      letter = true;
    } else {
      //$('#letter').removeClass('valid').addClass('invalid');
      this.setState({
        pswLetterClass: "invalid",
      });
      letter = false;
    }
    //validate capital letter
    if (pswd.match(/[A-Z]/)) {
      // $('#capital').removeClass('invalid').addClass('valid');
      this.setState({
        pswCapitalClass: "valid",
      });
      capital = true;
    } else {
      // $('#capital').removeClass('valid').addClass('invalid');
      this.setState({
        pswCapitalClass: "invalid",
      });
      capital = false;
    }

    //validate number
    if (pswd.match(/\d/)) {
      // $('#number').removeClass('invalid').addClass('valid');
      this.setState({
        pswNumClass: "valid",
      });
      digit = true;
    } else {
      // $('#number').removeClass('valid').addClass('invalid');
      this.setState({
        pswNumClass: "invalid",
      });
      digit = false;
    }

  };

  onFocus() {
    this.setState({
      pswDisplay: "block"
    });
  }

  onBlur() {
    this.setState({
      pswDisplay: "none"
    });
  }

  onSubmit = event => {
    event.preventDefault();
    const phoneMask = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const emailMask = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const userData = {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      userName: this.state.name,

    };
    console.log(userData);
    if (!userData.email || !userData.password || !userData.userName || !userData.phone) {
      this.setState({
        alertmsg: "Please complete all fields"
      });
      this.showAlert();
      return false;
    } else if (!userData.phone.match(phoneMask)) {
      this.setState({
        alertmsg: "Invalid phone number, use +12 123 123 1234"
      });
      this.showAlert();
      return false;
    } else if (!userData.email.match(emailMask)) {
      this.setState({
        alertmsg: "Invalid email address"
      });
      this.showAlert();
      return false;
    } else if (userData.password.length < 8) {
      this.setState({
        alertmsg: "Invalid password"
      });
      this.showAlert();
      return false;
    }


    console.log(userData);
    axios.post("/api/signup", userData)

      .then(res => {
        console.log(res)
        if (res.data === "Successful") {
          this.props.history.push("/members");
        } else if (res.data.errors[0].message === "email must be unique") {
          this.setState({
            alertmsg: "email already exists"
          });
          this.showAlert();
        } else if (res.data.errors[0].message === "Validation len on user_name failed") {
          this.setState({
            alertmsg: "The name is too Short"
          });
          this.showAlert();
        }
      });
  };

  showAlert = () => {
    let opacityRate = 0;

    this.setState({ display: "block" });

    let increase = () => {
      opacityRate += 0.25;
      this.setState({ opacity: opacityRate.toString() });
    };

    let increaseOpacity = setInterval(increase, 250);

    setTimeout(() => {
      this.setState({ display: "none", opacity: "0", });
      clearInterval(increaseOpacity);
    }, 5000);
  }

  render() {
    return (
      <div id="most-outter">
        <h1 style = {{color: "white", marginTop: "5px"}}>Team Organizer™ </h1>
        <div id="outter">
            <div className="container text-white">
            <div className="row login-form bg-dark">
              <div className="col">
                <h2>Sign Up Form</h2>
                <form className="signup" onSubmit={this.onSubmit}>
                  <div className="form-group" autoComplete="off">
                    <label htmlFor="InputName" autoComplete="off">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-control logsign-field"
                      id="name-input"
                      placeholder="John Doe"
                      autoComplete="off"
                      onChange={this.onChangeName}
                    />
                  </div>
                  <div className="form-group" autoComplete="off">
                    <label htmlFor="InputPhone">Your Phone Number</label>
                    <input
                      type="tel"
                      className="form-control logsign-field"
                      id="phone-input"
                      placeholder="+12 123 123 1234"
                      // autoComplete="off"
                      autoComplete="user-phone"
                      onChange={this.onChangePhone}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="InputEmail">Email address</label>
                    <input
                      type="text"
                      className="form-control logsign-field"
                      id="email-input"
                      placeholder="you@domain.com"
                      autoComplete="off"
                      onChange={this.onChangeEmail}
                    />
                  </div>
                  <div className="form-group"  >
                    <label htmlFor="InputPassword">Password</label>
                    <input
                      type="password"
                      className="form-control logsign-field"
                      id="password-input"
                      placeholder="password"
                      autoComplete="off"
                      onKeyUpCapture={this.handleKeyDown}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                    />
                  </div>
                  <Alerts
                    transition={"opacity 2s"}
                    display={this.state.display}
                    opacity={this.state.opacity}

                    alert={this.state.alertmsg}>
                  </Alerts>
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                    onSubmit={this.onSubmit}
                  >
                    Sign Up
                  </button>
                </form>
                <br />

                <div id="pswd_info" style={{ display: this.state.pswDisplay }}>
                  <h6>Password must have:</h6>
                  <p id="letter" className={this.state.pswLetterClass}>
                    At least <strong>one letter</strong>
                  </p>
                  <p id="capital" className={this.state.pswCapitalClass}>
                    At least <strong>one capital letter</strong>
                  </p>
                  <p id="number" className={this.state.pswNumClass}>
                    At least <strong>one number</strong>
                  </p>
                  <p id="length" className={this.state.pswLengthClass}>
                    Be at least <strong>8 characters</strong>
                  </p>
                </div>
                <p>
                  Or log in{" "}
                  <Link
                    id="here"
                    to="/"
                    role="button"
                    className="btn btn-outline-primary btn-sm"
                  >
                    here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
