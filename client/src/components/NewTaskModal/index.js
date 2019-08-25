// ================================== Packages Dependencies
import React, { Component } from "react";
import Collapse from 'react-bootstrap/Collapse'
import axios from "axios";

// ================================== Files Dependencies


class NewTaskModal extends Component {
  constructor(props) {
    super(props);

    // States.
    this.state = {
      // Get the logged User's Id from the "props".
      userId: this.props.userId,
      // Gets whatever is typed on Description Text Area.
      newTaskDescription: "",
      // Gets whatever Date is chosen on Description Text Area.
      newTaskDeadline: "",
      // Capture the user selected from the dropdown menu and changes to whatever option is chosen from it. It is intended for always keeping one object value, but is an array for "concatenation" with the "usersAdded" array when the selected user is actually added.
      userToAdd: [],
      //  This state inherits the Project related Users born in the Members Component at ProjecCard clicking time and is passed before to the TaskModal component.
      projectUsers: this.props.projectUsers,
      // This array will keep all the Users added to be related to the New Task.
      usersAdded: [],
      // Sets the class for the mouse icon for the "over" event for the specified icons.
      stateMouseIcon: "context-menu",
      //  For Error Alert display control.
      display: "none",
      opacity: "0",
      errorMessage: ""
    };

    // Refs.
    this.NewTaskDesc = React.createRef();
    this.NewTaskDeadline = React.createRef();
  }

  componentDidUpdate = (prevProps) => {
    // Test console.
    // console.log(this.state.projectUsers);
    // console.log(this.state.userId);
  }

  newTaskModalToggle = () => {

    this.setState({
      newTaskDescription: "",
      newTaskDeadline: "",
      userToAdd: [],
      projectUsers: this.props.projectUsers,
      usersAdded: [],
    }, () => {
      this.NewTaskDesc.current.value = "";
      this.NewTaskDeadline.current.value = "";
      this.props.newTaskModalToggle();
    })

  }

  chgDescription = (event) => {

    const descValue = event.target.value;

    this.setState((prevState, props) => {
      return { newTaskDescription: descValue }
    });

  }

  chgDeadline = (event) => {

    const deadlineValue = event.target.value;

    this.setState((prevState, props) => {
      return { newTaskDeadline: deadlineValue }
    });

  }

  selectUserToAdd = (event) => {

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

    this.setState({
      userToAdd: this.state.projectUsers.filter(user => {
        return (user["user.user_id"] === userToAddId);
      })
    }, () => {
      //  Test console.
      // console.log(this.state.userToAdd);
    })

  }

  addUser = (event) => {

    event.preventDefault();

    // Test console.
    // console.log(this.state.userToAdd);
    // console.log(this.state.userToAdd[0]["user.user_id"]);

    if (this.state.userToAdd.length === 0) {
      return
    }

    let userToSplice = this.state.userToAdd[0]["user.user_id"];
    // console.log(userToSplice);

    if (this.state.userToAdd[0]["user.user_id"] !== "") {

      this.setState({ usersAdded: this.state.usersAdded.concat(this.state.userToAdd) },
        () => {

          // Clears up the "userToAdd" state so clicking again the Add butto without having changed the dropdown menu (by selecting a new User) does not concatenate the previously added user once more.
          this.setState({ userToAdd: [] });

          // Test console.
          // console.log(this.state.usersAdded);

          this.setState({
            projectUsers: this.state.projectUsers.filter((user) => {
              // Test console.
              // console.log(user["user.user_id"]);
              // console.log(userToSplice);
              return user["user.user_id"] !== userToSplice;
            })
          }, () => {
            // Test console.
            // console.log(this.state.projectUsers);
          })
        })

      // Test console.
      // console.log(this.state.usersAdded);

    }
  }

  deleteUser = (event) => {

    event.preventDefault();

    //  Since it matters where the exact clicking was made, we made sure to add the "userid" attribute to the Button as well as to the Times Icon so we can retrieve it from either one of them.
    const userToDeleteId = parseInt(event.target.getAttribute("userid"));
    // Test console.
    // console.log(userToDeleteId);

    // This variable will create the user deleted from the "usersAdded" list to later contatenating it back (thus it needs to be an array) to the "projectUsers" list to render it as available for choosing again.
    let userToReturn = [];

    userToReturn = this.state.usersAdded.filter((user) => {
      // Test console.
      // console.log(userToDeleteId);
      // console.log(user["user.user_id"]);
      return user["user.user_id"] === userToDeleteId;
    });

    // Test console.
    // console.log(userToReturn);

    this.setState({
      projectUsers: this.state.projectUsers.concat(userToReturn)
    }, () => {
      // Test console.
      console.log(this.state.projectUsers);
    })

    this.setState({
      usersAdded: this.state.usersAdded.filter((user) => {
        return user["user.user_id"] !== userToDeleteId;
      })
    },
      () => {
        // Test console.
        console.log(this.state.usersAdded);
      })

  }

  changeMouseIcon = () => {

    this.setState((prevState, props) => {
      if (prevState.stateMouseIcon === "context-menu") {
        return { stateMouseIcon: "pointer" }
      }
      else {
        return { stateMouseIcon: "context-menu" }
      }

    })

  }

  saveNewTask = (event) => {

    // event.preventDefault();

    if (this.state.newTaskDescription === "") {
      this.alertMessage("No Description")
    } else if (this.state.newTaskDeadline === "") {
      this.alertMessage("No Deadline")
    } else {

      let newTask;

      newTask = {
        description: this.state.newTaskDescription,
        deadline: this.state.newTaskDeadline,
        other_users: JSON.stringify(this.state.usersAdded.map(user => {
          return user["user.user_id"];
        }).concat([parseInt(this.state.userId)]))
      };

      // Test console.
      // console.log(newTask);

      axios
        .post(`/api/${this.props.projectSelected}/${this.props.categorySelected}/task/add`, newTask)
        .then(data => {
          // Test console.
          // console.log(data.data);

          this.NewTaskDesc.current.value = "";
          this.NewTaskDeadline.current.value = "";

          this.setState({
            newTaskDescription: "",
            newTaskDeadline: "",
            userToAdd: [],
            usersAdded: [],
          }, () => {
            //  Toggles the NewTaskModal.
            this.props.newTaskModalToggle();
            //  Rerenders the TaskCards to include the newly created one.
            this.props.renderForNewTasks();
          })

        })
        .catch(error => {
          console.log(error);
        });
    }


  }

  alertMessage = (msg) => {

    if (msg === "No Description") {
      ;
      return this.setState({
        errorMessage: "Please type a Task Description"
      },
        () => this.showAlertMessage());
    } else if (msg === "No Deadline") {
      return this.setState({
        errorMessage: "Please type a Task Deadline"
      },
        () => this.showAlertMessage());
    }

  }

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
  }

  render() {

    let usersToBeAdded;

    if (this.state.usersAdded.length > 0) {

      // console.log(this.state.usersAdded);
      usersToBeAdded =
        <ul id="taskUserList" className="list-group">
          {this.state.usersAdded.map((user) => {
            return (
              <li
                key={user["user.user_id"]}
                className="taskUser list-group-item text-dark col-md-8"
                style={{backgroundColor: "lightGrey",  lineHeight: 1, padding: "5px" }}
              >
                <button
                  className='btn btn-danger pplus'
                  userid={user["user.user_id"]}
                  value={user["user.user_name"]}
                  onClick={this.deleteUser}
                  style={{ margin: 0, marginRight: "5px", display: "inline-block" }}>
                  <i
                    className='fa fa-times-circle'
                    userid={user["user.user_id"]}
                    value={user["user.user_name"]}
                    aria-hidden='true'>
                  </i>
                </button>
                {user["user.user_name"]}
              </li>
            );
          })
          }
        </ul>
    } else {
      usersToBeAdded =
        <ul id="taskUserList" className="list-group">
        </ul>
    }


    return (
      // +++++++++++++++++ NEW TASK MODAL +++++++++++++++++
      <Collapse
        in={this.props.newTaskModalView}
        id="addTaskCollapsWindow"
        style={{ margin: "auto", width: "100vh" }}
      >
        <div className="modal-content bg-dark text-white">
          {/* +++++++++++++++++ HEADER +++++++++++++++++ */}
          <div className="modal-header">
            <h5 className="modal-title">Add new Task</h5>
            <span
              aria-hidden="true"
              style={{ fontSize: "26px", color:" darkred", textShadow: "lightgrey 0px 2px", lineHeight: "1", fontWeight: 600, cursor: this.state.stateMouseIcon }}
              onClick={this.newTaskModalToggle}
              onMouseOver={this.changeMouseIcon}
              onMouseOut={this.changeMouseIcon}
            >
              &times;
            </span>
          </div>
          {/* +++++++++++++++++ BODY +++++++++++++++++ */}
          <div className="card card-body bg-dark text-white">
            <form>
              {/* +++++++++++++++++ New Task Description +++++++++++++++++ */}
              <div className="form-group">
                <label htmlFor="projectDesc">New Task Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="taskDesc"
                  rows="3"
                  ref={this.NewTaskDesc}
                  onChange={this.chgDescription}
                ></textarea>
              </div>
              {/* +++++++++++++++++ New Task Deadline +++++++++++++++++ */}
              <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input
                  className="form-control"
                  type="date"
                  name="deadline"
                  id="taskDeadline"
                  ref={this.NewTaskDeadline}
                  onChange={this.chgDeadline}
                />
              </div>
              {/* +++++++++++++++++ New Task Users addition +++++++++++++++++ */}
              <div className="form-group">
                <label htmlFor="taskUsers">Add Users</label>
                <div className="row noMargin">
                  <select
                    className="form-control col-md-6 usersAvailables"
                    id="taskUsers"
                    type="list"
                    onChange={this.selectUserToAdd}
                    defaultValue="Default"
                  >
                    <option value="Default">Select User:</option>
                    {/* {console.log(this.state.projectUsers2)} */}
                    {this.state.projectUsers.map((user) => {
                      // console.log(user)
                      return (
                        <option
                          key={user["user.user_id"]}
                          className="taskUsersArr"
                          userid={user["user.user_id"]}
                          value={user["user.user_name"]}
                        >
                          {/* In JavaScript, any field accesible using the "." operator, is accessible using "[]" with a string version of the field name. */}
                          {user["user.user_name"]}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    className="btn btn-outline-success"
                    id="addTaskUser"
                    // userid={
                    //   this.state.userToAdd[0] ?
                    //   this.state.userToAdd[0]["user.user_id"] : -1
                    // }
                    onClick={this.addUser}
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* +++++++++++++++++ New Task Users added +++++++++++++++++ */}
              <h5 className="modal-title">Users Added: </h5>
              {/* +++++++++++++++++ to be filled +++++++++++++++++ */}
              {usersToBeAdded}
            </form>
          </div>
          {/* +++++++++++++++++ FOOTER +++++++++++++++++ */}
          <div
            className="modal-footer"
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
              id="newTaskAlert"
              className="alert alert-danger"
              role="alert"
            >
              <i className="fa fa-exclamation-circle"></i>
              <span className="msg">
                &nbsp; {this.state.errorMessage}
              </span>
            </div>
            <button
              style={{
                margin: 0,
                marginTop: "1rem",
                float: "right"
              }}
              className="btn btn-outline-success"
              id="addTask"
              onClick={this.saveNewTask}>
              Add task!
            </button>
          </div>
        </div>
      </Collapse >
    );
  }
}

export default NewTaskModal;