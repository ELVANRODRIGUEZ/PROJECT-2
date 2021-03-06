// ================================== Packages Dependencies
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

// ================================== Files Dependencies

class DeleteProjectModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  deleteProject = () => {
    const { userId } = this.props;

    //? Route to delete all Tasks nested in a Project for the logged User.
    //> Endpoint at: "../../../routes/apiProject.js"
    axios
      .delete(
        `/api/project/delete/all_tasks/${userId}/${this.props.projectSelected}`
      )
      .then(data => {
        //  Test console.
        // console.log(data.data);

        // Renders the Category Task count to show that all Tasks have been deleted.
        this.props.renderForCategories();
        this.props.handleClose();
      });
  };

  render() {
    return (
      <Modal
        aria-labelledby="modal-dialog modal-xl"
        size="xl"
        show={this.props.show}
        tabIndex="-1"
        id="delProjectModal"
      >
        <Modal.Header className="text-white" style={{ fontSize: "14pt" }}>
          <p className="modal-title display-4" id="eraseProjModalTitle">
            Delete all Tasks you are related to in
            <b>  Project-{this.props.projectSelected}</b>?
          </p>
          <button
            type="button"
            className="close text-danger"
            data-dismiss="modal"
            aria-label="Close"
            onClick={this.props.handleClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Footer
          style={{
            display: "block",
            padding: "1.25rem"
          }}
        >
          <button
            style={{
              margin: 0,
              marginTop: "1rem",
              float: "right"
            }}
            className="btn btn-outline-success display-5"
            id="deleteProject"
            data-dismiss="modal"
            onClick={this.deleteProject}
          >
            Delete Tasks in Project
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteProjectModal;
