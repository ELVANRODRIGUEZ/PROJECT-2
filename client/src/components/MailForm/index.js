import React, { Component } from "react";
import axios from "axios";
import API from "../../utils/API";
import "./style.css";

class MailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Select Users
      userId: this.props.userId,
      userToAdd: [],
      taskUsers: this.props.taskUsers,
      usersAdded: [],
      //File attach
      id: "fileUpload" + this.props.taskId,
      fileURI: [],
      fileName: [],
      buttonLabel: "Select File",
      //File attach Unique Ids
      emailsId: `emails-${this.props.taskId}`,
      emailsArr: [],
      subjectId: `mailMessage-${this.props.taskId}`,
      messageId: `message-${this.props.taskId}`,
      fileUploadID: `fileUpload-${this.props.taskId}`,
      formId: `formId-${this.props.taskId}`,
      // Alerts
      display: "none",
      opacity: "0",
      errorMessage: "",
      alertType: ""
    };
  }

  componentDidUpdate = prevProps => {
    if (this.props.showMailModal !== prevProps.showMailModal) {
      if (this.props.showMailModal) {
        document.getElementById(this.state.formId).reset();
        this.setState({
          fileURI: [],
          fileName: [],
          userToAdd: [],
          usersAdded: [],
          taskUsers: this.props.taskUsers,
          buttonLabel: "Select File"
        });
        if (this.props.taskUsersIds !== prevProps.taskUsersIds) {
          //  Test console.
          //  Selected Task Id.
          // console.log(`From the Mail: ${this.props.taskId}`);
          //  Logged User Name.
          // console.log(`From the Mail: ${this.props.userName}`);
          //  Logged User Email.
          // console.log(`From the Mail: ${this.props.userEmail}`);
          //  This will show all the Task Users except for the logged user.
          // console.log(`From the Mail: `);
          // console.log(this.props.taskUsers);
          // console.log(`From the Mail: `);
          // console.log(this.props.taskUsers.map((u) => u.user_mail));
          //  This will show all the Task Users Ids including the logged user.
          // console.log(`From the Mail: ${this.props.taskUsersIds}`);
          this.setState(
            {
              taskUsers: this.props.taskUsers
            },
            () => {
              //  Test console.
              //   console.log(this.state.taskUsers);
            }
          );
        }
      }
    }
  };

  selectuserToAdd = event => {
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
        userToAdd: this.state.taskUsers.filter(user => {
          return user.user_id === userToAddId;
        })
      },
      () => {
        //  Test console.
        // console.log(this.state.userToAdd);
      }
    );
  };

  adduserToAddList = event => {
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
        {
          usersAdded: this.state.usersAdded.concat(this.state.userToAdd)
        },
        () => {
          // Clears up the "userToAdd" state so clicking again the Add butto without having changed the dropdown menu (by selecting a new User) does not concatenate the previously added user once more.
          this.setState({ userToAdd: [] });
          // Test console.
          // console.log(this.state.usersAdded);

          this.setState(
            {
              emailsArr: this.state.usersAdded.map(email => {
                return email.user_mail;
              })
            },
            () => {
              // Test console.
              // console.log(this.state.emailsArr);
            }
          );

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
    const userToAddId = parseInt(event.target.getAttribute("userid"));
    // Test console.
    // console.log(userToAddId);

    // This variable will create the user deleted from the "usersAdded" list to later contatenating it back (thus it needs to be an array) to the "projectUsers" list to render it as available for choosing again.
    let userToReturn = [];

    userToReturn = this.state.usersAdded.filter(user => {
      // Test console.
      // console.log(userToAddId);
      // console.log(user["user.user_id"]);
      return user.user_id === userToAddId;
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
        usersAdded: this.state.usersAdded.filter(user => {
          return user.user_id !== userToAddId;
        })
      },
      () => {
        this.setState(
          {
            emailsArr: this.state.usersAdded.map(email => {
              return email.user_mail;
            })
          },
          () => {
            // Test console.
            // console.log(this.state.emailsArr);
          }
        );
      }
    );
  };

  alertMessage = msg => {
    if (msg === "Mail Sent") {
      return this.setState(
        {
          errorMessage: "Mail sent",
          alertType: "alert alert-success"
        },
        () => this.showAlertMessage()
      );
    }
    if (msg === "No email TO:") {
      return this.setState(
        {
          errorMessage: "Please select a user",
          alertType: "alert alert-danger"
        },
        () => this.showAlertMessage()
      );
    }
    if (msg === "No Subject") {
      return this.setState(
        {
          errorMessage: "Please type the Subject",
          alertType: "alert alert-danger"
        },
        () => this.showAlertMessage()
      );
    }

    if (msg === "No messagge") {
      return this.setState(
        {
          errorMessage: "Please type a message",
          alertType: "alert alert-danger"
        },
        () => this.showAlertMessage()
      );
    }
    if (msg === "mail sending error") {
      return this.setState(
        {
          errorMessage: "Sending error, try again",
          alertType: "alert alert-danger"
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

  readURI(e) {
    // console.log(e.target.files);

    if (e.target.files && e.target.files[0]) {
      let middle = [];
      Object.keys(e.target.files).forEach(item => {
        middle.push(e.target.files[item].name);
        //console.log(e.target.files[item].name);
        let reader = new FileReader();
        reader.onload = function(ev) {
          //console.log(ev.target.result)
          this.setState(
            { fileURI: this.state.fileURI.concat([ev.target.result]) },
            () => {
              //console.log(this.state.fileURI);
            }
          );
        }.bind(this);
        reader.readAsDataURL(e.target.files[item]);
      });

      this.setState({ fileName: middle }, () => {
        //console.log(this.state.fileName);
        const label = JSON.stringify(this.state.fileName);
        //console.log(label)
        this.setState({
          buttonLabel: label.replace(/\[|]|/g, "").replace(",", ", ")
        });
      });
    }
  }

  handleChange(e) {
    e.preventDefault();
    //const label = document.getElementById("fileUpload").value.replace(/([^\\]*\\)*/, '');
    // const label = this.state.fileName
    // this.setState({ buttonLabel: label })
    this.readURI(e);
    if (this.props.onChange !== undefined) this.props.onChange(e); // propagate to parent component
  }

  handleSubmit(event) {
    event.preventDefault();
    const fileTag = this.state.fileURI;
    const fileName = this.state.fileName;
    const mailSubject = document.getElementById(this.state.subjectId).value;
    const email = this.state.emailsArr.join(",");
    const message = document.getElementById(this.state.messageId).value;

    //Test console.
    // console.log(fileTag);
    // console.log(fileName);
    // console.log("users to mail are:\n" + email);

    if (email === "") {
      this.alertMessage("No email TO:");
    } else if (mailSubject === "") {
      this.alertMessage("No Subject");
    } else if (message === "") {
      this.alertMessage("No messagge");
    } else {
      let mailData;

      mailData = {
        senderName: this.props.userName,
        senderEmail: this.props.userEmail,
        //for testing porpouses email is harcoded, in production use:
        // email: email
        //see log to chechk the real variable
        //email: "manucastle@hotmail.com,mecastilloc@gmail.com,me_castillo@hotmail.com",
        email: email,
        mailSubject: mailSubject,
        message: message,
        taskId: this.props.taskId,
        fileUri: fileTag,
        fileName: fileName
      };
      //  Test console.
      // console.log(mailData);

      axios({
        method: "POST",
        url: "/send",
        data: mailData
      }).then(response => {
        //  Test console.
        console.log(response.data);
        if (response.data.msg === "success") {
          //Save mail
          //  Test console.
          // console.log(mailData);
          let mailMongo = {
            senderName: this.props.userName,
            senderEmail: this.props.userEmail,
            mailSubject: mailSubject,
            email: email,
            message: message,
            taskId: this.props.taskId,
            fileName: JSON.stringify(fileName)
          };
          API.saveMail(mailMongo)
            // .then(() => {
            //   //  Test console.
            //   // console.log("Mail Saved");
            // })
            .catch(err => {
              console.log(err);
            });
          this.alertMessage("Mail Sent");
          this.resetForm();
        } else if (response.data.msg === "fail") {
          this.alertMessage("mail sending error");
        }
      });
    }
  }

  resetForm = () => {
    document.getElementById(this.state.formId).reset();
    this.setState({
      userToAdd: [],
      usersAdded: [],
      taskUsers: this.props.taskUsers,
      buttonLabel: "Select File"
    });
  };

  render() {
    let usersToBeAdded;
    
    if (this.state.usersAdded.length > 0) {
      usersToBeAdded = (
        <ul id="notTaskUserList" className="list-group">
          {this.state.usersAdded.map(user => {
            return (
              <li
                key={user.user_id}
                className="userAdded taskUser list-group-item text-dark col-md-8 display-5"
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
                  onClick={this.delFromAddList}
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
      usersToBeAdded = <ul id="notTaskUserList" className="list-group"></ul>;
    }

    return (
      <div>
        <div className="col-sm-12" style={{ padding: "0" }}>
          <form id={this.state.formId}>
            {/* +++++++++++++++++ Users to e-mail +++++++++++++++++ */}
            <div
              className="form-group"
              style={{
                fontSize: "12pt"
              }}
            >
              <label htmlFor="projectDesc">
                <b className="display-5">Select Users to e-Mail:</b>
              </label>
              <div className="row noMargin">
                <select
                  className="form-control col-md-6 usersAvailables display-5"
                  id="taskUsers"
                  type="list"
                  onChange={this.selectuserToAdd}
                  defaultValue="Default"
                >
                  <option value="Select" className="display-5">
                    Select User:
                  </option>
                  {/* {console.log(this.state.projectUsers2)} */}
                  {this.state.taskUsers.map(user => {
                    // console.log(user)
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
                  onClick={this.adduserToAddList}
                >
                  Add
                </button>
              </div>
              {/* +++++++++++++++++ New Task Users added +++++++++++++++++ */}
              <p className="modal-title display-5">
                <b>Users to be e-mailed:</b>
              </p>
              {/* +++++++++++++++++ to be filled +++++++++++++++++ */}
              {usersToBeAdded}
            </div>
            {/* <div
              className="form-group email"
              style={{
                fontSize: "12pt"
              }}
            >
              <label htmlFor="taskUsers">
                  <b className="display-5">Other addresses:</b>
                </label>
              <input
                type="text"
                className="form-control"
                id={this.state.emailsId}
                aria-describedby="emailHelp"
              />
            </div> */}
            <div
              className="form-group subject"
              style={{
                fontSize: "12pt"
              }}
            >
              <label htmlFor="taskUsers">
                <b className="display-5">Subject:</b>
              </label>
              <input
                type="text"
                className="form-control display-5"
                id={this.state.subjectId}
              />
            </div>
            <div
              className="form-group message"
              style={{
                fontSize: "12pt"
              }}
            >
              <label htmlFor="taskUsers">
                <b className="display-5">Message:</b>
              </label>
              <textarea
                type="text"
                className="form-control display-5"
                rows="5"
                id={this.state.messageId}
              ></textarea>
            </div>
            <div className="form-group fileUpload">
              <label
                htmlFor={this.state.fileUploadID}
                className="btn btn-outline-success btn-sm display-5"
                style={{
                  margin: "0"
                }}
              >
                <i className="fa fa-arrow-circle-o-up"></i>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {!this.state.buttonLabel
                  ? "Select File"
                  : this.state.buttonLabel}
              </label>
              <input
                id={this.state.fileUploadID}
                type="file"
                onChange={this.handleChange.bind(this)}
                className="show-for-sr display-5"
                multiple="multiple"
              />
            </div>

            {/*! +++++++++++++++++ Error Dialog +++++++++++++++++ */}
            <div
              style={{
                transition: "opacity 2s",
                display: this.state.display,
                opacity: this.state.opacity,
                margin: 0
              }}
              id="newTaskAlert"
              className={this.state.alertType}
              role="alert"
            >
              <i className="fa fa-exclamation-circle"></i>
              <span className="msg">&nbsp; {this.state.errorMessage}</span>
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary display-5"
              onClick={this.handleSubmit.bind(this)}
              style={{
                margin: "0"
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default MailForm;
