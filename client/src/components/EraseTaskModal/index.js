// ================================== Packages Dependencies
import React, { Component } from "react";
import Collapse from "react-bootstrap/Collapse";
// import axios from "axios";

// ================================== Files Dependencies
// import "../TaskCard/style.css";

class EraseTaskModal extends Component {
  constructor(props) {
    super(props);
  }

  // eraseTask = () => {};

  render() {
    return (
      <Collapse
        // className="collapse"
        in={this.props.eraseTaskModalView}
        // id={`eraseTask${this.props.taskId}`}
      >
        {/* Collapse Bootstrap tool will not work if there is not a "div" container after the "Collapse" container. */}
        <div>
          <div
            className="card card-title bg-secondary h4"
            style={{ border: "0px" }}
          >
            {`Confirm to delete Task ${this.props.taskId}?`}
          </div>
          <div
            className="card-body bg-dark"
            style={{ textAlign: "right",borderRadius: ".25rem" }}
          >
            <button
              className="btn btn-outline-success eraseOneTask"
              task={this.props.taskId}
            >
              Erase Task and all it's relationships
            </button>
          </div>
        </div>
      </Collapse>
    );
  }
}

export default EraseTaskModal;
