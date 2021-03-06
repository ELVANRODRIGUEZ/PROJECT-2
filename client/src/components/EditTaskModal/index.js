// ================================== Packages Dependencies
import React, { Component } from "react";
import Collapse from "react-bootstrap/Collapse";
import axios from "axios";
import Alerts from "../Alerts";

// ================================== Files Dependencies

class EditTaskModal extends Component {
  constructor(props) {
    super(props);

    // States.
    this.state = {
      // Get the logged User's Id from the "props".
      userId: this.props.userId,
      // Gets whatever is typed on Description Text Area.
      newTaskDescription: this.props.taskDescription,
      // Gets whatever Date is chosen on Description Text Area.
      newTaskDeadline: this.props.taskDeadline,
      // Capture the user selected from the dropdown menu and changes to whatever option is chosen from it. It is intended for always keeping one object value, but is an array for "concatenation" with the "usersAdded" array when the selected user is actually added.
      userToAdd: [],
      // Capture the user selected from the dropdown menu and changes to whatever option is chosen from it. It is intended for always keeping one object value, but is an array for "concatenation" with the "usersDeleted" array when the selected user is actually added.
      userToDelete: [],
      //  This state inherits the Task related Users born in the TaskCard Component at TaskCard "didUpdate".
      taskUsers: this.props.taskUsers,
      //  This state inherits the Users that are not related to the Task but can be since thay are related to the Project. This is born in the TaskCard Component at TaskCard "didUpdate".
      notTaskUsers: this.props.notTaskUsers,
      // This array will keep all the Users added to be related to the New Task.
      usersAdded: [],
      // This array will keep all the Users to be deleted the Edited Task.
      usersDeleted: [],
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

  componentDidUpdate = prevProps => {
    // Test console.
    // console.log(this.props.taskUsers);
    // console.log(this.props.notTaskUsers);

    // We will evaulate changes on "this.props.notTaskUsers" that comes from the Task Card since it is the state that changes the latest, and only when "this.props.taskUsers" has effectively changed as well.
    if (this.props.notTaskUsers !== prevProps.notTaskUsers) {
      this.setState(
        {
          taskUsers: this.props.taskUsers,
          notTaskUsers: this.props.notTaskUsers
        },
        () => {
          //  Test console.
          //   console.log(this.state.taskUsers);
          // console.log(this.state.notTaskUsers);
        }
      );
    }
  };

  componentDidMount = prevProps => {
    // Test console.
    // console.log(this.props.taskDeadline);

    //  Set the Task Deadline as default date in the Edit Task Modal.
    this.taskDeadline(this.props.taskDeadline);
  };

  editTaskModalToggle = event => {
    //!  Although the following variable is not used here, I left it for referential purposes to remember that the "event" information needs to be assigned before using it in deeper or asynchronous functions since it cannot be brought about inside them as the parameter the function took in.
    // let taskToClose = event.target.getAttribute("task");
    //  Test console.
    // console.log(taskToClose);

    // Reseting States.
    this.setState(
      {
        newTaskDescription: this.props.taskDescription,
        // newTaskDeadline: this.props.taskDeadline,
        userToAdd: [],
        userToDelete: [],
        usersAdded: [],
        usersDeleted: []
      },
      () => {
        // Reassingning the Text Area vaule with the method "this.<<reference>>.current.value" to show the origninal Task Description.
        this.NewTaskDesc.current.value = this.props.taskDescription;

        // Runs the "taskDeadline" function to reformat the original Task Deadline.
        this.taskDeadline(this.props.taskDeadline);

        //  Runs the "editTaskModalToggle" from the TaskModal component (where is named "openTask") with a parameter of "0" so all the Task Edit Modals get closed.
        this.props.editTaskModalToggle(0);
        //  Rund the "getUsers" from the TaskCard component to retrieve the original Task Users and Task Not Users.
        this.props.getUsers();
      }
    );
  };

  chgDescription = event => {
    const descValue = event.target.value;

    this.setState((prevState, props) => {
      return { newTaskDescription: descValue };
    });
  };

  //  Set "this.state.newTaskDeadline" to the existing Task Deadline and show it in the Date Picker for prefill.
  taskDeadline = taskDeadline => {
    let date = new Date(taskDeadline);
    let day;
    let month;
    if (date.getDate().toString().length < 2) {
      day = `0${date.getDate()}`;
    } else {
      day = `${date.getDate()}`;
    }

    if (date.getMonth().toString().length < 2) {
      month = `0${date.getMonth() + 1}`;
    } else {
      month = `${date.getMonth() + 1}`;
    }

    let year = date.getFullYear();

    this.setState(
      {
        newTaskDeadline: `${year}-${month}-${day}`
      },
      () => {
        this.NewTaskDeadline.current.value = this.state.newTaskDeadline;

        // Test console.
        // console.log(this.props.taskDeadline);
        // console.log(this.state.newTaskDeadline);
      }
    );
  };

  chgDeadline = event => {
    const deadlineValue = event.target.value;

    this.setState((prevState, props) => {
      return { newTaskDeadline: deadlineValue };
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
        userToAdd: this.state.notTaskUsers.filter(user => {
          return user["user.user_id"] === userToAddId;
        })
      },
      () => {
        //  Test console.
        // console.log(this.state.userToAdd);
      }
    );
  };

  selectUserToDelete = event => {
    //  Select the index of the selected item in a dropdown menu.
    let optionIndex = event.target.selectedIndex;
    //  Test console.
    // console.log(optionIndex);

    //  Select the node (the whole Tag) given the index of a dropdown menu.
    let optionSelected = event.target.childNodes[optionIndex];
    //  Test console.
    // console.log(optionSelected);

    //  Select a Named Attribute (userid) of a given node (similar to HTML Tag). In this case, the node is the Option selected.
    let userToDeleteId = parseInt(optionSelected.getAttribute("userid"));

    this.setState(
      {
        userToDelete: this.state.taskUsers.filter(user => {
          return user.user_id === userToDeleteId;
        })
      },
      () => {
        //  Test console.
        // console.log(this.state.userToAdd);
      }
    );
  };

  addUserToAddList = event => {
    event.preventDefault();

    // Test console.
    // console.log(this.state.userToAdd);
    // console.log(this.state.userToAdd[0]["user.user_id"]);

    if (this.state.userToAdd.length === 0) {
      return;
    }

    let userToSplice = this.state.userToAdd[0]["user.user_id"];
    // console.log(userToSplice);

    if (this.state.userToAdd[0]["user.user_id"] !== "") {
      this.setState(
        { usersAdded: this.state.usersAdded.concat(this.state.userToAdd) },
        () => {
          // Clears up the "userToAdd" state so clicking again the Add butto without having changed the dropdown menu (by selecting a new User) does not concatenate the previously added user once more.
          this.setState({ userToAdd: [] });

          // Test console.
          // console.log(this.state.usersAdded);

          this.setState(
            {
              notTaskUsers: this.state.notTaskUsers.filter(user => {
                // Test console.
                // console.log(user["user.user_id"]);
                // console.log(userToSplice);
                return user["user.user_id"] !== userToSplice;
              })
            },
            () => {
              // Test console.
              // console.log(this.state.projectUsers);
            }
          );
        }
      );

      // Test console.
      // console.log(this.state.usersAdded);
    }
  };

  addUserToDeleteList = event => {
    event.preventDefault();

    // Test console.
    // console.log(this.state.userToAdd);
    // console.log(this.state.userToAdd[0]["user.user_id"]);

    if (this.state.userToDelete.length === 0) {
      return;
    }

    let userToSplice = this.state.userToDelete[0]["user_id"];
    // console.log(userToSplice);

    if (this.state.userToDelete[0]["user_id"] !== "") {
      this.setState(
        {
          usersDeleted: this.state.usersDeleted.concat(this.state.userToDelete)
        },
        () => {
          // Clears up the "userToAdd" state so clicking again the Add butto without having changed the dropdown menu (by selecting a new User) does not concatenate the previously added user once more.
          this.setState({ userToDelete: [] });

          // Test console.
          // console.log(this.state.usersAdded);

          this.setState(
            {
              taskUsers: this.state.taskUsers.filter(user => {
                // Test console.
                // console.log(user["user.user_id"]);
                // console.log(userToSplice);
                return user.user_id !== userToSplice;
              })
            },
            () => {
              // Test console.
              // console.log(this.state.projectUsers);
            }
          );
        }
      );

      // Test console.
      // console.log(this.state.usersAdded);
    }
  };

  delFromAddList = event => {
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
      return user["user.user_id"] === userToDeleteId;
    });

    // Test console.
    // console.log(userToReturn);

    this.setState(
      {
        notTaskUsers: this.state.notTaskUsers.concat(userToReturn)
      },
      () => {
        // Test console.
        // console.log(this.state.notTaskUsers);
      }
    );

    this.setState(
      {
        usersAdded: this.state.usersAdded.filter(user => {
          return user["user.user_id"] !== userToDeleteId;
        })
      },
      () => {
        // Test console.
        // console.log(this.state.usersAdded);
      }
    );
  };

  delFromDeleteList = event => {
    event.preventDefault();

    //  Since it matters where the exact clicking was made, we made sure to add the "userid" attribute to the Button as well as to the Times Icon so we can retrieve it from either one of them.
    const userToDeleteId = parseInt(event.target.getAttribute("userid"));
    // Test console.
    // console.log(userToDeleteId);

    // This variable will create the user deleted from the "usersAdded" list to later contatenating it back (thus it needs to be an array) to the "projectUsers" list to render it as available for choosing again.
    let userToReturn = [];

    userToReturn = this.state.usersDeleted.filter(user => {
      // Test console.
      // console.log(userToDeleteId);
      // console.log(user["user.user_id"]);
      return user.user_id === userToDeleteId;
    });

    // Test console.
    // console.log(userToReturn);

    this.setState(
      {
        taskUsers: this.state.taskUsers.concat(userToReturn)
      },
      () => {
        // Test console.
        // console.log(this.state.taskUsers);
      }
    );

    this.setState(
      {
        usersDeleted: this.state.usersDeleted.filter(user => {
          return user.user_id !== userToDeleteId;
        })
      },
      () => {
        // Test console.
        // console.log(this.state.usersDeleted);
      }
    );
  };

  changeMouseIcon = () => {
    this.setState((prevState, props) => {
      if (prevState.stateMouseIcon === "context-menu") {
        return { stateMouseIcon: "pointer" };
      } else {
        return { stateMouseIcon: "context-menu" };
      }
    });
  };

  updateTask = event => {
    // event.preventDefault();

    if (this.state.newTaskDescription === "") {
      this.alertMessage("No Description");
    } else if (this.state.newTaskDeadline === "") {
      this.alertMessage("No Deadline");
    } else {
      let editedTask;

      editedTask = {
        description: this.state.newTaskDescription,
        deadline: this.state.newTaskDeadline
      };

      // Test console.
      // console.log(newTask);

      //? Request to update the Task.
      //> Endpoint at: "../../../routes/apiTask.js"
      axios
        .put(`/api/task/update/taskInfo/${this.props.taskId}`, editedTask)
        .then(data => {
          // Test console.
          //   console.log(data.data);

          // Test whether there are users to Add to the Task.
          if (this.state.usersAdded.length > 0) {
            let newTaskResp;

            newTaskResp = this.state.usersAdded.map(user => {
              return {
                task_id: this.props.taskId.toString(),
                responsible: user.user_id.toString()
              };
            });

            //? Request to add Users to the Task.
            //> Endpoint at: "../../../routes/apiTask.js"
            axios
              .post(`/api/task/add/users`, newTaskResp)
              .then(data2 => {
                // Test console.
                // console.log(data2.data);

                //  Rerenders the TaskCards to include the editions.
                this.props.getUsers();
                // Reset states.
                this.setState({
                  userToAdd: [],
                  userToDelete: [],
                  usersAdded: [],
                  usersDeleted: []
                });
                //  Rerender for Edited Tasks.
                this.props.renderForEditedTasks();
              })
              .catch(error => {
                console.log(error);
              });
          }

          // Test whether there are users to Delete from the Task.
          if (this.state.usersDeleted.length > 0) {
            let taskRespToRemove;
            taskRespToRemove = this.state.usersDeleted.map(user => {
              return user.user_id.toString();
            });

            //? Route to delete Users from the Task (not the Task itself).
            //> Endpoint at: "../../../routes/apiTask.js"
            axios
              .delete(`/api/task/delete/users/${this.props.taskId}`, {
                data: { data: taskRespToRemove }
              })
              .then(data3 => {
                // Test console.
                // console.log(data3.data);

                //  Rerenders the TaskCards to include the editions.
                this.props.getUsers();
                // Reset states.
                this.setState({
                  userToAdd: [],
                  userToDelete: [],
                  usersAdded: [],
                  usersDeleted: []
                });
                //  Rerender for Edited Tasks.
                this.props.renderForEditedTasks();
              })
              .catch(error => {
                console.log(error);
              });
          }
          // Reset states.
          this.setState({
            userToAdd: [],
            userToDelete: []
          });
          //  Rerender for Edited Tasks.
          this.props.renderForEditedTasks();
          //  Toggles the EditTaskModal.
          this.props.editTaskModalToggle();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  alertMessage = msg => {
    if (msg === "No Description") {
      return this.setState(
        {
          errorMessage: "Please type a Task Description"
        },
        () => this.showAlertMessage()
      );
    } else if (msg === "No Deadline") {
      return this.setState(
        {
          errorMessage: "Please type a Task Deadline"
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
    let usersToBeDeleted;

    if (this.state.usersAdded.length > 0) {
      // console.log(this.state.usersAdded);
      usersToBeAdded = (
        <ul id="taskUserList" className="list-group">
          {this.state.usersAdded.map(user => {
            return (
              <li
                key={user["user.user_id"]}
                className="taskUser list-group-item text-dark col-md-8 display-5"
                style={{
                  backgroundColor: "lightgrey",
                  lineHeight: 1,
                  padding: "5px"
                }}
              >
                <button
                  className="btn btn-danger pplus"
                  userid={user["user.user_id"]}
                  value={user["user.user_name"]}
                  onClick={this.delFromAddList}
                  style={{
                    margin: 0,
                    marginRight: "5px",
                    display: "inline-block"
                  }}
                >
                  <i
                    className="fa fa-times-circle"
                    userid={user["user.user_id"]}
                    value={user["user.user_name"]}
                    aria-hidden="true"
                  ></i>
                </button>
                {user["user.user_name"]}
              </li>
            );
          })}
        </ul>
      );
    } else {
      usersToBeAdded = <ul id="taskUserList" className="list-group"></ul>;
    }

    if (this.state.usersDeleted.length > 0) {
      // console.log(this.state.usersAdded);
      usersToBeDeleted = (
        <ul id="notTaskUserList" className="list-group">
          {this.state.usersDeleted.map(user => {
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
                  onClick={this.delFromDeleteList}
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
      usersToBeDeleted = <ul id="notTaskUserList" className="list-group"></ul>;
    }

    return (
      <Collapse
        in={this.props.editTaskModalView}
        id={`editTask${this.props.taskId}`}
        style={{ margin: "auto", width: "100%" }}
      >
        <div className="modal-content bg-dark text-white">
          {/* +++++++++++++++++ HEADER +++++++++++++++++ */}
          <div className="modal-header" style={{ fontSize: "14pt" }}>
            <p className="modal-title display-4">{`Edit Task ${this.props.taskId}`}</p>
            <span
              aria-hidden="true"
              style={{
                fontSize: "26px",
                color: "darkred",
                textShadow: "0px 2px grey",
                lineHeight: "1",
                fontWeight: 500,
                cursor: this.state.stateMouseIcon
              }}
              task={this.props.taskId}
              onClick={this.editTaskModalToggle}
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
              <div
                className="form-group"
                style={{
                  fontSize: "12pt"
                }}
              >
                <label htmlFor="projectDesc">
                  <b className="display-5">New Task Description:</b>
                </label>
                <textarea
                  type="text"
                  className="form-control display-5"
                  id="taskDesc"
                  rows="3"
                  ref={this.NewTaskDesc}
                  onChange={this.chgDescription}
                  defaultValue={this.props.taskDescription}
                ></textarea>
              </div>
              {/* +++++++++++++++++ New Task Deadline +++++++++++++++++ */}
              <div
                className="form-group"
                style={{
                  fontSize: "12pt"
                }}
              >
                <label htmlFor="deadline">
                  <b className=" display-5">New Deadline:</b>
                </label>
                <input
                  className="form-control display-5"
                  type="date"
                  name="deadline"
                  id="taskDeadline"
                  ref={this.NewTaskDeadline}
                  onChange={this.chgDeadline}
                  //! Although in simple HTML, the attribute would be "value" for Default Value declaration, JSX does not work if "defaultValue" is not used for that purpose.
                  //* In this case, "defaultValue" could be not used for this input since its initial value is always set by the "taskDeadline" function. Is left here for referential purposes.
                  defaultValue={this.state.newTaskDeadline}
                ></input>
              </div>
              {/* +++++++++++++++++ New Task Users addition +++++++++++++++++ */}
              <div
                className="form-group"
                style={{
                  fontSize: "12pt"
                }}
              >
                <label htmlFor="notTaskUsers">
                  <b className="display-5">Add Users:</b>
                </label>
                <div className="row noMargin">
                  <select
                    className="form-control col-md-6 usersAvailables display-5"
                    id="notTaskUsers"
                    type="list"
                    onChange={this.selectUserToAdd}
                    defaultValue="Default"
                  >
                    <option value="Default" className="display-5">
                      Select User:
                    </option>
                    {this.state.notTaskUsers.map(user => {
                      return (
                        <option
                          key={user["user.user_id"]}
                          className="taskUsersArr display-5"
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
                    className="btn btn-outline-success display-5"
                    id="delFromAddList"
                    onClick={this.addUserToAddList}
                  >
                    Select
                  </button>
                </div>
                {/* +++++++++++++++++ New Task Users added +++++++++++++++++ */}
                <p className="modal-title display-5">
                  <b>Users to be Added:</b>
                </p>
                {/* +++++++++++++++++ to be filled +++++++++++++++++ */}
                {usersToBeAdded}
              </div>
              {/* +++++++++++++++++ New Task Users deletion +++++++++++++++++ */}
              <div
                className="form-group"
                style={{
                  fontSize: "12pt"
                }}
              >
                <label htmlFor="taskUsers">
                  <b className=" display-5">Delete Users:</b>
                </label>
                <div className="row noMargin">
                  <select
                    className="form-control col-md-6 usersAvailables display-5"
                    id="taskUsers"
                    type="list"
                    onChange={this.selectUserToDelete}
                    defaultValue="Default"
                  >
                    <option value="Default" className="display-5">
                      Select User:
                    </option>
                    {this.state.taskUsers.map(user => {
                      return (
                        <option
                          key={user.user_id}
                          className="taskUsersArr display-5"
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
                    id="delFromDelList"
                    onClick={this.addUserToDeleteList}
                  >
                    Select
                  </button>
                </div>
                {/* +++++++++++++++++ New Task Users added +++++++++++++++++ */}
                <p className="modal-title display-5">
                  <b>Users to be Deleted:</b>
                </p>
                {/* +++++++++++++++++ to be filled +++++++++++++++++ */}
                {usersToBeDeleted}
              </div>
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
              id="addTask"
              onClick={this.updateTask}
            >
              Accept Edition
            </button>
          </div>
        </div>
      </Collapse>
    );
  }
}

export default EditTaskModal;
