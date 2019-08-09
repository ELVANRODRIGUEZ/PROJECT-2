// ================================== Packages Dependencies
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

// ================================== Files Dependencies

class NewCategoryModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCatName: "",
      newCatDescription: "",
      //  For Error Alert display control.
      display: "none",
      opacity: "0",
      errorMessage: ""
    };

    // Refs.
    this.categoryName = React.createRef();
    this.categoryDesc = React.createRef();
  }

  componentDidUpdate = prevProps => {
    
  };

  // Closes the New Project Modal.
  wholeNewCatModalClose = () => {
    this.setState(
      {
        newCatName: "",
        newCatDescription: "",
      },
      () => {
        //  Clears out the Project Name and the Project Description inputs.
        this.categoryName.current.value = "";
        this.categoryDesc.current.value = "";
        //  Toggles the NewProjTaskModal.
        this.props.handleClose();
      }
    );
  };

  chgName = event => {
    const NameValue = event.target.value;

    this.setState((prevState, props) => {
      return { newCatName: NameValue };
    });
  };

  chgDescription = event => {
    const descValue = event.target.value;

    this.setState((prevState, props) => {
      return { newCatDescription: descValue };
    });
  };

  saveNewCategory = event => {
    // event.preventDefault();

    if (this.state.newCatName === "") {
      this.alertMessage("No Name");
    } else if (this.state.newCatDescription === "") {
      this.alertMessage("No Description");
    } else {
      let newCategory;

      newCategory = {
        name: this.state.newCatName,
        description: this.state.newCatDescription
      };

      // Test console.
      //   console.log(newCategory);

      axios
        .post("/api/category/add", newCategory)
        .then(data => {
          // Test console.
        //   console.log(data.data);

          this.categoryName.current.value = "";
          this.categoryDesc.current.value = "";

          this.setState(
            {
              newCatName: "",
              newCatDescription: "",
            },
            () => {
              //  Toggles the NewProjTaskModal.
              this.props.handleClose();
              //  Rerenders the ProjectCards to include the newly created one.
              this.props.renderForNewCategories();
            }
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  alertMessage = msg => {
    if (msg === "No Name") {
      return this.setState(
        {
          errorMessage: "Please type a Category Name"
        },
        () => this.showAlertMessage()
      );
    } else if (msg === "No Description") {
      return this.setState(
        {
          errorMessage: "Please type a Category Description"
        },
        () => this.showAlertMessage()
      );
    }
  };

  showAlertMessage = () => {
    let opacityRate = 0;

    this.setState({ display: "block" });

    let increase = () => {
      opacityRate += 0.25;
      this.setState({ opacity: opacityRate.toString() });
    };

    let increaseOpacity = setInterval(increase, 250);

    setTimeout(() => {
      this.setState({
        display: "none",
        opacity: "0",
        errorMessage: ""
      });
      clearInterval(increaseOpacity);
    }, 3000);
  };

  render() {
    return (
      // +++++++++++++++++ NEW PROJECT MODAL +++++++++++++++++
      <Modal
        aria-labelledby="modal-dialog modal-xl"
        size="xl"
        show={this.props.show}
        tabIndex="-1"
        id="newCategoryModal"
      >
        <Modal.Header className="text-white">
          <h5 className="modal-title">Add a New Category</h5>
          <button
            type="button"
            className="close text-danger"
            data-dismiss="modal"
            aria-label="Close"
            onClick={this.wholeNewCatModalClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body id="newProjectModal-container">
          <form>
            <div className="form-group">
              <label htmlFor="categoryName">Category name</label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                placeholder="Category Name"
                ref={this.categoryName}
                onChange={this.chgName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoryDesc">Category Description</label>
              <textarea
                type="text"
                className="form-control"
                id="categoryDesc"
                rows="3"
                ref={this.categoryDesc}
                onChange={this.chgDescription}
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "block",
            padding: "1.25rem"
          }}
        >
          {/*! +++++++++++++++++ Error Dialog +++++++++++++++++ */}
          <div
            style={{
              transition: "opacity 2s",
              display: this.state.display,
              opacity: this.state.opacity,
              margin: 0
            }}
            id="newProjectAlert"
            className="alert alert-danger"
            role="alert"
          >
            <i className="fa fa-exclamation-circle"></i>
            <span className="msg">&nbsp; {this.state.errorMessage}</span>
          </div>
          <button
            style={{
              margin: 0,
              marginTop: "1rem",
              float: "right"
            }}
            className="btn btn-outline-success"
            id="categoryModalAdd"
            data-dismiss="modal"
            onClick={this.saveNewCategory}
          >
            Create Category
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewCategoryModal;
