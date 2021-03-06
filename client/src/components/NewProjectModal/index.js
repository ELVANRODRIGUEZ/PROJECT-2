// ================================== Packages Dependencies
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Alerts from "../Alerts";

// ================================== Files Dependencies

class NewProjectModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //  This state inherits all the Users born in the Members Component at Login time.
      allUsers: this.props.allUsers,
      newProjName: "",
      newProjDescription: "",
      // Capture the user selected from the dropdown menu and changes to whatever option is chosen from it. It is intended for always keeping one object value, but is an array for "concatenation" with the "usersAdded" array when the selected user is actually added.
      userToAdd: [],
      // This array will keep all the Users added to be related to the New Task.
      usersAdded: [],
      //  For Error Alert display control.
      display: "none",
      opacity: "0",
      errorMessage: ""
    };

    // Refs.
    this.projectName = React.createRef();
    this.projectDesc = React.createRef();
  }

  componentDidUpdate = prevProps => {
    // Test console.
    // console.log(prevProps.allUsers);
    // console.log(this.state.allUsers);

    // Assigns the "state.projectUsers" the "props.projectUsers" value. (So far, it was not possible to just assign the value right from the sarte in the state declaration inside the constructor).
    if (prevProps.allUsers !== this.props.allUsers) {
      // Test console.
      // console.log(this.props.allUsers);

      this.setState({ allUsers: this.props.allUsers }, () => {
        // Test console.
        // console.log(this.state.allUsers);
      });
    }
  };

  // Closes the New Project Modal.
  wholeNewProjModalClose = () => {
    this.setState(
      {
        newProjName: "",
        newProjDescription: "",
        userToAdd: [],
        usersAdded: []
      },
      () => {
        //  Clears out the Project Name and the Project Description inputs.
        this.projectName.current.value = "";
        this.projectDesc.current.value = "";
        //  Toggles the NewProjTaskModal.
        this.props.handleClose();
      }
    );
  };

  chgName = event => {
    const NameValue = event.target.value;

    this.setState((prevState, props) => {
      return { newProjName: NameValue };
    });
  };

  chgDescription = event => {
    const descValue = event.target.value;

    this.setState((prevState, props) => {
      return { newProjDescription: descValue };
    });
  };

  selectUserToAdd = event => {
    //  Select the index of the selected item in a dropdown menu.
    let optionIndex = event.target.selectedIndex;
    //  Test console.
    // console.log(optionIndex);

    //  Select the node (the whole Tag) given the index of a dropdown menu.
    let optionSelected = event.target.childNodes[optionIndex];
    //  Test console.
    // console.log(optionSelected);

    //  Select a Named Attribute (userid) of a given node (similar to HTML Tag). In this case, the node is the Option selected.
    let userToAddId = parseInt(optionSelected.getAttribute("userid"));

    this.setState(
      {
        userToAdd: this.state.allUsers.filter(user => {
          return user.user_id === userToAddId;
        })
      },
      () => {
        //  Test console.
        // console.log(this.state.userToAdd);
      }
    );
  };

  addUser = event => {
    event.preventDefault();

    // Test console.
    // console.log(this.state.userToAdd);
    // console.log(this.state.userToAdd[0]["user.user_id"]);

    if (this.state.userToAdd.length === 0) {
      return;
    }

    let userToSplice = this.state.userToAdd[0]["user_id"];
    // console.log(userToSplice);

    if (this.state.userToAdd[0]["user_id"] !== "") {
      this.setState(
        { usersAdded: this.state.usersAdded.concat(this.state.userToAdd) },
        () => {
          // Clears up the "userToAdd" state so clicking again the Add butto without having changed the dropdown menu (by selecting a new User) does not concatenate the previously added user once more.
          this.setState({ userToAdd: [] });

          // Test console.
          //   console.log(this.state.usersAdded);

          this.setState(
            {
              allUsers: this.state.allUsers.filter(user => {
                // Test console.
                // console.log(user["user_id"]);
                // console.log(userToSplice);
                return user.user_id !== userToSplice;
              })
            },
            () => {
              // Test console.
              //   console.log(this.state.allUsers);
            }
          );
        }
      );

      // Test console.
      // console.log(this.state.usersAdded);
    }
  };

  deleteUser = event => {
    event.preventDefault();

    //  Since it matters where the exact clicking was made, we made sure to add the "userid" attribute to the Button as well as to the Times Icon so we can retrieve it from either one of them.
    const userToDeleteId = parseInt(event.target.getAttribute("userid"));
    // Test console.
    // console.log(userToDeleteId);

    // This variable will create the user deleted from the "usersAdded" list to later contatenating it back (thus it needs to be an array) to the "projectUsers" list to render it as available for choosing again.
    let userToReturn = [];

    userToReturn = this.state.usersAdded.filter(user => {
      // Test console.
      // console.log(userToDeleteId);
      // console.log(user["user.user_id"]);
      return user.user_id === userToDeleteId;
    });

    // Test console.
    // console.log(userToReturn);

    this.setState(
      {
        allUsers: this.state.allUsers.concat(userToReturn)
      },
      () => {
        // Test console.
        // console.log(this.state.allUsers);
      }
    );

    this.setState(
      {
        usersAdded: this.state.usersAdded.filter(user => {
          return user.user_id !== userToDeleteId;
        })
      },
      () => {
        // Test console.
        // console.log(this.state.usersAdded);
      }
    );
  };

  saveNewProject = event => {
    // event.preventDefault();

    if (this.state.newProjName === "") {
      this.alertMessage("No Name");
    } else if (this.state.newProjDescription === "") {
      this.alertMessage("No Description");
    } else {
      let newProject;
      const { userId } = this.props;

      newProject = {
        name: this.state.newProjName,
        description: this.state.newProjDescription,
        project_users: JSON.stringify(
          this.state.usersAdded.map(user => {
            return user.user_id;
          })
        )
      };

      // Test console.
      //   console.log(newProject);

      //? Route for adding a Project.
      //> Endpoint at: "../../../routes/apiProject.js"
      axios
        .post(`/api/project/add/${userId}`, newProject)
        .then(data => {
          // Test console.
          // console.log(data.data);

          this.projectName.current.value = "";
          this.projectDesc.current.value = "";

          this.setState(
            {
              newProjName: "",
              newProjDescription: "",
              userToAdd: [],
              usersAdded: []
            },
            () => {
              //  Toggles the NewProjTaskModal.
              this.props.handleClose();
              //  Rerenders the ProjectCards to include the newly created one.
              this.props.renderForNewProjects();
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
          errorMessage: "Please type a Project Name"
        },
        () => this.showAlertMessage()
      );
    } else if (msg === "No Description") {
      return this.setState(
        {
          errorMessage: "Please type a Project Description"
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
    let usersToBeAdded;

    if (this.state.usersAdded.length > 0) {
      // console.log(this.state.usersAdded);
      usersToBeAdded = (
        <ul id="allUserList" className="list-group">
          {this.state.usersAdded.map(user => {
            return (
              <li
                key={user.user_id}
                className="taskUser list-group-item text-dark col-md-8 display-5"
                style={{
                  backgroundColor: "lightgrey",
                  lineHeight: 1,
                  padding: "5px"
                }}
              >
                <button
                  className="btn btn-danger pplus"
                  userid={user.user_id}
                  value={user.user_name}
                  onClick={this.deleteUser}
                  style={{
                    margin: 0,
                    marginRight: "5px",
                    display: "inline-block"
                  }}
                >
                  <i
                    className="fa fa-times-circle"
                    userid={user.user_id}
                    value={user.user_name}
                    aria-hidden="true"
                  ></i>
                </button>
                {user.user_name}
              </li>
            );
          })}
        </ul>
      );
    } else {
      usersToBeAdded = <ul id="allUserList" className="list-group"></ul>;
    }

    return (
      // +++++++++++++++++ NEW PROJECT MODAL +++++++++++++++++
      <Modal
        aria-labelledby="modal-dialog modal-xl"
        size="xl"
        show={this.props.show}
        tabIndex="-1"
        id="newProjectModal"
      >
        <Modal.Header className="text-white" style={{ fontSize: "14pt" }}>
          <p className="modal-title display-4">Add a new Project</p>
          <button
            type="button"
            className="close text-danger"
            data-dismiss="modal"
            aria-label="Close"
            onClick={this.wholeNewProjModalClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body id="newProjectModal-container">
          <form>
            <div
              className="form-group"
              style={{
                fontSize: "12pt"
              }}
            >
              <label htmlFor="projectName">
                <b className="display-5">Project Name:</b>
              </label>
              <input
                type="text"
                className="form-control display-5"
                id="projectName"
                placeholder="Project Name"
                ref={this.projectName}
                onChange={this.chgName}
              />
            </div>
            <div
              className="form-group"
              style={{
                fontSize: "12pt"
              }}
            >
              <label htmlFor="projectDesc">
                <b className="display-5">Project Description:</b>
              </label>
              <textarea
                type="text"
                className="form-control display-5"
                id="projectDesc"
                rows="3"
                ref={this.projectDesc}
                onChange={this.chgDescription}
              ></textarea>
            </div>
            <div
              className="form-group"
              style={{
                fontSize: "12pt"
              }}
            >
              {/* +++++++++++++++++ New Task Users added +++++++++++++++++ */}
              <label htmlFor="projectUsers">
                <b className="display-5">Add Users:</b>
              </label>
              <div className="row noMargin">
                <select
                  className="form-control col-md-6 usersAvailables display-5"
                  id="projectUsers"
                  type="list"
                  onChange={this.selectUserToAdd}
                  defaultValue="Default"
                >
                  <option value="Default" className="display-5">
                    Select User:
                  </option>
                  {this.state.allUsers.map(user => {
                    return (
                      <option
                        key={user.user_id}
                        className="allUsersArr display-5"
                        userid={user.user_id}
                        value={user.user_name}
                      >
                        {/* In JavaScript, any field accesible using the "." operator, is accessible using "[]" with a string version of the field name. */}
                        {user.user_name}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="btn btn-outline-success display-5"
                  id="addUser"
                  onClick={this.addUser}
                >
                  Add
                </button>
              </div>
              <p className="modal-title display-5">
                <b>Users Added:</b>
              </p>
              {/* +++++++++++++++++ to be filled +++++++++++++++++ */}
              {usersToBeAdded}
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
          <Alerts
            transition={"opacity 2s"}
            display={this.state.display}
            opacity={this.state.opacity}
            alert={this.state.errorMessage}
          ></Alerts>
          <button
            style={{
              margin: 0,
              marginTop: "1rem",
              float: "right"
            }}
            className="btn btn-outline-success display-5"
            id="projectModalAdd"
            data-dismiss="modal"
            onClick={this.saveNewProject}
          >
            Create Project
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewProjectModal;
