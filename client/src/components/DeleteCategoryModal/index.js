// ================================== Packages Dependencies
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

// ================================== Files Dependencies

class DeleteCategoryModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  deleteCategory = () => {
    const { userId, projectSelected, categorySelected  } = this.props;

    //? Route to delete all Tasks nested in a Category for the logged User.
    //> Endpoint at: "../../../routes/apiCategory.js"
    axios
      .delete(
        `/api/category/delete/all_tasks/${userId}/${projectSelected}/${categorySelected}`
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
        id="delCategoryModal"
      >
        <Modal.Header className="text-white" style={{ fontSize: "14pt" }}>
          <p className="modal-title display-4" id="eraseCategoryModalTitle">
            Delete all Tasks you are related to in
            <b> Category-{this.props.categorySelected}</b>?
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
            id="deleteCategory"
            data-dismiss="modal"
            onClick={this.deleteCategory}
          >
            Delete Tasks in Category
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteCategoryModal;
