// ================================== Packages Dependencies
import React, { Component } from "react";
import Moment from "react-moment";

// ================================== Files Dependencies
import MailForm from "../Mail";
import MailRetrieve from "../MailRetrieve";
import EditTaskModal from "../EditTaskModal";
import Chat from "../Chat";

class TaskCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskId: this.props.taskId,
      // For toggling the EditTaskModal window.
      editTaskModalShow: false
    };

    // This is how we define an attribute inside a class:
    this.timeRemaing = new Date(this.props.taskDeadline) - new Date();
  }

  // Toggle the NewTaskModal inside the TaskModal.
  editTaskModalToggle = () => {
    this.state.editTaskModalShow === false
      ? this.setState({ editTaskModalShow: true })
      : this.setState({ editTaskModalShow: false });
  };

  // Closes the askModal and the NewTaskModal.
  editTaskModalClose = () => {
    this.props.handleClose();
    this.setState({ editTaskModalShow: false });
  };

  render() {
    return (
      // +++++++++++++++++ TASK CARD +++++++++++++++++
      <div
        className="card bg-secondary text-white task"
        style={{ margin: "5px" }}
      >
        <div className="card-body">
          {/* +++++++++++++++++ Erase Task Button +++++++++++++++++ */}
          <button
            className="btn btn-secondary"
            data-toggle="collapse"
            href={`#eraseTask${this.props.taskId}`}
            task={`${this.props.taskId}`}
            aria-expanded="false"
            aria-controls={`eraseTask${this.props.taskId}`}
            style={{ float: "right", margin: "0 2px" }}
          >
            <i className="fa fa-trash-o fa-4" aria-hidden="true"></i>
          </button>

          {/* Erase Task Modal */}
          <div className="collapse" id={`eraseTask${this.props.taskId}`}>
            <div
              className="card card-title bg-secondary h4"
              style={{ border: "0px" }}
            >
              {`Confirm to delete Task ${this.props.taskId}?`}
            </div>
            <div className="card-body bg-dark" style={{ textAlign: "right" }}>
              <button
                className="btn btn-outline-success eraseOneTask"
                task={this.props.taskId}
              >
                Erase Task and all it's relationships
              </button>
            </div>
          </div>

          {/* Edit Task Button */}
          <button
            className="btn btn-secondary editTaskButton"
            data-toggle="collapse"
            href={`#editTask${this.props.taskId}`}
            task={this.props.taskId}
            aria-expanded="false"
            aria-controls={`editTask${this.props.taskId}`}
            style={{ float: "right", margin: "0 2px" }}
            onClick={this.editTaskModalToggle}
          >
            <i className="fa fa-pencil fa-4" aria-hidden="true"></i>
          </button>

          {/* +++++++++++++++++ EDIT TASK MODAL +++++++++++++++++ */}
          <EditTaskModal
            editTaskModalView={this.state.editTaskModalShow}
            taskId={this.props.taskId}
            projectUsers={this.props.projectUsers}
            userId={this.props.userId}
            taskUsers=""
            taskPotentialUsers=""
            taskDescription={this.props.taskDescription}
            taskDeadline={this.props.taskDeadline}
          ></EditTaskModal>

          {/* +++++++++++++++++ TASK INFO +++++++++++++++++ */}
          <h5 id="modal-task-id" className="card-title">
            {`Task: ${this.props.taskId}`}
          </h5>
          <div style={{ marginTop: "1rem" }}>
            {this.timeRemaing < 0 ? (
              <h6 className="d-inline p-2 bg-danger rounded text-white">
                Deadline:{" "}
                <Moment format="DD, MMMM. YYYY">
                  {this.props.taskDeadline}
                </Moment>
                <br />
              </h6>
            ) : (
              <h6 className="d-inline p-2 bg-success rounded text-white">
                Deadline:{" "}
                <Moment format="DD, MMMM. YYYY">
                  {this.props.taskDeadline}
                </Moment>
                <br />
              </h6>
            )}
          </div>
          <h6
            id="modal-task-description"
            className="card-subtitle mb-2 text-white"
            style={{ marginTop: "15px" }}
          >
            {this.props.taskDescription}
          </h6>
          <h6>Progress (%):</h6>
          <div className="progress" style={{ marginBottom: ".5rem" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${parseFloat(this.props.taskAccomplished) * 100}%`
              }}
              aria-valuenow={parseFloat(this.props.taskAccomplished) * 100}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div
            className="row"
            style={{ margin: "auto", marginBottom: ".5rem" }}
          >
            <button className="btn btn-dark pplus" style={{ marginLeft: 0 }}>
              <i className="fa fa-minus-circle" aria-hidden="true"></i>
            </button>
            <input
              type="text"
              value={`${parseFloat(this.props.taskAccomplished) * 100}%`}
              id="total"
              className="field left form-control col-sm-1 text-dark"
              readonly=""
              style={{ margin: "5px" }}
            />
            <button className="btn btn-dark pminus">
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </button>
          </div>
          <div className="card bg-dark text-white task">
            <div className="card-body">
              <ul className="nav nav-tabs nav-pills card-title">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="collapse"
                    href="#multiCollapseExample1"
                    role="button"
                    aria-expanded="false"
                    aria-controls="multiCollapseExample1"
                  >
                    Users
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="collapse"
                    href="#multiCollapseExample2"
                    role="button"
                    aria-expanded="false"
                    aria-controls="multiCollapseExample2"
                  >
                    Chat
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="collapse"
                    href="#multiCollapseExample3"
                    role="button"
                    aria-expanded="false"
                    aria-controls="multiCollapseExample3"
                  >
                    New Email
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="collapse"
                    href="#multiCollapseExample4"
                    role="button"
                    aria-expanded="false"
                    aria-controls="multiCollapseExample4"
                  >
                    Email History
                  </a>
                </li>
              </ul>
              {/* +++++++++++++++++ BODY USERS +++++++++++++++++ */}
              <div className="collapse" id="multiCollapseExample1">
                <div className="card card-body bg-dark">
                  <h6>Users: </h6>
                  <ul>
                    <li>Nacho</li>
                    <li>Manu</li>
                    <li>Elvan</li>
                  </ul>
                </div>
              </div>

              {/* ---- Chat Form------ */}
              <div className="collapse" id="multiCollapseExample2">
                <Chat />
              </div>

              {/* ----email Form------ */}
              <div className="collapse" id="multiCollapseExample3">
                <div className="card card-body bg-dark">
                  <div className="container">
                    <MailForm />
                  </div>
                </div>
              </div>
              {/* ----email retrieve---- */}
              <div className="collapse" id="multiCollapseExample4">
                <div className="card card-body bg-dark">
                  <div className="container">
                    <div className="list-group">
                      <MailRetrieve />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskCard;
