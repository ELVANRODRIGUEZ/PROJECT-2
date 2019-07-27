import React, { Component } from "react";

class Alerts extends Component {

  render() {
    return (
        <div
        style={{
            transition: this.props.transition,
            display: this.props.display,
            opacity: this.props.opacity
          }}
        id="alert"
        className="alert alert-danger"
        role="alert"
        // onChange = {this.onChange}
      >
        
        <span>Error:</span> <span id="alertmsg" className="msg">{this.props.alert}</span>
      </div>
    );
  }
}

export default Alerts;