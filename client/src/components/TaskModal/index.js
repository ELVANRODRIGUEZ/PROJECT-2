// ================================== Packages Dependencies
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";


// ================================== Files Dependencies
import TaskCard from "../TaskCard";
import NewTaskModal from "../NewTaskModal";
import axios from "axios";


class TaskModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTaskModalShow: false,
      projectUsers: []
    };
  }

  componentDidUpdate = (prevProps) => {
    // console.log(prevProps.projectUsers);
    if(prevProps.projectUsers !== this.props.projectUsers) {
      // Test console.
      // console.log(this.props.projectUsers);
      
      this.setState({projectUsers:this.props.projectUsers}, () => {
        
        // Test console.
        console.log(this.state.projectUsers);
        
      })
    }
    // Test console.
    // console.log(this.state.projectUsers);
  }

  newTaskModalToggle = () => {

    this.state.newTaskModalShow === false ?
      this.setState({ newTaskModalShow: true })
      :
      this.setState({ newTaskModalShow: false })

  }

  // getUsers = () => {

  //   axios
  //     .get("/api/project_users")
  //     .then(users => {
  //       // Test console.
  //       // console.log(users.data);

  //       this.setState((prevState, props) => {
  //         return { projectUsers: users.data };
  //       });

  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  closeAndToggleModals = () => {

    this.props.handleClose();
    this.newTaskModalToggle();

  }

  render() {
    return (
      // +++++++++++++++++ TASK MODAL +++++++++++++++++
      <Modal
        aria-labelledby="modal-dialog modal-xl"
        size="xl"
        show={this.props.show}
        tabIndex="-1"
        // role="dialog"
        id="taskModal"
        dialogClassName="elvan-modal"
      // dialogAs="test"
      // bsPrefix="test modal"
      >
        {/* <Modal.Footer className="modal-dialog modal-xl" role="document"> */}
        {/* <Modal className="modal-content bg-dark"> */}
        <Modal.Header>
          <h5 className="modal-title text-white"></h5>
          <button
            id="addTaskModal"
            className="btn btn-secondary"
            style={{ float: "right" }}
            dataToggle="collapse"
            href="#addTaskCollapsWindow"
            aria-expanded="false"
            ariaControls="addTaskCollapsWindow"
            onClick={this.newTaskModalToggle}
          >
            <i className="fa fa-plus fa-4" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            className="close text-danger"
            dataDismiss="taskModal"
            ariaLabel="Close"
            onClick={this.closeAndToggleModals}
          >
            <span ariaHidden="true">&times;</span>
          </button>
        </Modal.Header>
        {/* +++++++++++++++++ New Taks Collapse Window +++++++++++++++++ */}

        <NewTaskModal
          newTaskModalView={this.state.newTaskModalShow}
          projectUsers={this.state.projectUsers}
          newTaskModalToggle={this.newTaskModalToggle}
        >
        </NewTaskModal>

        <Modal.Body id="modal-container">

          {/* +++++++++++++++++ TASK CARD +++++++++++++++++ */}
          {this.props.tasksCards.map((task) => {
            return (<TaskCard
              key={task.task_id}
              taskId={task.task_id}
              taskDescription={task.task_description}
              taskDeadline={task.task_deadline}
              taskAccomplished={task.task_accomplished}
            ></TaskCard>);
          })}

        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn btn-outline-danger"
            dataDismiss="modal"
          >
            Close
        </button>
        </Modal.Footer>

      </Modal>
    );
  }
}

export default TaskModal;
