// ================================== Packages Dependencies
import React, { Component } from "react";
import Collapse from 'react-bootstrap/Collapse'
import axios from "axios";

// ================================== Files Dependencies


class NewTaskModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTaskDescription: "",
      newTaskDeadline: "",
      userToAdd: {
        userId: "",
        userName: ""
      },
      usersAdded: []
    };
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
    const optionIndex = event.target.selectedIndex;
    //  Select the node (the whole Tag) given the index of a dropdown menu.
    const optionSelected = event.target.childNodes[optionIndex];
    const userToAddName = event.target.value;
    //  Select a Named Attribute of a given node (Tag). In this case, the Tag is the Option selected.
    const userToAddId = optionSelected.getAttribute("userid");

    if (userToAddId) {

      this.setState((prevState, props) => {
        return {
          userToAdd: {
            userId: userToAddId,
            userName: userToAddName
          }
        }
      });
    }

    // Test console.
    // console.log(this.state.userToAdd);
  }

  addUser = (event) => {

    event.preventDefault();

    // console.log(this.state.userToAdd);
    // console.log(this.state.usersAdded.length);


    this.setState({ usersAdded: this.state.usersAdded.concat([this.state.userToAdd]) },
      () => {

        // Test console.
        console.log(this.state.usersAdded);

      });


    // Test console.
    console.log(this.state.usersAdded);

  }

  render() {

    let usersToBeAdded;

    if (this.state.usersAdded.length > 0) {

      // console.log(this.state.usersAdded);
      usersToBeAdded =
        <ul id="taskUserList" className="list-group">
          {this.state.usersAdded.map((user) => {

            console.log(user);
            return (
                <li
                  key={user.userId}
                  className="taskUser list-group-item text-dark col-md-8"
                  userid={user.userId}
                >
                  {user.userName}
                </li>
            );
          })
          }
        </ul>
    } else {
      console.log("here");
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
            <span aria-hidden="true">&times;</span>
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
                    {/* <option selected>Select User</option> */}
                    {this.props.projectUsers.map((user) => {
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
                    onClick={this.addUser}
                  >
                    Add
                  </button>
                  <button
                    className="btn btn btn-outline-danger"
                    id="delTaskUser"
                  >
                    Delete
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
            <button className="btn btn-outline-success" id="addTask">
              Add task!
            </button>
          </div>
        </div>
      </Collapse >
    );
  }
}

export default NewTaskModal;