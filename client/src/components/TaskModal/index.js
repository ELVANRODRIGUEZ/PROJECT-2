// ================================== Packages Dependencies
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

// ================================== Files Dependencies
import TaskCard from "../TaskCard";
import NewTaskModal from "../NewTaskModal";
// import axios from "axios";

class TaskModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTaskModalShow: false,
      // For toggling the EditTaskModal window according to the selected Task
      openedTask: "",
      openEraseTask: "",
      projectUsers: [],
      userId: this.props.userId
    };
  }

  openTask = (task, eraseTask) => {
    this.setState(
      {
        openedTask: parseInt(task),
        openEraseTask: parseInt(eraseTask)
      },
      () => {
        //  Test console.
        // console.log(this.state.openedTask);
        // console.log(this.state.openEraseTask);
      }
    );
  };

  componentDidUpdate = prevProps => {
    // Test console.
    // console.log(prevProps.projectUsers);
    // console.log(prevProps.userId);

    // Assigns the "state.projectUsers" the "props.projectUsers" value. (So far, it was not possible to just assign the value right from the sarte in the state declaration inside the constructor).
    if (prevProps.projectUsers !== this.props.projectUsers) {
      // Test console.
      // console.log(this.props.projectUsers);

      this.setState({ projectUsers: this.props.projectUsers }, () => {
        // Test console.
        // console.log(this.state.projectUsers);
      });
    }
  };

  // Toggle the NewTaskModal inside the TaskModal.
  newTaskModalToggle = () => {
    if (this.state.newTaskModalShow === false) {
      this.setState({
        newTaskModalShow: true,
        // This will cause a remapping to close any possible opened Task Edit Modal.
        openedTask: 0,
        // This will cause a remapping to close any possible opened Task Erase Modal.
        openEraseTask: 0
      });
    } else {
      this.setState({ newTaskModalShow: false });
    }
  };

  // Closes the TaskModal and the NewTaskModal.
  wholeTaskModalClose = () => {
    this.props.handleClose();
    this.setState({ newTaskModalShow: false });
  };

  render() {
    return (
      // +++++++++++++++++ TASK MODAL +++++++++++++++++
      <Modal
        aria-labelledby="modal-dialog modal-xl"
        size="xl"
        show={this.props.show}
        tabIndex="-1"
        id="taskModal"
      >
        {/* +++++++++++++++++ HEADER +++++++++++++++++ */}
        <Modal.Header>
          <h5 className="modal-title text-white"></h5>
          <button
            id="addTaskModal"
            className="btn btn-secondary"
            style={{ float: "right" }}
            datatoggle="collapse"
            href="#addTaskCollapsWindow"
            aria-expanded="false"
            aria-controls="addTaskCollapsWindow"
            onClick={this.newTaskModalToggle}
          >
            <i className="fa fa-plus fa-4" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            className="close text-danger"
            data-dismiss="taskModal"
            aria-label="Close"
            onClick={this.wholeTaskModalClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        {/* +++++++++++++++++ New Taks Collapse Window +++++++++++++++++ */}
        <NewTaskModal
          newTaskModalView={this.state.newTaskModalShow}
          projectUsers={this.state.projectUsers}
          newTaskModalToggle={this.newTaskModalToggle}
          userId={this.state.userId}
          renderForNewTasks={this.props.renderForNewTasks}
        ></NewTaskModal>

        {/* +++++++++++++++++ BODY +++++++++++++++++ */}
        <Modal.Body id="modal-container">
          {/* +++++++++++++++++ TASK CARD +++++++++++++++++ */}
          {this.props.tasksCards.map(task => {
            return (
              <TaskCard
                key={task.task_id}
                projectId={task.project_id}
                taskId={task.task_id}
                projectUsers={this.props.projectUsers}
                userId={this.state.userId}
                userName={this.props.userName}
                userEmail={this.props.userEmail}
                taskDescription={task.task_description}
                taskDeadline={task.task_deadline}
                renderForEditedTasks={this.props.renderForNewTasks}
                renderForNewTasks={this.props.renderForNewTasks}
                // This will compare all The existing Task Cards with the "openedTask" state which should cointained any Task Id that is supposed to be open, or "0" to shut them all.
                editTaskModalShow={
                  task.task_id === this.state.openedTask ? true : false
                }
                eraseTaskModalShow={
                  task.task_id === this.state.openEraseTask ? true : false
                }
                taskOpened={parseInt(this.state.openedTask)}
                eraseTaskOpened={parseInt(this.state.openEraseTask)}
                openTask={this.openTask}
              ></TaskCard>
            );
          })}
        </Modal.Body>

        {/* +++++++++++++++++ FOOTER +++++++++++++++++ */}
        <Modal.Footer>
          <button
            type="button"
            className="btn btn btn-outline-danger"
            dataDismiss="modal"
            onClick={this.wholeTaskModalClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TaskModal;
