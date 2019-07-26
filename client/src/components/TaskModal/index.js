// ================================== Packages Dependencies
import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";

// ================================== Files Dependencies
import TaskCard from "../TaskCard";

// function TaskModal(props) {
//   // const [show, setShow] = useState(false);

//   // const handleClose = () => setShow(false);
//   // const handleShow = () => setShow(true);

//   return (
//       <Modal show={props.show} onHide={props.handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={props.handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={props.handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//   );
// }

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
      <Modal.Header class="elvan">
        <h5 className="modal-title text-white"></h5>
        <button
          id="addTaskModal"
          className="btn btn-secondary"
          style={{ float: "right" }}
          data-toggle="collapse"
          href="#addTaskCollapsWindow"
          aria-expanded="false"
          aria-controls="addTaskCollapsWindow"
        >
          <i className="fa fa-plus fa-4" aria-hidden="true"></i>
        </button>
        <button
          type="button"
          className="close text-danger"
          data-dismiss="taskModal"
          aria-label="Close"
          onClick={props.handleClose}
        >
          <span aria-hidden="true">&times;</span>
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
          data-dismiss="modal"
        >
          Close
        </button>
      </Modal.Footer>
     
    </Modal>
  );
};

export default TaskModal;
