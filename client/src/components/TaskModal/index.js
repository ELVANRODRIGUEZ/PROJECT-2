// ================================== Packages Dependencies
import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";

// ================================== Files Dependencies
import TaskCard from "../TaskCard";


const TaskModal = function(props) {
  return (
    // +++++++++++++++++ TASK MODAL +++++++++++++++++
    <Modal
      aria-labelledby="modal-dialog modal-xl"
      size="xl"
      show={props.show}
      tabindex="-1"
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
          ariaExpanded="false"
          ariaControls="addTaskCollapsWindow"
        >
          <i className="fa fa-plus fa-4" aria-hidden="true"></i>
        </button>
        <button
          type="button"
          className="close text-danger"
          dataDismiss="taskModal"
          ariaLabel="Close"
          onClick={props.handleClose}
        >
          <span ariaHidden="true">&times;</span>
        </button>
      </Modal.Header>
      {/* +++++++++++++++++ New Taks Collapse Window +++++++++++++++++ */}
      
      <Modal.Body id="modal-container">
        {/* +++++++++++++++++ TASK CARD +++++++++++++++++ */}
        <TaskCard
          taskId="4"
          taskDescription="This is a Component Test Task"
          taskDeadline="21, July. 2019"
          taskAccomplished={0.8}
        ></TaskCard>
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
};

export default TaskModal;
