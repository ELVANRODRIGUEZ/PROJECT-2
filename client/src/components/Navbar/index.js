import React, { Component } from "react";
import axios from "axios";

class Navbar extends Component {
  logOut = event => {
    event.preventDefault();
    // Test console.
    // console.log("clicked signout");

    //? Route for logging user out.
    //> Endpoint at: "../../../routes/apiLogin.js"
    axios
      .get("/api/get/logout")
      .then(res => {
        if (res.data === "You are logged out") {
          //Test console.
          // console.log(res);

          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <nav className="navbar bg-dark navbarTitle">
        <div
          id="userNameBanner"
          className="navbar-brand"
          style={{
            display: "inline-block",
            fontSize: "20pt"
          }}
        >
          <div className="navText">Team Organizer™</div>
          <div
            className="navText"
          >
            Welcome, {this.props.userName}
          </div>
        </div>
        <form className="form-inline">
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
            aria-disabled="true"
            onClick={this.logOut}
            style={{margin:"0px"}}
          >
            Sign Out
          </button>
        </form>
      </nav>
    );
  }
}

export default Navbar;
