import React from "react";
import io from "socket.io-client";
import API from "../../utils/API";
import Initials from "../Initials/initials";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.userName,
      message: "",
      messages: []
    };
    //this.socket = io.connect("/", {transports:['websocket'], upgrade: false}, {'force new connection': true})
    this.socket = io("/");

    API.getSavedChats(this.props.taskId).then(res => {
      //  Test console.
      // console.log(res.data);
      this.setState({ messages: res.data });
    });

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      API.getSavedChats(this.props.taskId).then(res => {
        //  Test console.
        // console.log(res.data);
        this.setState({ messages: res.data });
        //console.log(this.state.messages);
      });
      //console.log(data);
    };

    
  }

// authorOnChange = ev => {

// }

// messageOnChange = ev => {

// }

sendMessage = ev => {
    ev.preventDefault();
    const message = this.state.message;
    const author = this.state.username;
    const taskId = this.props.taskId;
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    let chatData = {
      author: author,
      message: message,
      taskId: taskId,
      day: day,
      month: month,
      hours: hours,
      minutes: minutes
    };
    //  Test console.
    //   console.log("chat data ");
    console.log(chatData);
    API.saveChat(chatData)
      .then(res => {
        //  Test console.
        //   console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    this.socket.emit("SEND_MESSAGE", {
      author: this.state.username,
      message: this.state.message,
      taskId: this.props.taskId
    });

    this.setState({ message: "" });
  };


  componentDidUpdate = prevProps => {
    if (this.props.taskUsersIds !== prevProps.taskUsersIds) {
      //  Test console.
      //  Selected Task Id.
      // console.log(`From the Chat: ${this.props.taskId}`);
      // //  Logged User Name.
      // console.log(`From the Chat: ${this.props.userName}`);
      //  This will show all the Task Users except for the logged user.
      // console.log("From the Chat:");
      // console.log(this.props.taskUsers);
      //  This will show all the Task Users Ids including the logged user.
      // console.log(`From the Chat: ${this.props.taskUsersIds}`);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Global Chat</div>
                <hr />
                <div className="messages">
                  {this.state.messages.map(message => {
                    return (
                      <div
                        className={
                          message.author !== this.props.userName
                            ? "received_withd_msg"
                            : "outgoing_msg"
                        }
                      >
                        {message.author !== this.props.userName ? (
                          <Initials className="avatar" name={message.author} />
                        ) : (
                          ""
                        )}
                        <div
                          className={
                            message.author !== this.props.userName
                              ? "received_msg"
                              : "sent_msg"
                          }
                        >
                          <p>
                            {message.author}: {message.message}{" "}
                            <span className="time_date">
                              Sent {message.day}/{message.month} at{" "}
                              {message.hours}:{message.minutes}
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card-footer">
                {/* <input
                  id="author"
                  type="text"
                  placeholder="Username"
                  value={this.props.userName}
                  onChange={ev => this.setState({ username: ev.target.value })}
                  className="form-control"
                /> */}


                <br />
                <textarea
                  rows="4"
                  id="message"
                  type="text"
                  placeholder="Message"
                  className="form-control"
                  value={this.state.message}
                  onChange={ev => this.setState({ message: ev.target.value })}
                />
                <br />
                <button
                  onClick={this.sendMessage}
                  className="btn btn-primary form-control"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
