// ================================== Packages Dependencies
import React, { Component } from "react";
import Collapse from "react-bootstrap/Collapse";
import axios from "axios";

class EraseTaskModal extends Component {

  eraseTask = () => {
    const { userId } = this.props;

    //? Route to delete a User from a Task (not the Task itself).
    axios
      .delete(`/api/${userId}/task/${this.props.taskId}/delete`)
      .then(data => {
        //  Rerenders the TaskCards to include the newly created one.
        this.props.renderForNewTasks();
      });
  };

  render() {
    return (
      <Collapse
        className="collapse"
        in={this.props.eraseTaskModalView}
        id={`eraseTask${this.props.taskId}`}
      >
        {/* Collapse Bootstrap tool will not work if there is not a "div" container after the "Collapse" container. */}
        <div>
          <div
            className="card card-title bg-secondary h4"
            style={{ border: "0px" }}
          >
            {`Confirm to leave Task ${this.props.taskId}?`}
          </div>
          <div
            className="card-body bg-dark"
            style={{ textAlign: "right", borderRadius: ".25rem" }}
          >
            <button
              className="btn btn-outline-success eraseOneTask"
              task={this.props.taskId}
              onClick={this.eraseTask}
            >
              Leave Task {this.props.taskId}
            </button>
          </div>
        </div>
      </Collapse>
    );
  }
}

export default EraseTaskModal;
