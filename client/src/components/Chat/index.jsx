import React from "react";
import * as Scroll from 'react-scroll';
import API from "../../utils/API";
import Initials from "../Initials/initials";
// import io from "socket.io-client";

const Element = Scroll.Element;
const scroller = Scroll.scroller;

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
    if (this.props.showChatModal !== prevProps.showChatModal) {
      this.setState({
        message: ""
      });
    }
    this.scrollBottom();
  };

  UNSAFE_componentWillMount() {
    this.getMessages();

    const { socket } = this.props;

    socket.on("RECEIVE_MESSAGE", msg => {
      this.getMessages();
      
      //Test console.
      // console.log(
      // "+++++++++++++++++++++++++++++\nI, the client, am getting this 'msg' back from the Server:\n",
      // msg
      // );

      this.setState({ message: "" }, () => {
      });
    });
  }

  getMessages = () => {
    API.getSavedChats(this.props.taskId).then(res => {
      //  Test console.
      // console.log(res.data);

      this.setState({ messages: res.data }, () => {
        //  Test console.
        //console.log(this.state.messages);
        this.scrollBottom();
      });
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
        const { socket } = this.props;
        socket.emit("SEND_MESSAGE", {
          author: this.state.username,
          message: this.state.message,
          taskId: this.props.taskId
        });
      })
      .catch(err => {
        console.log(err);
      });

  };

  scrollBottom = () => {
    scroller.scrollTo(this.state.uniqueElementBottom, {
      duration: 100,
      delay: 10,
      smooth: true,
      containerId: this.state.uniqueConId
    });
  }

  componentWillUnmount() {

    this.setState({
      message: "",
      messages: [],
      uniqueConId: "scroll-container" + this.props.taskId,
      uniqueElementBottom:
        "scroll-container-second-element" + this.props.taskId,
      uniqueElementTop: "scroll-container-first-element" + this.props.taskId
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12" style={{ padding: "0" }}>
            <div className="card text-white bg-secondary">
              <div className="card-title text-center"></div>
              <div className="card-body" style={{ padding: ".25rem" }}>
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
                        style={{ padding: "0" }}
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
                          style={{
                            fontSize: "12pt"
                          }}
                        >
                          <p>
                            <span className="time_date">
                              {message.month}-{message.day} at {message.hours}:
                              {("0" + message.minutes).slice(-2)}
                            </span>{" "}
                            <span className="msg_author">{message.author}</span>
                            <span className="chat-message display-5">
                              {message.message}{" "}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <Element>
                    <p name={this.state.uniqueElementBottom}></p>
                  </Element>
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
