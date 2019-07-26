<div
        className="collapse"
        id="addTaskCollapsWindow"
        style={{ margin: "auto", width: "100vh" }}
      >
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">Add new Task</h5>
            <span aria-hidden="true">&times;</span>
          </div>
          <div className="card card-body bg-dark text-white">
            <form>
              {/* +++++++++++++++++ New Task Description +++++++++++++++++ */}
              <div className="form-group">
                <label htmlFor="projectDesc">New Task Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="taskDesc"
                  rows="3"
                ></textarea>
              </div>
              {/* +++++++++++++++++ New Task Deadline +++++++++++++++++ */}
              <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input
                  className="form-control"
                  type="date"
                  name="deadline"
                  id="taskDeadline"
                />
              </div>
              {/* +++++++++++++++++ New Task Users addition +++++++++++++++++ */}
              <div className="form-group">
                <label htmlFor="taskUsers">Add Users</label>
                <div className="row noMargin">
                  <select
                    className="form-control col-md-6 usersAvailables"
                    id="taskUsers"
                    type="list"
                  ></select>
                  <button className="btn btn-outline-success" id="addTaskUser">
                    Add
                  </button>
                  <button
                    className="btn btn btn-outline-danger"
                    id="delTaskUser"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {/* +++++++++++++++++ New Task Users added +++++++++++++++++ */}
              <h5 className="modal-title">Users Added: </h5>
              <ul id="taskUserList" className="list-group">
                {/* +++++++++++++++++ to be filled +++++++++++++++++ */}
              </ul>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline-success" id="addTask">
              Add task!
            </button>
          </div>
        </div>
      </div>