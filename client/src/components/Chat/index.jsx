import React from "react";
import { Events, animateScroll as scroll, scroller } from "react-scroll";

// import io from "socket.io-client";
import API from "../../utils/API";
import Initials from "../Initials/initials";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.userName,
      message: "",
      messages: [],
      uniqueConId: "scroll-container" + this.props.taskId,
      uniqueElementBottom:
        "scroll-container-second-element" + this.props.taskId,
      uniqueElementTop: "scroll-container-first-element" + this.props.taskId
    };
  }

  componentDidUpdate = prevProps => {
    // this.scrollBottom()
    if (this.props.showChatModal !== prevProps.showChatModal) {
      this.setState({
        message: ""
      });
    }
    this.scrollBottom();

  };

  componentDidMount() {
    this.getMessages();

    const {socket} = this.props;

    socket.on("RECEIVE_MESSAGE", msg => {
      //Test console.
      // console.log(
        // "+++++++++++++++++++++++++++++\nI, the client, am getting this 'msg' back from the Server:\n",
        // msg
      // );

      this.setState({ message: "" }, () => {
        this.getMessages();
      });
    });
    Events.scrollEvent.register("begin", function() {
      // console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function() {
      // console.log("end", arguments);
    });
  }

  getMessages = () => {
    API.getSavedChats(this.props.taskId).then(res => {
      //  Test console.
      // console.log(res.data);

      this.setState({ messages: res.data }, () => {
        //  Test console.
        //console.log(this.state.messages);
      });
      this.scrollBottom();
      scroll.scrollToBottom();
    });
  };

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
    //Test console.
    // console.log("chat data ");
    // console.log(chatData);
    API.saveChat(chatData)
      .then(res => {
        //Test console.
        //   console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    const { socket } = this.props;
    socket.emit("SEND_MESSAGE", {
      author: this.state.username,
      message: this.state.message,
      taskId: this.props.taskId
    });

    this.getMessages();
  };

  scrollBottom() {
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register("end", () => {
        resolve();
        Events.scrollEvent.remove("end");
      });

      scroller.scrollTo(this.state.uniqueConId, {
        duration: 250,
        delay: 250,
        smooth: "easeInOutQuart"
      });
    });

    goToContainer.then(() =>
      scroller.scrollTo(this.state.uniqueElementBottom, {
        duration: 250,
        delay: 250,
        smooth: "easeInOutQuart",
        containerId: this.state.uniqueConId
      })
    );
  }

  // componentDidUnmount() {
  //   Events.scrollEvent.remove("begin");
  //   Events.scrollEvent.remove("end");
  // }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card text-white bg-secondary">
              <div className="card-title text-center"></div>
              <div className="card-body">
                <div id={this.state.uniqueConId} className="messages">
                  <p name={this.state.uniqueElementTop}></p>
                  {this.state.messages.map(message => {
                    return (
                      <div
                        key={message._id}
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
                            <strong>{message.author}</strong>:<br />
                            {message.message}{" "}
                            <span className="time_date">
                              Sent {message.day}/{message.month} at{" "}
                              {message.hours}:
                              {("0" + message.minutes).slice(-2)}
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <p name={this.state.uniqueElementBottom}></p>
                </div>
              </div>
              <div className="card-footer text-center">
                <br />
                <textarea
                  rows="4"
                  id="message"
                  type="text"
                  placeholder="Message"
                  className="form-control bg-dark"
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
