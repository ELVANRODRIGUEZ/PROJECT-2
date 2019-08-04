<div
            className="collapse editTaskCollapse"
            id={`editTask${this.props.taskId}`}
            task={this.props.taskId}
          >
            <div
              className="card card-body bg-dark"
              style={{ clear: "both", padding: "0px" }}
            >
              {/* Edited Task Header */}
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
              </div>
              <br />
              <form>
                {/* Edited Task Description */}
                <div className="form-group col-md-12">
                  <label for={`editTask${this.props.taskId}Description`}>
                    Change Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id={`editTask${this.props.taskId}Description`}
                    rows="2"
                  ></textarea>
                </div>
                <div className="form-group col-md-12">
                  <label for="editTaskdeadline">Deadline</label>
                  <input
                    className="form-control"
                    type="date"
                    name="editTaskdeadline"
                    id={`editTask${this.props.taskId}Deadline`}
                  />
                </div>
                {/* Edited Task Users addition */}
                <div className="form-group col-md-8">
                  <label for={`task${this.props.taskId}Users`}>Add Users</label>
                  <div className="row noMargin">
                    <select
                      className="form-control col-md-8 usersAvailables"
                      id={`task${this.props.taskId}Users`}
                      type="list"
                    ></select>
                    <button
                      className="btn taskAddTskUserAdd btn-outline-success"
                      task={this.props.taskId}
                    >
                      Add
                    </button>
                    <button
                      className="btn taskAddTskUserDel btn-outline-danger"
                      task={this.props.taskId}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {/* Edited Task Users added */}
                <div className="form-group col-md-8">
                  <h5 className="modal-title">Users Added: </h5>
                  <ul
                    id={`task${this.props.taskId}UserList`}
                    className="list-group taskUsersAddList"
                    task={this.props.taskId}
                  >
                    {/* to be filled */}
                  </ul>
                </div>
                {/* Delete Task Users */}
                <div className="form-group col-md-8">
                  <label for={`task${this.props.TaskId}UsersDel`}>
                    Delete Users
                  </label>
                  <div className="row noMargin">
                    <select
                      className="form-control col-md-8 usersAvailables"
                      id={`task${this.props.TaskId}UsersDel`}
                      type="list"
                    ></select>
                    <button
                      className="btn taskDelTskUserAdd btn-outline-success"
                      task={this.props.TaskId}
                    >
                      Add
                    </button>
                    <button
                      className="btn taskDelTskUserDel btn-outline-danger"
                      task={this.props.TaskId}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {/* Edited Task Users deleted */}
                <div className="form-group col-md-8">
                  <h5 className="modal-title">Users Added for Deletion:</h5>
                  <ul
                    id={`task${this.props.TaskId}UserListDel`}
                    className="list-group taskUsersDelList"
                    task={this.props.TaskId}
                  >
                    {/* to be filled */}
                  </ul>
                </div>
              </form>

              <div className="modal-footer">
                <button
                  className="btn btn-outline-success acceptEdition"
                  task={this.props.TaskId}
                >
                  Accept Edition
                </button>
              </div>
            </div>
          </div>