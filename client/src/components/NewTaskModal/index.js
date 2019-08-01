// ================================== Packages Dependencies
import React, { Component } from "react";
import Collapse from 'react-bootstrap/Collapse'
import axios from "axios";

// ================================== Files Dependencies


class NewTaskModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      stateMouseIcon: "context-menu"
    };

  }

  componentDidUpdate = (prevProps) => {
    // Test console.
    // console.log(this.state.projectUsers);
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

    event.preventDefault();

    let newTask;

    newTask = {
      description: this.state.newTaskDescription,
      deadline: this.state.newTaskDeadline,
      other_users: JSON.stringify(this.state.usersAdded.map(user => {
        return user["user.user_id"];
      }))
    };

    console.log(newTask);

    // axios
    //   .post("/api/task/add", categoryData)
    //   .then(data2 => {
    //     // Test console.
    //     // console.log(data2.data);

    //     axios
    //       .get("/members/info/" +
    //         this.state.projectSelected +
    //         "/category/" +
    //         this.state.categorySelected + "/all_tasks")
    //       .then(function (data3) {

    //         // console.log(data3.data);

    //       });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

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
                style={{ lineHeight: 1, padding: "5px" }}
              >
                <button
                  className='btn btn-dark pplus'
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

      <Collapse
        in={this.props.newTaskModalView}
        id="addTaskCollapsWindow"
        style={{ margin: "auto", width: "100vh" }}
      >
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">Add new Task</h5>
            <span
              aria-hidden="true"
              style={{ fontSize: "26px", lineHeight: "1", fontWeight: 600, cursor: this.state.stateMouseIcon }}
              onClick={this.props.newTaskModalToggle}
              onMouseOver={this.changeMouseIcon}
              onMouseOut={this.changeMouseIcon}

            >
              &times;
            </span>
          </div>
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
                    defaultValue="Select User"
                  >
                    <option selected>Select User:</option>
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
          <div className="modal-footer">
            <button 
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