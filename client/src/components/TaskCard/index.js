// ================================== Packages Dependencies
import React, { Component } from "react";
//import Moment from "react-moment";
import axios from "axios";

// ================================== Files Dependencies
import MailForm from "../MailForm";
import MailRetrieve from "../MailRetrieve";
import EditTaskModal from "../EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal";
import TaskInfo from "./TaskInfo";
import TaskUsers from "./TaskUsers";
import Chat from "../Chat";
import API from "../../utils/API";
import "./style.css";

class TaskCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //  This stores the available Users for deletion that will be rendered in the dropdown list. This will not include the logged user.
      taskUsers: [],
      //  This stores all the users including the logged user.
      allTaskUsers: [],
      taskUsersIds: [],
      notTaskUsers: [],
      savedMails: [],
      // For toggling the Tabs.
      usersHide: false,
      chatHide: false,
      mailFormHide: false,
      mailHistoryHide: false
    };
  }

  UNSAFE_componentWillMount = prevProps => {
    //  Test console.
    // console.log(this.props.projectUsers);
    // console.log("TaskCard mounted");

    this.getUsers();
  };

  componentWillUnmount () {
    this.setState({
      taskUsers: [],
      allTaskUsers: [],
      taskUsersIds: [],
      notTaskUsers: [],
      savedMails: [],
      usersHide: false,
      chatHide: false,
      mailFormHide: false,
      mailHistoryHide: false
    })
  }

  getUsers = (params, callback) => {
    //? Route to get the Users related to a Task with the logged User filtered out.
    //> Endpoint at: "../../../routes/apiTask.js"
    axios
      .get(
        `/api/task/get/users_rel_to_taks/${this.props.userId}/${this.props.taskId}`
      )
      .then(users => {
        //  Test console.
        // console.log(users.data);

        this.setState({ taskUsers: users.data }, () => {
          //  Test console.
          // console.log(this.state.taskUsers);

          let loggedUser = [
            {
              user_id: this.props.userId,
              user_name: this.props.userName,
              user_mail: this.props.userEmail
            }
          ];

          this.setState(
            {
              taskUsersIds: this.state.taskUsers
                .map(user => {
                  return user.user_id;
                })
                .concat([this.props.userId]),
              allTaskUsers: loggedUser.concat(
                this.state.taskUsers.map(user => {
                  return user;
                })
              )
            },
            () => {
              const {taskUsersIds} = this.state;
              const {projectUsers} = this.props;

              //  Test console.
              // console.log(this.state.taskUsersIds);
              // console.log(this.state.allTaskUsers);
              // console.log(projectUsers);
              // console.log(taskUsersIds);
              
              this.setState({notTaskUsers: projectUsers.filter(user => {
                return taskUsersIds.indexOf(parseInt(user.user_id)) === -1
              })}, () => {
                //  Test console.
                // console.log(this.state.notTaskUsers);
              });
            }
          );
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getSavedMails = taskId => {
    API.getSavedMails(taskId)
      .then(res => {
        // Test console.
        this.setState({ savedMails: res.data });
        //console.log("saved mails\n" + this.state.savedMails);
      })
      .catch(err => console.log(err));
  };

  // Toggles the Edit Task Modal and the Erase Task Modal accordingly.
  editTaskModalToggle = event => {
    const target = event.target;
    let task = parseInt(target.getAttribute("task"));
    if (this.props.taskOpened === task) {
      this.props.openTask(0 , 0);
    } else {
      this.props.openTask(task, 0);
    }
  };

  // Toggles the Erase Task Modal and the Edit Task Modal accordingly.
  eraseTaskModalToggle = event => {
    const target = event.target;
    let task = parseInt(target.getAttribute("task"));
    // console.log(this.props.eraseTaskOpened);
    if (this.props.eraseTaskOpened === task) {
      this.props.openTask(0, 0);
    } else {
      this.props.openTask(0, task);
      // console.log(this.props.eraseTaskOpened);
    }
  };

  toggleUsers = () => {
    this.setState({ usersHide: !this.state.usersHide });
    if (
      this.state.chatHide ||
      this.state.mailFormHide ||
      this.state.mailHistoryHide
    ) {
      this.setState({ chatHide: false });
      this.setState({ mailFormHide: false });
      this.setState({ mailHistoryHide: false });
    }
  };

  toggleChat = () => {
    this.setState({ chatHide: !this.state.chatHide });
    if (
      this.state.usersHide ||
      this.state.mailFormHide ||
      this.state.mailHistoryHide
    ) {
      this.setState({ usersHide: false });
      this.setState({ mailFormHide: false });
      this.setState({ mailHistoryHide: false });
    }
  };

  toggleMailForm = () => {
    this.setState({ mailFormHide: !this.state.mailFormHide });
    if (
      this.state.usersHide ||
      this.state.chatHide ||
      this.state.mailHistoryHide
    ) {
      this.setState({ usersHide: false });
      this.setState({ chatHide: false });
      this.setState({ mailHistoryHide: false });
    }
  };

  toggleMailHistory = () => {
    this.setState({ mailHistoryHide: !this.state.mailHistoryHide });
    this.getSavedMails(this.props.taskId);

    if (
      this.state.usersHide ||
      this.state.chatHide ||
      this.state.mailFormHide
    ) {
      this.setState({ usersHide: false });
      this.setState({ chatHide: false });
      this.setState({ mailFormHide: false });
    }
  };

  render() {
    return (
      // +++++++++++++++++ TASK CARD +++++++++++++++++
      <div
        className="card bg-secondary text-white task"
        style={{ marginBottom: "5px" }}
      >
        <div className="card-body taskCard-cardBody">
          {/* Erase Task Button */}
          <button
            className="btn btn-secondary"
            data-toggle="collapse"
            task={this.props.taskId}
            aria-expanded="false"
            style={{ float: "right", margin: "0 2px" }}
            onClick={this.eraseTaskModalToggle}
          >
            <i
              className="fa fa-trash-o fa-4"
              task={this.props.taskId}
              aria-hidden="true"
            ></i>
          </button>

          {/* Edit Task Button */}
          <button
            className="btn btn-secondary editTaskButton"
            data-toggle="collapse"
            task={this.props.taskId}
            aria-expanded="false"
            style={{ float: "right", margin: "0 2px" }}
            onClick={this.editTaskModalToggle}
          >
            <i
              className="fa fa-pencil fa-4"
              task={this.props.taskId}
              aria-hidden="true"
            ></i>
          </button>

          {/* +++++++++++++++++ ERASE TASK MODAL +++++++++++++++++ */}
          <DeleteTaskModal
            eraseTaskModalView={this.props.eraseTaskModalShow}
            userId={this.props.userId}
            taskId={this.props.taskId}
            renderForNewTasks={this.props.renderForNewTasks}
          ></DeleteTaskModal>

          {/* +++++++++++++++++ EDIT TASK MODAL +++++++++++++++++ */}
          <EditTaskModal
            editTaskModalView={this.props.editTaskModalShow}
            editTaskModalToggle={this.props.openTask}
            renderForEditedTasks={this.props.renderForEditedTasks}
            taskId={this.props.taskId}
            projectUsers={this.props.projectUsers}
            userId={this.props.userId}
            taskUsers={this.state.taskUsers}
            notTaskUsers={this.state.notTaskUsers}
            taskDescription={this.props.taskDescription}
            taskDeadline={this.props.taskDeadline}
            getUsers={this.getUsers}
          ></EditTaskModal>

          {/* +++++++++++++++++ TASK INFO +++++++++++++++++ */}
          <TaskInfo
            taskId={this.props.taskId}
            taskDeadline={this.props.taskDeadline}
            taskDescription={this.props.taskDescription}
          ></TaskInfo>

          {/* +++++++++++++++++ TASK CONVERSATION +++++++++++++++++ */}
          <div className="card bg-dark text-white task">
            <div className="card-body taskInfo-cardBody">
              <ul className="nav nav-tabs nav-pills card-title">
                <li className="nav-item task-conversation-tags">
                  <a
                    className="nav-link"
                    data-toggle="collapse"
                    href={`#multiCollapseExample1-${this.props.taskId}`}
                    role="button"
                    onClick={this.toggleUsers}
                    style={{
                      fontSize: "12pt"
                    }}
                  >
                    <p
                      className="display-5"
                      style={{
                        margin: "0px"
                      }}
                    >
                      <strong>Users</strong>
                    </p>
                  </a>
                </li>
                <li className="nav-item task-conversation-tags">
                  <a
                    className="nav-link"
                    data-toggle="collapse"
                    href={`#multiCollapseExample2-${this.props.taskId}`}
                    role="button"
                    onClick={this.toggleChat}
                    style={{
                      fontSize: "12pt"
                    }}
                  >
                    <p
                      className="display-5"
                      style={{
                        margin: "0px"
                      }}
                    >
                      <strong>Chat</strong>
                    </p>
                  </a>
                </li>
                <li className="nav-item task-conversation-tags">
                  <a
                    className="nav-link"
                    data-toggle="collapse"
                    href={`#multiCollapseExample3-${this.props.taskId}`}
                    role="button"
                    onClick={this.toggleMailForm}
                    style={{
                      fontSize: "12pt"
                    }}
                  >
                    <p
                      className="display-5"
                      style={{
                        margin: "0px"
                      }}
                    >
                      <strong>New Email</strong>
                    </p>
                  </a>
                </li>
                <li className="nav-item task-conversation-tags">
                  <a
                    className="nav-link"
                    data-toggle="collapse"
                    href={`#multiCollapseExample4-${this.props.taskId}`}
                    role="button"
                    onClick={this.toggleMailHistory}
                    style={{
                      fontSize: "12pt"
                    }}
                  >
                    <p
                      className="display-5"
                      style={{
                        margin: "0px"
                      }}
                    >
                      <strong>Email History</strong>
                    </p>
                  </a>
                </li>
              </ul>
              {/* ---- Task Users------ */}
              <div
                className={"hide-" + this.state.usersHide}
                id={`multiCollapseExample1-${this.props.taskId}`}
              >
                <TaskUsers allTaskUsers={this.state.allTaskUsers}></TaskUsers>
              </div>

              {/* ---- Chat Form------ */}
              <div
                className={"hide-" + this.state.chatHide}
                id={`multiCollapseExample2-${this.props.taskId}`}
              >
                <Chat
                  showChatModal={this.state.chatHide}
                  taskId={this.props.taskId}
                  userName={this.props.userName}
                  socket={this.props.socket}
                />
              </div>

              {/* ----email Form------ */}
              <div
                className={"hide-" + this.state.mailFormHide}
                id={`multiCollapseExample3-${this.props.taskId}`}
              >
                <div className="card card-body bg-dark">
                  <div className="container" style={{ padding: "0" }}>
                    <MailForm
                      showMailModal={this.state.mailFormHide}
                      taskId={this.props.taskId}
                      userName={this.props.userName}
                      userEmail={this.props.userEmail}
                      taskUsers={this.state.taskUsers}
                      taskUsersIds={this.state.taskUsersIds}
                    />
                  </div>
                </div>
              </div>

              {/* ----email retrieve---- */}
              <div
                className={"hide-" + this.state.mailHistoryHide}
                id={`multiCollapseExample4-${this.props.taskId}`}
              >
                <div className="card card-body bg-dark">
                  <div className="container" style={{ padding: "0" }}>
                    <div className="list-group">
                      <MailRetrieve savedMails={this.state.savedMails} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskCard;
