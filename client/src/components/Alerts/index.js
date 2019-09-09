import React, { Component } from "react";

class Alerts extends Component {
  render() {
    return (
      <div
        style={{
          transition: this.props.transition,
          display: this.props.display,
          opacity: this.props.opacity,
          fontSize: "12pt"
        }}
        id="alert"
        className="alert alert-danger"
        role="alert"
      >
        <i className="fa fa-exclamation-circle"></i>
        <span id="alertmsg" className="msg display-5">
          &nbsp; Error:&nbsp; {this.props.alert}.
        </span>
      </div>
    );
  }
}

export default Alerts;
