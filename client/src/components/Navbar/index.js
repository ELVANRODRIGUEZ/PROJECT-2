import React, { Component } from "react";
import axios from "axios";

class Navbar extends Component {
  logOut = event => {
    event.preventDefault();
    // Test console.
    // console.log("clicked signout");
    axios
      .get("/logout")
      .then(res => {
        // window.location = "/";
        this.props.history.push("/")
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <nav className="navbar  bg-dark navbarTitle">
        <p id="userNameBanner" className="navbar-brand">
          Welcome {this.props.userName}
        </p>
        <form className="form-inline">
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
            aria-disabled="true"
            // href="/logout"
            onClick={this.logOut}
          >
            Sign Out
          </button>
        </form>
      </nav>
    );
  }
}

export default Navbar;
