import React, { Component } from "react";
import API from "../../utils/API";
import axios from "axios";

class MailForm extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate = prevProps => {
    if (this.props.taskUsersIds !== prevProps.taskUsersIds) {
      //  Test console.
      //  Selected Task Id.
      console.log(`From the Mail: ${this.props.taskId}`);
      //  Logged User Name.
      console.log(`From the Mail: ${this.props.userName}`);
      //  Logged User Email.
      console.log(`From the Mail: ${this.props.userEmail}`);
      //  This will show all the Task Users except for the logged user.
      console.log(`From the Mail: `);
      console.log(this.props.taskUsers);
      //  This will show all the Task Users Ids including the logged user.
      console.log(`From the Mail: ${this.props.taskUsersIds}`);
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    const mailSubject = document.getElementById("subject").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    let mailData = {
      senderName: "Harcoded now sender Name",
      senderEmail: "teamorganizer@outlook.com",
      email: email,
      mailSubject: mailSubject,
      message: message,
      taskId: "01"
    };

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
        alert("Message Sent.");

        this.resetForm();
      } else if (response.data.msg === "fail") {
        alert("Message failed to send.");
      }
    });
  }

  resetForm() {
    document.getElementById("contact-form").reset();
  }

  render() {
    return (
      <div>
        <div className="col-sm-4 offset-sm-4">
          <form
            id="contact-form"
            onSubmit={this.handleSubmit.bind(this)}
            method="POST"
          >
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" className="form-control" id="subject" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control"
                rows="5"
                id="message"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MailForm;
