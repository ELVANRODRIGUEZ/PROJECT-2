import React, { Component } from 'react';
import API from "../../utils/API";


class MailRetrieve extends Component {
  state = {
    savedMails: [],
  };

  componentDidMount = () => {
    //parameter to search for mails now harcoded
    let taskId = "01";
    this.getSaved(taskId);

  };

  getSaved = (taskId) => {
    API.getSavedMails(taskId)
      .then(res => {
        this.setState({ savedMails: res.data })
        console.log(res.data)
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <div>
          {!this.state.savedMails.length ? (
            <h2 >No History Yet</h2>
          ) : (
              <div>
                <h2>Task Mail History</h2>
                {this.state.savedMails.map(mail => {
                  return (
                    <div key={mail._id}>
                      <p >
                        <strong>From:</strong> {mail.senderName + " <" + mail.senderEmail + "> "}{" "}
                      </p>
                      <p >
                        <strong>To:</strong> {mail.email}{" "}
                      </p>
                      <p >
                        <strong>Subject:</strong> {mail.mailSubject}{" "}
                      </p>
                      <p >
                        <strong>Message:</strong> {mail.message}{" "}
                      </p>
                      <hr />
                    </div>
                  );
                })
                }
              </div>
            )
          }
        </div>
      </>
    );
  };
};

export default MailRetrieve; 