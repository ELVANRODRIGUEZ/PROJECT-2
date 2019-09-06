// ================================== Packages Dependencies
import React, { Component } from "react";
import Collapse from "react-bootstrap/Collapse";
import axios from "axios";

class EraseTaskModal extends Component {
  eraseTask = () => {
    const { userId } = this.props;

    //? Route to delete a User from a Task (not the Task itself).
    //> Endpoint at: "../../../routes/apiTask.js"
    axios
      .delete(`/api/task/delete/${userId}/${this.props.taskId}`)
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
            style={{ border: "0px", fontSize: "14pt" }}
          >
            <p className="modal-title display-4" id="eraseProjModalTitle">
              Confirm to leave
              <b> Task-{this.props.taskId}</b>?
            </p>
          </div>
          <div
            className="card-body bg-dark"
            style={{ textAlign: "right", borderRadius: ".25rem" }}
          >
            <button
              className="btn btn-outline-success eraseOneTask display-5"
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
