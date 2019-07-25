import React, { Component } from "react";
import axios from "axios";  // We import "axios" to be able to make requests to the Backend Endpoints.
import { Link } from 'react-router-dom';  //  We import "Link" from "react-router-dom" to be able to link to other Route Components.

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
      password: ""
    };
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

  onChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.password,
      userName:this.state.name
    };
console.log(userData);
    axios.post("/api/signup", userData)
    .then(res => {
      if ((res = "Successful")) {
        window.location = "/members";
      }
    });
  };

  render() {
    return (
      <div id="most-outter">
        <div id="outter">
          This is from the component
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
                  <div className="form-group"autoComplete="off">
                    <label htmlFor="InputPhone">Your Phone Number</label>
                    <input
                      type="tel"
                      className="form-control logsign-field"
                      id="phone-input"
                      placeholder="+12 123 123 1234"
                      autoComplete="off"
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
                  <div className="form-group">
                    <label htmlFor="InputPassword">Password</label>
                    <input
                      type="password"
                      className="form-control logsign-field"
                      id="password-input"
                      placeholder="password"
                      autoComplete="off"
                      onChange={this.onChangePassword}
                    />
                  </div>
                  <div
                    style={{ display: "none" }}
                    id="alert"
                    className="alert alert-danger"
                    role="alert"
                  >
                    <i className="fas fa-exclamation-circle"></i>
                    <span>Error:</span> <span className="msg"></span>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                    onSubmit={this.onSubmit}
                  >
                    Sign Up
                  </button>
                </form>
                <br />

                <div id="pswd_info">
                  <h6>Password must have:</h6>
                  <p id="letter" className="invalid">
                    At least <strong>one letter</strong>
                  </p>
                  <p id="capital" className="invalid">
                    At least <strong>one capital letter</strong>
                  </p>
                  <p id="number" className="invalid">
                    At least <strong>one number</strong>
                  </p>
                  <p id="length" className="invalid">
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
