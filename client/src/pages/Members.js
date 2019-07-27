// ================================== Packages Dependencies
import React, { Component } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";

// ================================== Files Dependencies
import ProjectCard from "../components/ProjectCard";
import CategoryCard from "../components/CategoryCard";
import TaskModal from "../components/TaskModal";

class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectCards: [],
      categoryCards: [],
      tasksCards: [],
      projectSelected: "",
      categorySelected: "",
      userName: "",
      border: "",
      taskModal: {
        class: "modal fade bd-example-modal-xl",
        style: { display: "none" },
        modalState: "false"
      },
      isOpen: "false",
      show: false,
      setShow: false,
      view: "none",
      show2: ""
    };

    // [show, setShow] = useState(false);
  }

  componentWillMount() {
    axios
      .get("/members/info")
      .then(data => {
        // Test console.
        // console.log(data.data);
        this.setState({
          projectCards: data.data.projects,
          userName: data.data.user
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  // =======

  // componentWillMount() {
  //   axios
  //     .get("/members/info")
  //     .then(data => {
  //       // Test console.
  //       console.log(data.data);
  //       if(!data.data.projects.length){
  //         this.setState({
  //           projectCards: ["No Projects yet"],
  //           userName: data.data.user
  //         });
  //       }
  //       else{
  //         this.setState({
  //           projectCards: data.data.projects,
  //           userName: data.data.user
  //         });
  //       }

  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  ProjectClick = event => {
    // Test console.
    // console.log(event.target);
    // console.log(event.target.getAttribute("data-id"));

    const projectId = event.target.getAttribute("data-id");
    const projectData = { project: event.target.getAttribute("data-id") };

    this.setState({ projectSelected: parseInt(projectId) });

    axios
      .get("/members/info/" + projectId)
      .then(data => {
        // Test console.
        // console.log(data.data);

        this.setState({ categoryCards: data.data.categories });
        axios
          .post("/api/users-selections", projectData)
          .then(data2 => {
            // Test console.
            // console.log(data.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  CategoryClick = event => {
    // Test console.
    // console.log(event.target);
    // console.log(event.target.getAttribute("data-id"));

    const categoryId = event.target.getAttribute("data-id");
    console.log(categoryId);
    const categoryData = { category: event.target.getAttribute("data-id") };

    this.setState({ categorySelected: parseInt(categoryId) });

    axios
      .get(
        "/members/info/" +
          this.state.projectSelected +
          "/category/" +
          categoryId +
          "/all_tasks"
      )
      .then(data => {
        // Test console.
        console.log(data.data);

        //!this.setState({ tasksCards: data.data.categories });
        // axios
        //   .post("/api/users-selections", categoryData)
        //   .then(data2 => {
        //     // Test console.
        //     // console.log(data.data);
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleClose = () => {
    this.setState({ show2: "" });
    this.setState({ view: "none" });
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show2: "show" });
    this.setState({ view: "block" });
    this.setState({ show: true });
  };
  handleView1 = () => {
    this.setState({ view: "none" });
  };

  handleView2 = () => {
    this.setState({ view: "block" });
  };

  CategoryDoubleClick = event => {
    // Test console.
    // console.log(event.target);
    // console.log(event.target.getAttribute("data-id"));

    // const categoryId = event.target.getAttribute("data-id");
    // console.log(categoryId);
    // const categoryData = { category: event.target.getAttribute("data-id") };

    // this.setState({categorySelected: parseInt(categoryId)});

    // this.setState({taskModal: {
    //   class: "modal fade bd-example-modal-xl show",
    //   style: {display: "block"}
    // }})

    // this.taskModal.modal({
    //     show: true,
    //     backdrop: 'static',
    //     keyboard: false
    // });
    console.log("here");
    this.setState({
      isOpen: "true"
    });
    console.log(this.state.isOpen);
  };

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

        {/* +++++++++++++++++ TASK MODAL +++++++++++++++++ */}

        <TaskModal
          // ref = { element => this.taskModal = element}
          // class = {this.state.taskModal.class}
          // style = {this.state.taskModal.style}
          show2={this.state.show2}
          show={this.state.show}
          handleClose={this.handleClose}
          view={this.state.view}
          handleView1={this.handleView2}
          // onDoubleClick={this.handleShow}
          // onClose={this.CategoryDoubleClick}
        />

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
                        return (
                          <div
                            style={{
                              position: "relative",
                              zIndex: "0",
                              width: "100%"
                            }}
                          >
                            <div
                              className={
                                project.projId === this.state.projectSelected
                                  ? "Wrapper border border-primary"
                                  : "Wrapper"
                              }
                              onClick={this.ProjectClick}
                              data-id={project.projId}
                              style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                bottom: "0",
                                right: "0",
                                borderRadius: "5px",
                                marginBottom: "1.1rem",
                                zIndex: "3"
                              }}
                            ></div>
                            <ProjectCard
                              style={{ position: "relative" }}
                              onClick={this.ProjectClick}
                              id={project.projId}
                              name={project.projName}
                              description={project.projDescription}
                            />
                          </div>
                        );
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
                      {this.state.categoryCards.map(category => {
                        return (
                          <div
                            style={{
                              position: "relative",
                              zIndex: "0",
                              width: "100%"
                            }}
                          >
                            <div
                              className="Wrapper"
                              onClick={this.CategoryClick}
                              onDoubleClick={this.handleShow}
                              data-id={category.catId}
                              style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                bottom: "0",
                                right: "0",
                                zIndex: "3"
                              }}
                            ></div>
                            <CategoryCard
                              style={{ position: "relative" }}
                              onClick={this.categoryClick}
                              onDoubleClick={this.handleShow}
                              id={category.catId}
                              count={category.taskCount}
                              name={category.catName}
                              description={category.catDescription}
                            />
                          </div>
                        );
                      })}
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