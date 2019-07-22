import React, { Component } from "react";
import axios from "axios";

class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectCards: [],
      userName: ""
    };
  }

  componentWillMount() {
    axios
      .get("/members/info")
      .then(data => {
        // Test console.
        console.log(data.data);
        this.setState({
          projectCards: data.data.projects,
          userName: data.data.user
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div id="profile">
        {/*! +++++++++++++++++ NAVBAR +++++++++++++++++ */}
        <nav className="navbar  bg-dark navbarTitle">
          {/* Elvan */}
          <p id="userNameBanner" className="navbar-brand"></p>
          {/* Elvan added id="userNameBaner" */}
          <form className="form-inline">
            <a
              className="btn btn-outline-danger my-2 my-sm-0"
              role="button"
              aria-disabled="true"
              href="/logout"
            >
              Sign Out
            </a>
          </form>
        </nav>

        {/* +++++++++++++++++ MODAL: Delete Modal For Projects +++++++++++++++++ */}
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          id="deleteProjectModal"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title" id="eraseProjModalTitle">
                  Are you sure you want to delete?
                </h5>
                <button
                  type="button"
                  className="close text-danger"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  data-dismiss="modal"
                  id="deleteProject"
                >
                  Erase Project's Tasks
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* +++++++++++++++++ MODAL: Delete Modal For Categories +++++++++++++++++ */}
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          id="deleteCategoryModal"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title" id="eraseCatModalTitle"></h5>
                <button
                  type="button"
                  className="close text-danger"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  data-dismiss="modal"
                  id="deleteCategory"
                >
                  Erase Category's Tasks
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* +++++++++++++++++ MODAL: Add New Project +++++++++++++++++ */}
        <div className="modal" tabIndex="-1" role="dialog" id="projectModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Add a new Project</h5>
                <button
                  type="button"
                  className="close text-danger"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="projectName">Project Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="projectName"
                      placeholder="Project Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="projectDesc">Project Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="projectDesc"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="projectUsers">Add Users</label>
                    <div className="row noMargin">
                      <select
                        className="form-control col-md-6 usersAvailables"
                        id="projectUsers"
                        type="list"
                      ></select>
                      <button className="btn btn-outline-success" id="addUser">
                        Add
                      </button>
                      <button
                        className="btn btn btn-outline-danger"
                        id="delUser"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <h5>Users Added: </h5>
                  <ul id="userList" className="list-group"></ul>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-success"
                  id="projectModalAdd"
                  data-dismiss="modal"
                >
                  Add
                </button>
                <button
                  className="btn btn btn-outline-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* +++++++++++++++++ MODAL: New Category Modal +++++++++++++++++ */}
        <div className="modal" tabIndex="-1" role="dialog" id="categoryModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Add a new category</h5>
                <button
                  type="button"
                  className="close text-danger"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="categoryName">Category name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="categoryName"
                      placeholder="Task group name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoryDesc">Category Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="categoryDesc"
                      rows="3"
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn btn-outline-success"
                  data-dismiss="modal"
                  id="categoryModalAdd"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn btn-outline-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* +++++++++++++++++ MODAL: Successfully added category +++++++++++++++++ */}
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          id="categorySuccessModal"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 id="categoryAddMessage" className="modal-title"></h5>
                <button
                  type="button"
                  className="close text-danger"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>
                      <b>Note:</b>
                    </label>
                    <p>
                      This addition will make availabe a new <br />
                      Category to the database.
                      <br />
                      Once you click on a Project it will be
                      <br />
                      shown here with no related Tasks yet, but
                      <br />
                      you can start adding them whenever needed.
                      <br />
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* +++++++++++++++++ JUMBOTRON CONTAINER +++++++++++++++++ */}
        <div
          className="jumbotron bg-secondary "
          style={{ backgroundColor: "#aaa" }}
        >
          This is from the component
          <div className="row">
            {/* +++++++++++++++++ PROJECTS +++++++++++++++++ */}
            <div className="col-sm-6">
              <div className="row " style={{ margin: "5px" }}>
                <div
                  className="card bg-dark text-white"
                  style={{ width: "100rem", maxHeight: "60vh", height: "60vh" }}
                >
                  <div className="card-header">
                    <span className="display-3">
                      <b>Projects</b>
                    </span>
                    <button
                      className="btn btn-secondary  projectDel"
                      style={{ float: "right", margin: "0 2px" }}
                    >
                      <i className="fa fa-trash-o fa-4" aria-hidden="true"></i>
                    </button>
                    <button
                      id="projectAddButton"
                      className="btn btn-secondary  projectAdd"
                      style={{ float: "right", margin: "0 2px" }}
                    >
                      <i className="fa fa-plus fa-4" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div
                    className="card-body bg-dark overflow-auto"
                    style={{ maxHeight: "60vh" }}
                  >
                    <div id="projectDiv" className="card-columns row">
                      {/* +++++++++++++++++ Project Card Container +++++++++++++++++ */}
                      {this.state.projectCards.map(project => {
                        return (<div
                          className="card  bg-secondary projectCard col-md-12 overflow-auto"
                          data-id={project.projId}
                        >
                          <div className="card-header">
                            Project: {project.projId} - {project.projName}
                          </div>
                          <div className="card-body">
                            <h6 className="card-title">
                              {project.projDescription}
                            </h6>
                          </div>
                        </div>);
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* +++++++++++++++++ CATEGORIES +++++++++++++++++ */}
            <div className="col-sm-6">
              <div className="row" style={{ margin: "5px" }}>
                <div
                  className="card bg-dark text-white"
                  style={{ width: "100rem", maxHeight: "60vh", height: "60vh" }}
                >
                  <div className="card-header">
                    <button
                      className="btn btn-secondary"
                      id="categoryDel"
                      style={{ float: "right", margin: "0 2px" }}
                    >
                      <i className="fa fa-trash-o fa-4" aria-hidden="true"></i>
                    </button>
                    <button
                      className="btn btn-secondary"
                      id="categoryAdd"
                      style={{ float: "right", margin: "0 2px" }}
                    >
                      <i className="fa fa-plus fa-4" aria-hidden="true"></i>
                    </button>
                    <span className="display-3">
                      <b>Categories</b>
                    </span>
                    {/* <h3 className='display-2'>asdf<span id='forProject'></span></h3> */}
                  </div>
                  <div
                    className="card-body bg-dark overflow-auto"
                    id="categoryBody"
                    style={{ height: "60vh" }}
                  >
                    <div id="categoryDiv" className="card-columns row">
                      {/* +++++++++++++++++ Categories Card Container +++++++++++++++++ */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Members;
