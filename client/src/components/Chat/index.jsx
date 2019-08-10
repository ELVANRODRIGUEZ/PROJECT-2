import React from "react";
import { Events, animateScroll as scroll, scroller } from 'react-scroll'

import io from "socket.io-client";
import API from "../../utils/API";
import Initials from "../Initials/initials";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.userName,
      message: "",
      messages: [],
      uniqueConId: "scroll-container"+this.props.taskId,
      uniqueElementBottom: "scroll-container-second-element"+this.props.taskId,
      uniqueElementTop: "scroll-container-first-element"+this.props.taskId
    };

    // this.scrollToTop = this.scrollToTop.bind(this);
    //this.socket = io.connect("/", {transports:['websocket'], upgrade: false}, {'force new connection': true})
    this.socket = io("/");

    API.getSavedChats(this.props.taskId).then(res => {
      
      //  Test console.
      // console.log(res.data);
     
      this.setState({ messages: res.data })
      this.scrollBottom()
      scroll.scrollToBottom()
       
    });
    
    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
      
    });

    const addMessage = data => {
      API.getSavedChats(this.props.taskId).then(res => {
        //  Test console.
        // console.log(res.data);
        
        this.setState({ messages: res.data });
        this.scrollBottom()
        scroll.scrollToBottom()
        //console.log(this.state.messages);
      });
      //console.log(data);
      
    };

    
  }



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
    this.scrollBottom()
  };

  componentDidMount() {

    Events.scrollEvent.register('begin', function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function () {
      console.log("end", arguments);
    });
    
    
  
  }

  scrollBottom() {

    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });

      scroller.scrollTo(this.state.uniqueConId, {
        duration:250,
        delay: 250,
        smooth: 'easeInOutQuart'
      });

    });

    goToContainer.then(() =>
      scroller.scrollTo(this.state.uniqueElementBottom, {
        duration: 250,
        delay: 250,
        smooth: 'easeInOutQuart',
        containerId: this.state.uniqueConId
      }));
  }
//To next part
  // scrollTop() {

  //   let goToContainer = new Promise((resolve, reject) => {

  //     Events.scrollEvent.register('end', () => {
  //       resolve();
  //       Events.scrollEvent.remove('end');
  //     });

  //     scroller.scrollTo(this.state.uniqueConId, {
  //       duration: 200,
  //       delay: 200,
  //       smooth: 'easeInOutQuart'
  //     });

  //   });

  //   goToContainer.then(() =>
  //     scroller.scrollTo(this.state.uniqueElementTop, {
  //       duration: 200,
  //       delay: 200,
  //       smooth: 'easeInOutQuart',
  //       containerId: this.state.uniqueConId
  //     }));
  // }

  // scrollUp() {

  //   let goToContainer = new Promise((resolve, reject) => {

  //     Events.scrollEvent.register('end', () => {
  //       resolve();
  //       Events.scrollEvent.remove('end');
  //     });

  //     scroller.scrollTo(this.state.uniqueConId, {
  //       duration: 10,
  //       delay: 10,
  //       smooth: 'easeInOutQuart'
  //     });

  //   });

  //   goToContainer.then(() =>
  //   scroll.scrollMore({
  //       duration: 100,
  //       delay: 1,
  //       smooth: 'easeInOutQuart',
  //      // containerId: this.state.uniqueConId
  //     }));
  // }

  // scrollDown() {

  //   let goToContainer = new Promise((resolve, reject) => {

  //     Events.scrollEvent.register('end', () => {
  //       resolve();
  //       Events.scrollEvent.remove('end');
  //     });

  //     scroller.scrollTo(this.state.uniqueConId, {
  //       duration: 10,
  //       delay: 10,
  //       smooth: 'easeInOutQuart'
  //     });

  //   });

  //   goToContainer.then(() =>
  //   scroll.scrollMore(500)
  //     );
  // }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  componentWillUpdate(){
    this.scrollBottom();
  }

  render() {
    
    return (
      
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card text-white bg-secondary">
            <div className="card-title text-center">
            <h3 className="text-white">Task Chat</h3>
           </div>
            <hr />
              <div className="card-body">
                <div id={this.state.uniqueConId} className="messages">
               <p name={this.state.uniqueElementTop}></p>
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
                  <p name={this.state.uniqueElementBottom}></p>
                </div>
              </div>
              <div className="card-footer text-center">
              
                {/* <input
                  id="author"
                  type="text"
                  placeholder="Username"
                  value={this.props.userName}
                  onChange={ev => this.setState({ username: ev.target.value })}
                  className="form-control"
                /> */}
                {/* <div className="navButtons text-canter"> 
<button className="btn btn-outline-success btn-sm" to="test1" 
            onClick={() => this.scrollUp(-500)} ><i class="fa fa-arrow-circle-o-up"><span>Scroll Up</span></i></button>
            */}
            {/* <button className="btn btn-outline-warning btn-sm" to="test1" 
            onClick={() => this.scrollTop()} ><i class="fa fa-arrow-circle-o-up"><i class="fa fa-arrow-circle-o-up"></i><span>Top</span></i></button>
             */}
            {/* <button className="btn btn-outline-success btn-sm" to="test1" 
            onClick={() => this.scrollUp(500)} ><i class="fa fa-arrow-circle-o-down"><span>Scroll</span></i></button>
            </div> */}
            
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
