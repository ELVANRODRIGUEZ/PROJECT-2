import React from "react";
import io from "socket.io-client";
import API from "../../utils/API";
import Initials from "../Initials/initials";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.socket = io('localhost:5000');

        API.getSavedChats("Task2").then((res) => {
            console.log(res.data);
            this.setState({messages: res.data});})

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
          
                API.getSavedChats("Task2").then((res) => {
                    console.log(res.data);
                    this.setState({messages: res.data});
                    //console.log(this.state.messages);
                })
            //console.log(data);

        };

        this.sendMessage = ev => {
            ev.preventDefault();
            const message = document.getElementById('message').value;
            const author = document.getElementById('author').value;
            const task = "Task2";
            const day = new Date().getDate();
            const month = new Date().getMonth()+1;
            const hours = new Date().getHours();
            const minutes = new Date().getMinutes();
            let chatData={ 
                author: author,
                message: message,
                task: task,
                day: day,
                month: month,
                hours: hours,
                minutes : minutes
            }
            console.log("chat data ")
            console.log(chatData)
            API.saveChat(chatData)
                            .then((res) => {
                                console.log(res);
                            })
                            .catch(err => {
                                console.log(err);
                            });


            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
                                  
            this.setState({message: ''});
        }


    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div className={message.author !== "Nacho" ? ("received_withd_msg") : ("outgoing_msg")}>
                                            {message.author !== "Nacho" ? ( <Initials className="avatar" name={message.author} />) : ("")}                                
                                            <div className={message.author !== "Nacho" ? ("received_msg") : ("sent_msg")}>

                                            
                                        <p>{message.author}: {message.message} <span className="time_date">Sent {message.day}/{message.month} at {message.hours}:{message.minutes}</span> </p>                                          
                                        </div>
                                        </div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <input id="author"type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                                <br/>
                                <input id="message" type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;