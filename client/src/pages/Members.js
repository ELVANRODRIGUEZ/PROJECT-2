// ================================== Packages Dependencies
import React, { Component } from "react";
import axios from "axios";

// ================================== Files Dependencies
import Navbar from "../components/Navbar";
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
      projectCardBorder: "",
      taskModalShow: false,
      taskModalView: "none"
    };
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
    const categoryData = {
      category: event.target.getAttribute("data-id")
    };

    /*
    React documentation enforces the use of "Functional SetState" to change State values instead of just passing an object to the "SetState" function 
      this.setState({state: "state value"}) 
    This can be done like this:
      this.setState((prevState, props) => {
      return { categorySelected: categoryId };
    });
    But that method proves not to have the State necessarily changed at desired moment either, that's why the safe method is to englobe every piece of code that depends on the State's new value inside a Callback within the "setState" method. Like this:
      this.setState({ categorySelected: categoryId }, () => {});
    */

    this.setState({ categorySelected: categoryId }, () => {

      axios
        .get(
          "/members/info/" +
          this.state.projectSelected +
          "/category/" +
          this.state.categorySelected
        )
        .then(data => {
          // Test console.
          // console.log(data.data.tasks);
          
          this.setState({ tasksCards: data.data.tasks }, () => {
            
            // Test console.
            // console.log(this.state.tasksCards);

            axios
              .post("/api/users-selections", categoryData)
              .then(data2 => {
                // Test console.
                // console.log(data2.data);
  
                axios
                  .get("/members/info/" +
                    this.state.projectSelected +
                    "/category/" +
                    this.state.categorySelected + "/all_tasks")
                  .then(function (data3) {
  
                    // console.log(data3.data);
  
                  });
              })
              .catch(error => {
                console.log(error);
              });

          });


        })
        .catch(error => {
          console.log(error);
        });
    })
  };

  taskModalClose = () => {
    this.setState({ taskModalView: "none", taskModalShow: false });
  };

  taskModalShow = () => {
    this.setState({ taskModalView: "block", taskModalShow: true });
  };



  render() {
    return (
      <div id="profile">
        <Navbar userName={this.state.userName}/>
        {/*! +++++++++++++++++ NAVBAR +++++++++++++++++ */}
          {/* <nav className="navbar  bg-dark navbarTitle"> */}
          {/* Elvan */}
          {/* <p id="userNameBanner" className="navbar-brand">Welcome  {this.state.userName}</p> */}
          {/* Elvan added id="userNameBaner" */}
          {/* <form className="form-inline">
            <button
              className="btn btn-outline-danger my-2 my-sm-0"
              aria-disabled="true"
              // href="/logout"
              onClick={this.logOut}
            >
              Sign Out
            </button>
          </form> */}
        {/* </nav> */}

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
          tasksCards={this.state.tasksCards}
          show={this.state.taskModalShow}
          handleClose={this.taskModalClose}
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

                      {this.state.projectCards
                        ? this.state.projectCards.map(project => {
                          return (
                            <div
                              key={project.projId}
                              style={{
                                position: "relative",
                                zIndex: "0",
                                width: "100%"
                              }}
                            >
                              <div
                                className={
                                  project.projId ===
                                    this.state.projectSelected
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
                        })
                        : () => {
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
                                onClick={this.ProjectClick}
                                data-id=""
                                style={{
                                  position: "absolute",
                                  top: "0",
                                  left: "0",
                                  bottom: "0",
                                  right: "0",
                                  zIndex: "3"
                                }}
                              ></div>
                              <ProjectCard
                                style={{ position: "relative" }}
                                onClick={this.ProjectClick}
                                id=""
                                name="Project nam?"
                                description="Description"
                              />
                            </div>
                          );
                        }}
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
                            key={category.catId}
                            style={{
                              position: "relative",
                              zIndex: "0",
                              width: "100%"
                            }}
                          >
                            <div
                              className={
                                category.catId ===
                                  this.state.categorySelected
                                  ? "Wrapper border border-danger"
                                  : "Wrapper"
                              }
                              onClick={this.CategoryClick}
                              onDoubleClick={this.taskModalShow}
                              data-id={category.catId}
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
                            <CategoryCard
                              style={{ position: "relative" }}
                              onClick={this.categoryClick}
                              onDoubleClick={this.taskModalShow}
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
