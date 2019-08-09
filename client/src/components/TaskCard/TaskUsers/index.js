// ================================== Packages Dependencies
import React, { Component } from "react";

// ================================== Files Dependencies
import "../style.css";

class TaskUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      
      // +++++++++++++++++ TASK USERS +++++++++++++++++
      <div className="card card-body bg-dark">
        <div class="row justify-content-center">
          <div class="col-sm-6">
        <ul>
          {this.props.allTaskUsers.map(user => {
            return (
              <li
                key={user.user_id}
                userid={user.user_id}
                className="taskUser list-group-item col-md-8"
                style={{ lineHeight: 1, padding: "5px", backgroundColor: "#6c757d", color: "white"}}
              >
                {user.user_name}
              </li>
            );
          })}
        </ul>
        </div>
        </div>
      </div>
    );
  }
}

export default TaskUsers;
