import React, { Component } from "react";
import Moment from "react-moment";
import "./style.css";

class MailRetrieve extends Component {
  state = {
    savedMails: this.props.savedMails
  };

  render() {
    let attachmentsArray = this.props.savedMails.map(mail => {
      // return mail.fileName.replace(/\["|"]|/g, '').replace('","', ', ');
      return mail.fileName
        .replace(/\[|\]|"/g, "")
        .replace(",", ", ")
        .split(",");
    });

    //Test console.
    // console.log(attachmentsArray);

    return (
      <>
        <div>
          {!this.props.savedMails.length ? (
            <div style={{ fontSize: "14pt" }}>
              <p className="display-4">No History Yet</p>
            </div>
          ) : (
            <div>
              {this.props.savedMails.map((mail, index) => {
                return (
                  <div
                    id="mailList"
                    key={mail._id}
                    style={{ fontSize: "12pt" }}
                  >
                    <p id="firstLine" className="display-5" style={{ margin: "0 0 5px 0" }}>
                      <strong style={{ display: "block" }}>Sent On: </strong>
                      <span style={{ marginLeft: "10px" }}>
                        <Moment format="DD, MMMM. YYYY HH:mm">
                          {mail.createdAt}
                        </Moment>
                      </span>
                    </p>
                    <p className="display-5"  style={{ margin: "0 0 5px 0" }}>
                      <strong style={{ display: "block" }}>From:</strong>
                      <span style={{ marginLeft: "10px" }}>
                        {mail.senderName + " <" + mail.senderEmail + "> "}{" "}
                      </span>
                    </p>
                    <p className="display-5"  style={{ margin: "0 0 5px 0" }}>
                      <strong style={{ display: "block" }}>To:</strong>
                      <span style={{ marginLeft: "10px" }}>{mail.email} </span>
                    </p>
                    <p className="display-5"  style={{ margin: "0 0 5px 0" }}>
                      <strong style={{ display: "block" }}>Subject:</strong>
                      <span style={{ marginLeft: "10px" }}>
                        {mail.mailSubject}{" "}
                      </span>
                    </p>
                    <p className="display-5"  style={{ margin: "0 0 5px 0" }}>
                      <strong style={{ display: "block" }}>Message:</strong>
                      <span style={{ marginLeft: "10px" }}>
                        {mail.message}{" "}
                      </span>
                    </p>
                    <p className="display-5"  style={{ margin: "0 0 0 0" }}>
                      <strong style={{ display: "block" }}>Attachments:</strong>
                    </p>
                    <ul className="display-5" style={{ marginLeft: "10px", padding:"0" }}>
                      {attachmentsArray[index].map((attachment, index) => {
                        return <li style={{
                          listStyleType:"disc",
                          listStylePosition:"inside"
                        }}
                        key={index}>{attachment}</li>;
                      })}
                    </ul>
                    <hr />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default MailRetrieve;
