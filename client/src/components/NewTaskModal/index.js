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
      userToAdd: [],
      // userToAdd: {
      //   user_id: "",
      //   user_name: ""
      // },
      projectUsers: this.props.projectUsers,
      usersAdded: [],
      usersSpliced: [],
      test: [],
      stateMouseIcon: "context-menu"
    };

  }

  componentDidUpdate = (prevProps) => {
    // console.log(prevProps.projectUsers);
    console.log(this.state.projectUsers);
    // if(prevProps.projectUsers !== this.props.projectUsers) {
    // Test console.
    // console.log(this.props.projectUsers);

    // this.setState({projectUsers:this.props.projectUsers}, () => {

    // Test console.
    // console.log(this.state.projectUsers);

    // })
    // }
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
    const optionIndex = event.target.selectedIndex;
    //  Select the node (the whole Tag) given the index of a dropdown menu.
    const optionSelected = event.target.childNodes[optionIndex];
    const userToAddName = event.target.value;
    //  Select a Named Attribute of a given node (Tag). In this case, the Tag is the Option selected.
    const userToAddId = parseInt(optionSelected.getAttribute("userid"));

    if (userToAddId) {
      // console.log("here!");
      this.setState({
        userToAdd: this.state.projectUsers.filter(user => {
          return (user["user.user_id"] === userToAddId);
        })
      }, () => {
        console.log(this.state.userToAdd);
      })
    }

    // if (userToAddId) {
    //   this.setState((prevState, props) => {
    //     return {
    //       userToAdd: {
    //         user_id: userToAddId,
    //         user_name: userToAddName
    //       }
    //     }
    //   });
    // }

  }

  addUser = (event) => {

    event.preventDefault();

    // Test console.
    // console.log(this.state.userToAdd);
    // console.log(this.state.userToAdd[0]["user.user_id"]);

    let userToSplice = this.state.userToAdd[0]["user.user_id"];
    // console.log(userToSplice);

    if (this.state.userToAdd[0]["user.user_id"] !== "") {

      this.setState({ usersAdded: this.state.usersAdded.concat(this.state.userToAdd) },
        () => {

          // Test console.
          console.log(this.state.usersAdded);

          this.setState({
            projectUsers: this.state.projectUsers.filter((user) => {
              // Test console.
              console.log(user["user.user_id"]);
              console.log(userToSplice);
              return user["user.user_id"] !== userToSplice;
            })
          }, () => {
            // Test console.
            console.log(this.state.projectUsers);
          })
        })

      // Test console.
      // console.log(this.state.usersAdded);

    }
  }

  deleteUser = (event) => {

    event.preventDefault();

    //  Since it matters where the exact clicking was made, we made sure to add the "userid" attribute to the Button as well as to the Times Icon so we can retrieve it from either one of them.
    const userToDeleteId = event.target.getAttribute("userid");
    // Test console.
    // console.log(userToDeleteId);

    const userToReturn = {
      "user.user_id": parseInt(userToDeleteId),
      "user.user_name": event.target.getAttribute("value")
    };
    // Test console.
    console.log(userToReturn);

    this.setState({
      projectUsers: this.state.projectUsers.concat([userToReturn])
    },
      () => {
        // Test console.
        console.log(this.state.projectUsers);
      })

    this.setState({
      usersAdded: this.state.usersAdded.filter((user) => {
        return user.user_id !== userToDeleteId;
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