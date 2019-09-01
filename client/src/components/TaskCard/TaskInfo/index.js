// ================================== Packages Dependencies
import React, { Component } from "react";
import Moment from "react-moment";
import axios from "axios";

// ================================== Files Dependencies
import "../style.css";

class TaskInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // This will fill the Task Progress Bar.
      taskAccomplished: 0,
      // This will toggle the bar access so no "apretar a lo idiota" is allowed.
      blockProgress: true
    };

    // This is how we define an attribute inside a class:
    this.timeRemaing = new Date(this.props.taskDeadline) - new Date();
  }

  // This makes the Axios Request to retrieve the Tasks Progress.
  componentDidMount = () => {
    //  Test console.
    // console.log(this.props.taskDeadline)

    //? Route to get Task progress.
    //> Endpoint at: "../../../routes/apiTask.js"
    axios.get(`/api/task/get/progress/${this.props.taskId}`).then(data => {
      //  Test console.
      // console.log(data.data.accomplished);
      let progress = data.data.accomplished;
      this.setState({
        taskAccomplished: parseInt(parseFloat(progress) * 100)
      });
    });
  };

  chgProgress = event => {
    let accomplishment = event.target.getAttribute("accomplished");
    let action = event.target.getAttribute("action");
    let editedTask;

    if (this.state.blockProgress === true) {
      // First of all, we block the bar so no fastclicking can mess the process.
      this.setState({ blockProgress: false }, () => {
        if (accomplishment < 100 && action === "add") {
          this.setState(
            { taskAccomplished: this.state.taskAccomplished + 5 },
            () => {
              // Test console.
              //   console.log(this.state.taskAccomplished);

              editedTask = {
                accomplished: parseFloat(this.state.taskAccomplished) / 100
              };

              this.updateProgress(editedTask);
            }
          );
        } else if (accomplishment > 0 && action === "subtract") {
          this.setState(
            { taskAccomplished: this.state.taskAccomplished - 5 },
            () => {
              // Test console.
              //   console.log(this.state.taskAccomplished);

              editedTask = {
                accomplished: parseFloat(this.state.taskAccomplished) / 100
              };

              this.updateProgress(editedTask);
            }
          );
        } else {
          this.setState({ blockProgress: true });
        }
      });
    }
  };

  // This will make the Axios Request to update the Task Progress and unblock the bar.
  updateProgress = edition => {
    //? Route to update Task progress.
    //> Endpoint at: "../../../routes/apiTask.js"
    axios
      .put(`/api/task/update/taskProgress/${this.props.taskId}`, edition)
      .then(() => {
        this.setState({ blockProgress: true });
      });
  };

  render() {
    return (
      // +++++++++++++++++ TASK INFO +++++++++++++++++
      <div
        id={`task${this.props.taskId}Info`}
        style={{
          fontSize: "14pt"
        }}
      >
        <p id="modal-task-id" className="card-title display-4">
          {`Task: ${this.props.taskId}`}
        </p>
        <div style={{ marginTop: "1rem", fontSize: "12pt" }}>
          {this.timeRemaing < 0 ? (
            <p className="d-inline p-2 bg-danger rounded text-white display-5">
              <b>Deadline:&nbsp;&nbsp;&nbsp;</b>
              <Moment format="DD, MMMM. YYYY">{this.props.taskDeadline}</Moment>
              <br />
            </p>
          ) : (
            <p className="d-inline p-2 bg-success rounded text-white display-5">
              <b>Deadline:&nbsp;&nbsp;&nbsp;</b>
              <Moment format="DD, MMMM. YYYY">{this.props.taskDeadline}</Moment>
              <br />
            </p>
          )}
        </div>
        <div style={{ fontSize: "12pt" }}>
          <p
            id="modal-task-description"
            className="card-subtitle mb-2 text-white display-5"
            style={{ marginTop: "15px" }}
          >
            {this.props.taskDescription}
          </p>
        </div>
        <div style={{ fontSize: "12pt" }}>
          <p className="display-5">
            <b>Progress (%):</b>
          </p>
        </div>
        <div className="progress" style={{ marginBottom: ".5rem" }}>
          <div
            className="progress-bar progress-bar-striped"
            role="progressbar"
            style={{
              width: `${this.state.taskAccomplished}%`
            }}
            aria-valuenow={this.state.taskAccomplished}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="row" style={{ margin: "auto", marginBottom: ".5rem", fontSize: "12pt" }}>
          <button
            className="btn btn-dark pplus"
            style={{ marginLeft: 0 }}
            accomplished={this.state.taskAccomplished}
            action="subtract"
            task={this.props.taskId}
            onClick={this.chgProgress}
          >
            <i
              className="fa fa-minus-circle"
              aria-hidden="true"
              accomplished={this.state.taskAccomplished}
              action="subtract"
              task={this.props.taskId}
            ></i>
          </button>
          <input
            type="text"
            value={`${this.state.taskAccomplished}%`}
            id="avance-total"
            className="field left form-control col-sm-1 display-5"
            readOnly
            style={{
              margin: "5px",
              width: "60px",
              maxWidth: "60px",
              border: "0px",
              backgroundColor: "#343a40"
            }}
          />
          <button
            className="btn btn-dark pminus"
            accomplished={this.state.taskAccomplished}
            action="add"
            task={this.props.taskId}
            onClick={this.chgProgress}
          >
            <i
              className="fa fa-plus-circle"
              aria-hidden="true"
              accomplished={this.state.taskAccomplished}
              action="add"
              task={this.props.taskId}
            ></i>
          </button>
        </div>
      </div>
    );
  }
}

export default TaskInfo;
