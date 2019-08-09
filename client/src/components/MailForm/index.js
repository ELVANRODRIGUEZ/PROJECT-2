import React, { Component } from "react";
import axios from "axios";
import API from "../../utils/API";
import "./style.css";

class MailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      userToAdd: [],
      taskUsers: this.props.taskUsers,
      usersAdded: [],
      id: "fileUpload",
      fileURI: null,
      fileName: null,
      display: "none",
      opacity: "0",
      errorMessage: "",
      alertType: ""
    };
  }

  componentDidUpdate = prevProps => {
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
          //   console.log(this.state.notTaskUsers);
        }
      );
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
          console.log(this.state.usersAdded);

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
    console.log(userToAddId);

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
        console.log(this.state.taskUsers);
      }
    );
    this.setState(state => ({
      usersAdded: state.usersAdded.filter(user => {
        return user.user_id !== userToAddId;
      })
    }));

    // this.setState(
    //   {
    //     usersAdded: this.state.usersAdded.filter(user => {
    //       return user.user_id !== userToAddId;
    //     })

    // },
    // () => {
    //   // Test console.
    //   // console.log("usersAdded"+ this.state.usersAdded.map((u) => u.user_mail));
    //   // console.log("usersToMail"+ this.state.usersToMail);
    // }
    // );
    // this.setState({ usersToMail: this.state.usersAdded});
    console.log(JSON.stringify(this.state.usersAdded));
  };

  ////
  //   this.alertMessage("No Subject");
  // } else if (email === "") {
  //   this.alertMessage("No email TO:");
  // }else if (message === "") {
  //     this.alertMessage("No messagge");
  ///
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
    if (msg === "mail error") {
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

  buildFileTag() {
    //console.log (this.state.fileURI)
    let fileTag = null;
    if (this.state.fileURI !== null)
      fileTag = this.state.fileURI

    return fileTag;
  }

  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        //   console.log(ev.target.result)
        this.setState({ fileURI: ev.target.result });
      }.bind(this);
      this.setState({ fileName: e.target.files[0].name })
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.readURI(e); // maybe call this with webworker or async library?
    if (this.props.onChange !== undefined)
      this.props.onChange(e); // propagate to parent component
  }



  handleSubmit(event) {
    event.preventDefault();
    console.log("cualquiera");
    // console.log("users aded\n"+this.state.usersAdded)
    const fileTag = this.buildFileTag();
    const fileName = this.state.fileName;
    const mailSubject = document.getElementById("subject").value;
    const email = document.getElementById("email").value;
    // const email = this.state.usersAdded.map((u) => u.user_mail);
    const message = document.getElementById("mailMessage").value;
    console.log("userstomail are:\n" + email);

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
      console.log(mailData);
      axios({
        method: "POST",
        url: "/send",
        data: mailData
      }).then(response => {
        //  Test console.
        //   console.log(response.data);
        if (response.data.msg === "success") {
          //Save mail
          //  Test console.
          // console.log(mailData);
          API.saveMail(mailData)
            .then(() => {
              //  Test console.
              // console.log("Mail Saved");
            })
            .catch(err => {
              console.log(err);
            });
          this.alertMessage("Mail Sent");

          this.resetForm();
        } else if (response.data.msg === "fail") {
          this.alertMessage("mail error");
        }
      });
    }
  }

  resetForm = () => {
    document.getElementById("contact-form").reset();
    this.setState({
      userToAdd: [],
      usersAdded: [],
      taskUsers: this.props.taskUsers
    });
  };

  render() {
    let usersToBeAdded;

    if (this.state.usersAdded.length > 0) {
      // console.log(this.state.usersAdded);
      usersToBeAdded = (
        <ul id="notTaskUserList" className="list-group">
          {this.state.usersAdded.map(user => {
            return (
              <li
                key={user.user_id}
                className="taskUser list-group-item text-dark col-md-8"
                style={{ lineHeight: 1, padding: "5px" }}
              >
                <button
                  className="btn btn-dark pplus"
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
        <div className="col-sm-8 offset-sm-2">
          {/* <form
            id="contact-form"
            onSubmit={this.handleSubmit.bind(this)}
            method="POST"
          > */}
          <form id="contact-form" >
            {/* +++++++++++++++++ New Task Users deletion +++++++++++++++++ */}
            <label htmlFor="taskUsers">Select Users To eMail</label>
            <div className="row noMargin">
              <select
                className="form-control col-md-6 usersAvailables"
                id="taskUsers"
                type="list"
                onChange={this.selectuserToAdd}
                defaultValue="Select User"
              >
                <option selected>Select User:</option>
                {/* {console.log(this.state.projectUsers2)} */}
                {this.state.taskUsers.map(user => {
                  // console.log(user)
                  return (
                    <option
                      key={user.user_id}
                      className="taskUsersArr"
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
                className="btn btn-outline-success"
                id="delFromDelList"
                onClick={this.adduserToAddList}
              >
                Add User
              </button>
            </div>
            {/* +++++++++++++++++ New Task Users added +++++++++++++++++ */}
            <h5 className="modal-title">Users to be eMailed: </h5>
            {/* +++++++++++++++++ to be filled +++++++++++++++++ */}
            {usersToBeAdded}

            <div style={{ display: "none" }} className="form-group">
              {/* <div className="form-group"> */}
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="text"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                value={this.state.usersAdded.map((u) => u.user_mail)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" className="form-control" id="subject" />
            </div>
            <div className="form-group">
              <label htmlFor="mailMessage">Message</label>
              <textarea
                type="text"
                className="form-control"
                rows="5"
                id="mailMessage"
              ></textarea>
            </div>
            <div className="form-group">
              <label
                htmlFor={this.state.id}
              //className="button"
              >

              </label>
              <input
                id={this.state.id}
                type="file"
                onChange={this.handleChange.bind(this)}
                className="show-for-sr" />
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

           

            {/* <button type="submit" className="btn btn-primary">
              Submit
            </button> */}
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
export default MailForm;
