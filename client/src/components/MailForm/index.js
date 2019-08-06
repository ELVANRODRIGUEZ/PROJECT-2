import React, { Component } from "react";
import axios from "axios";
import API from "../../utils/API";
import "./style.css";

class MailForm extends Component {
  // constructor(props) {
  //   super(props);
  // }

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
      console.log(`From the Mail: `);
      console.log(this.props.taskUsers.map((u) => u.user_mail));
      //  This will show all the Task Users Ids including the logged user.
      // console.log(`From the Mail: ${this.props.taskUsersIds}`);
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    
    const mailSubject = document.getElementById("subject").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById('mailMessage').value;
    
    let mailData = {
      senderName: this.props.userName,
      senderEmail: this.props.userEmail,
      email: email,
      mailSubject: mailSubject,
      message: message,
      taskId: this.props.taskId
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
        <div className="col-sm-8 offset-sm-2">
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
                            <label htmlFor="mailMessage">Message</label>
                            <textarea type="text" className="form-control" rows="5" id="mailMessage"></textarea>
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
