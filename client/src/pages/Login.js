import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; //  We import "Link" from "react-router-dom" to be able to link to other Route Components.

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      //   hide: [{ display: "none"}, {transition: "opacity 0.5s"}, {opacity: "1" }],
      //   show: [{ display: "block"}, {transition: "opacity 0.5s"}, {opacity: "0" }]
      // }
      display: "none",
      opacity: "0"
    };
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
      password: this.state.password
    };

    axios
      .post("/api/login", userData)
      .then(res => {
        if ((res = "Successful")) {
          this.props.history.push("/members")
        } else {
          this.props.history.push("/")
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
        <h1 style = {{color: "white", marginTop: "5px"}}>Team Organizer™ 0 </h1>
        <div id="outter">
           <div id="login-form" className="container text-white">
            <div className="row login-form bg-dark">
              <div className="col-md-12">
                <h2>Login Form</h2>
                <form className="login" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="InputEmail">Email address</label>
                    <input
                      type="email"
                      className="form-control logsign-field"
                      id="email-input"
                      placeholder="Email"
                      onChange={this.onChangeEmail}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="InputPassword">Password</label>
                    <input
                      type="password"
                      className="form-control logsign-field"
                      id="password-input"
                      placeholder="Password"
                      onChange={this.onChangePassword}
                    />
                  </div>

                  {/*! +++++++++++++++++ Error Dialog +++++++++++++++++ */}
                  <div
                    style={{
                      transition: "opacity 2s",
                      display: this.state.display,
                      opacity: this.state.opacity
                    }}
                    id="alert"
                    className="alert alert-danger"
                    role="alert"
                  >
                    <i className="fa fa-exclamation-circle"></i>
                    <span className="msg">
                      &nbsp; Error: Your Data is incorrect
                    </span>
                  </div>

                  <button
                    id="login"
                    type="submit"
                    className="btn btn-outline-success"
                    onSubmit={this.onSubmit}
                  >
                    Login
                  </button>
                </form>
                <br />
                <p>
                  Or sign up{" "}
                  <Link
                    id="here"
                    role="button"
                    to="/signup"
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

export default Login;
