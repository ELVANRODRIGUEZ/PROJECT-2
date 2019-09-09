import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; //  We import "Link" from "react-router-dom" to be able to link to other Route Components.
import Alerts from "../components/Alerts";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      display: "none",
      opacity: "0"
    };
  }

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
      password: this.state.password
    };

    //Test console.
    // console.log(userData);

    //? Route for logging on a user.
    //> Endpoint at: "../../../routes/apiLogin.js"
    axios
      .post("/api/post/login", userData)
      .then(res => {
        if ((res = "Successful")) {
          this.props.history.push("/members");
        } else {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);

        let opacityRate = 0;

        this.setState({ display: "block" });

        let increase = () => {
          opacityRate += 0.25;
          this.setState({ opacity: opacityRate.toString() });
        };

        let increaseOpacity = setInterval(increase, 250);

        setTimeout(() => {
          this.setState({ display: "none", opacity: "0" });
          clearInterval(increaseOpacity);
        }, 3000);
      });
  };

  render() {
    return (
      <div id="most-outter">
        <nav className="navbar bg-dark navbarTitle">
          <div
            id="userNameBanner"
            className="navbar-brand"
            style={{
              display: "inline-block",
              fontSize: "20pt"
            }}
          >
            <div className="navText">Team Organizer™ v3.6 </div>
          </div>
        </nav>
        <div id="outter">
          <div className="row login-form bg-dark text-white">
            <div className="col-md-12">
              <div
                className="card-header"
                style={{
                  padding: "0",
                  marginBottom: "10px"
                }}
              >
                <span className="display-3">Login Form</span>
              </div>
              <form
                className="login"
                onSubmit={this.onSubmit}
                style={{
                  fontSize: "12pt"
                }}
              >
                <div className="form-group">
                  <label htmlFor="email-input">
                    <b className="display-5">Email address:</b>
                  </label>
                  <input
                    type="email"
                    className="form-control logsign-field display-5"
                    id="email-input"
                    placeholder="Email"
                    onChange={this.onChangeEmail}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password-input">
                    <b className="display-5">Password:</b>
                  </label>
                  <input
                    type="password"
                    className="form-control logsign-field display-5"
                    id="password-input"
                    placeholder="Password"
                    onChange={this.onChangePassword}
                  />
                </div>

                {/*! +++++++++++++++++ Error Dialog +++++++++++++++++ */}
                <Alerts
                  transition={"opacity 2s"}
                  display={this.state.display}
                  opacity={this.state.opacity}
                  alert={"Your Data is incorrect"}
                ></Alerts>

                <button
                  id="login"
                  type="submit"
                  className="btn btn-outline-success display-5"
                  onSubmit={this.onSubmit}
                  style={{
                    marginLeft: "0"
                  }}
                >
                  Login
                </button>
              </form>
              <br />
              <div style={{ fontSize: "12pt" }}>
                <p>
                  <b className="display-5">Or sign up </b>
                  <Link
                    id="here"
                    role="button"
                    to="/signup"
                    className="btn btn-outline-primary btn-sm display-5"
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

export default Login;
