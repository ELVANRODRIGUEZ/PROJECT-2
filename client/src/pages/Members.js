// ================================== Packages Dependencies
import React, { Component } from "react";
import axios from "axios";

// ================================== Files Dependencies
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import NewProjectModal from "../components/NewProjectModal";
import DeleteProjectModal from "../components/DeleteProjectModal";
import NewCategoryModal from "../components/NewCategoryModal";
import DeleteCategoryModal from "../components/DeleteCategoryModal";
import CategoryCard from "../components/CategoryCard";
import TaskModal from "../components/TaskModal";
import io from "socket.io-client";

//We take the URL the socket will be listening to according to the "NODE_ENV" value.
let socketUrl;

if (process.env.NODE_ENV === "development") {
  const PORT = 3300;
  socketUrl = `http://localhost:${PORT}`;
} else {
  socketUrl = "/";
}

//Test console.
// console.log(process.env);
// console.log(process.env.NODE_ENV);

class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allUsers: [],
      ifNoProjects: null,
      projectCards: [],
      projectUsers: [],
      categoryCards: [],
      tasksCards: [],
      projectSelected: "",
      projectSelectedName: "",
      categorySelected: "",
      categorySelectedName: "",
      userName: "",
      userId: "",
      userEmail: "",
      projectCardBorder: "",
      taskModalShow: false,
      taskModalView: "none",
      newProjModalShow: false,
      newProjModalView: "none",
      delProjModalShow: false,
      delProjModalView: "none",
      newCatModalShow: false,
      newCatModalView: "none",
      delCatModalShow: false,
      delCatModalView: "none",
      //"socket" will store the particular "socket session".
      socket: null
    };
  }

  /*
    This was originally "componentWillMount", although it seemps it is depricated now, so it was renamed to componentDidMount. "UNSAFE_componentWillMount" could have been used as well according to the React development team recommendation.
    Right after the component has mounted and before it is rendered, we initialize the socket with "this.initSocket".
    */
  componentDidMount() {
    //? Get all members so they can be added to a new Project.
    //> Endpoint at: "../../../routes/apiProject.js"
    axios
      .get("/api/project/get/all_members")
      .then(data => {
        // Test console.
        // console.log(data.data);

        this.setState(
          {
            allUsers: data.data
          },
          () => {
            // Test console.
            // console.log(this.state.allUsers);
          }
        );
      })
      .catch(error => {
        console.log(error);
      });

    this.userInfo();
    this.initSocket();
  }

  initSocket = () => {
    //Calling the "io" function imported from "socket.io-client" and we pass the URL to listen to onto it.
    const socket = io(socketUrl);
    //Then we trigger a connect event after which we set "this.state.socket" equals to the by then listening socket.
    socket.on("connect", () => {
      //Production console.
      console.log("Socket connected");
    });
    //This is a syntax to avoid this redundancy: "this.setState({socket:socket})"
    this.setState({ socket });
  };

  userInfo = () => {
    //? Get all info about the logged member.
    //> Endpoint at: "../../../routes/apiLogin.js"
    axios
      .get("/api/get/user/info")
      .then(data => {
        // Test console.
        // console.log(data.data);

        this.setState(
          {
            ifNoProjects: data.data.projectsHtml,
            projectCards: data.data.projects,
            userName: data.data.user_Name,
            userId: data.data.user_Id,
            userEmail: data.data.user_Email
          },
          () => {
            // Test console.
            // console.log(this.state.userId);
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  ProjectClick = event => {
    // Test console.
    // console.log(event.target);
    // console.log(event.target.getAttribute("data-id"));

    const projectId = event.target.getAttribute("data-id");
    const projectName = event.target.getAttribute("name");
    const { userId } = this.state;

    this.setState(
      {
        projectSelected: parseInt(projectId),
        projectSelectedName: projectName
      },
      () => {
        //? Route to get the amount of Tasks in each Category according to the Project selected (This also called for rerendering).
        //> Endpoint at: "../../../routes/apiCategory.js"
        axios
          .get(`/api/category/get/tasks_in_category/${userId}/${projectId}`)
          .then(data => {
            // Test console.
            // console.log(data.data);

            this.setState({ categoryCards: data.data.categories }, () => {
              this.loadProjectUsers();
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    );
  };

  loadProjectUsers = () => {
    // Test console.
    // console.log(this.state.projectSelected);

    axios
      //? Gets all selected Project Users.
      //> Endpoint at: "../../../routes/apiProject.js"
      .get(`/api/project/get/project_users/${this.state.projectSelected}`)
      .then(users => {
        // Test console.
        // console.log(users.data);

        this.setState(
          {
            projectUsers: users.data.filter(user => {
              return user["user.user_id"] !== this.state.userId;
            })
          },
          () => {
            // Test console.
            // console.log(users.data);
            // console.log(this.state.projectUsers);
          }
        );
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
    const categoryName = event.target.getAttribute("name");
    const { userId } = this.state;

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

    this.setState(
      {
        categorySelected: categoryId,
        categorySelectedName: categoryName
      },
      () => {
        //? Route to retrieve the Tasks related to the selected Project and Category.
        //> Endpoint at: "../../../routes/apiTask.js"
        axios
          .get(
            `/api/task/get/tasks_on_proj_and_cat/${userId}/${this.state.projectSelected}/${this.state.categorySelected}`
          )
          .then(data => {
            // Test console.
            // console.log(data.data.tasks);

            this.setState({ tasksCards: data.data.tasks }, () => {
              // Test console.
              // console.log(this.state.tasksCards);

              //? This is to get all the Task's Ids from the Selected Project and Category.
              //> Endpoint at: "../../../routes/apiTask.js"
              axios
                .get(
                  `/api/task/get/tasksIds_on_proj_and_cat/${userId}/${this.state.projectSelected}/${this.state.categorySelected}`
                )
                .then(function(data3) {
                  // Test console.
                  // console.log(data3.data);
                })
                .catch(error => {
                  console.log(error);
                });
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    );
  };

  newProjModalClose = () => {
    this.setState({ newProjModalView: "none", newProjModalShow: false });
  };

  newProjModalShow = () => {
    this.setState({ newProjModalView: "block", newProjModalShow: true });
  };

  delProjModalClose = () => {
    this.setState({ delProjModalView: "none", delProjModalShow: false });
  };

  delProjModalShow = () => {
    this.setState({ delProjModalView: "block", delProjModalShow: true });
  };

  newCatModalClose = () => {
    this.setState({ newCatModalView: "none", newCatModalShow: false });
  };

  newCatModalShow = () => {
    this.setState({ newCatModalView: "block", newCatModalShow: true });
  };

  delCatModalClose = () => {
    this.setState({ delCatModalView: "none", delCatModalShow: false });
  };

  delCatModalShow = () => {
    this.setState({ delCatModalView: "block", delCatModalShow: true });
  };

  taskModalClose = () => {
    this.setState({ taskModalView: "none", taskModalShow: false });
  };

  taskModalShow = () => {
    this.setState({ taskModalView: "block", taskModalShow: true });
  };

  renderForNewTasks = () => {
    const { userId, projectSelected, categorySelected } = this.state;

    //? Route to get the amount of Tasks in each Category according to the Project selected (This also called for rerendering).
    //Project and Category selected are expected to remain the same.
    //> Endpoint at: "../../../routes/apiTask.js"
    axios
      .get(`/api/category/get/tasks_in_category/${userId}/${projectSelected}`)
      .then(data => {
        // Test console.
        // console.log(data.data);

        this.setState({ categoryCards: data.data.categories });
      })
      .catch(error => {
        console.log(error);
      });

    let category;

    //! This is just so when a new Category is added without a Category Card has been clicked, "1" is passed instead in the following Axios Call so it does not return an error.
    if (categorySelected === "") {
      category = 1;
    } else {
      category = categorySelected;
    }

    //? Route to retrieve the Tasks related to the selected Project and Category (This also called for rerendering).
    //This is to rerender after the new Task has been created.
    //> Endpoint at: "../../../routes/apiTask.js"
    axios
      .get(
        `/api/task/get/tasks_on_proj_and_cat/${userId}/${projectSelected}/${category}`
      )
      .then(data => {
        // Test console.
        // console.log(data.data.tasks);

        this.setState({ tasksCards: data.data.tasks }, () => {
          // Test console.
          // console.log(this.state.tasksCards);

          //? This is to get all the Task's Ids from the Selected Project and Category.
          //> Endpoint at: "../../../routes/apiTask.js"
          axios
            .get(
              `/api/task/get/tasksIds_on_proj_and_cat/${userId}/${projectSelected}/${category}`
            )
            .then(function(data3) {
              // Test console.
              // console.log(data3.data);
            })
            .catch(error => {
              console.log(error);
            });
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let delProjectButton;
    let delCatgoryButton;

    if (this.state.projectSelected) {
      delProjectButton = this.delProjModalShow;
    }
    if (this.state.categorySelected) {
      delCatgoryButton = this.delCatModalShow;
    }

    return (
      <div id="profile">
        {/*! +++++++++++++++++ NAVBAR  Moved to Navbar component+++++++++++++++++ */}
        <Navbar history={this.props.history} userName={this.state.userName} />

        {/* +++++++++++++++++ MODAL: Delete Modal For Projects +++++++++++++++++ */}
        <DeleteProjectModal
          show={this.state.delProjModalShow}
          handleClose={this.delProjModalClose}
          userId={this.state.userId}
          projectSelected={this.state.projectSelected}
          projectSelectedName={this.state.projectSelectedName}
          renderForCategories={this.renderForNewTasks}
        ></DeleteProjectModal>

        {/* +++++++++++++++++ MODAL: Delete Modal For Categories +++++++++++++++++ */}
        <DeleteCategoryModal
          show={this.state.delCatModalShow}
          handleClose={this.delCatModalClose}
          userId={this.state.userId}
          projectSelected={this.state.projectSelected}
          projectSelectedName={this.state.projectSelectedName}
          categorySelected={this.state.categorySelected}
          categorySelectedName={this.state.categorySelectedName}
          renderForCategories={this.renderForNewTasks}
        ></DeleteCategoryModal>

        {/* +++++++++++++++++ MODAL: Add New Project +++++++++++++++++ */}
        <NewProjectModal
          show={this.state.newProjModalShow}
          handleClose={this.newProjModalClose}
          allUsers={this.state.allUsers}
          userId={this.state.userId}
          userName={this.state.userName}
          renderForNewProjects={this.userInfo}
        />

        {/* +++++++++++++++++ MODAL: New Category Modal +++++++++++++++++ */}
        <NewCategoryModal
          show={this.state.newCatModalShow}
          handleClose={this.newCatModalClose}
          allUsers={this.state.allUsers}
          userId={this.state.userId}
          userName={this.state.userName}
          renderForNewCategories={this.renderForNewTasks}
        ></NewCategoryModal>

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
                {/* <h5 id="categoryAddMessage" className="modal-title"></h5> */}
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

        {/* {console.log(this.state.projectUsers)} */}
        <TaskModal
          key={this.state.projectSelected}
          tasksCards={this.state.tasksCards}
          show={this.state.taskModalShow}
          handleClose={this.taskModalClose}
          projectUsers={this.state.projectUsers}
          projectSelected={this.state.projectSelected}
          categorySelected={this.state.categorySelected}
          userId={this.state.userId}
          userName={this.state.userName}
          userEmail={this.state.userEmail}
          renderForNewTasks={this.renderForNewTasks}
          socket={this.state.socket}
        />

        {/* +++++++++++++++++ JUMBOTRON CONTAINER +++++++++++++++++ */}
        <div
          className="jumbotron bg-secondary "
          style={{ backgroundColor: "#aaa" }}
        >
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
                      // onClick={this.state.projectSelected ? this.delProjModalShow : ""}
                      onClick={delProjectButton}
                    >
                      <i className="fa fa-trash-o fa-4" aria-hidden="true"></i>
                    </button>
                    <button
                      id="projectAddButton"
                      className="btn btn-secondary  projectAdd"
                      style={{ float: "right", margin: "0 2px" }}
                      onClick={this.newProjModalShow}
                    >
                      <i
                        className="fa fa-plus fa-4"
                        aria-hidden="true"
                        onClick={this.newProjModalShow}
                      ></i>
                    </button>
                  </div>
                  <div
                    className="card-body bg-dark overflow-auto"
                    style={{ maxHeight: "60vh" }}
                  >
                    {/* +++++++++++++++++ Project Card Container +++++++++++++++++ */}
                    <div id="projectDiv" className="card-columns row">
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
                                  name={project.projName}
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
                        : this.state.ifNoProjects}
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
                      onClick={delCatgoryButton}
                    >
                      <i className="fa fa-trash-o fa-4" aria-hidden="true"></i>
                    </button>
                    <button
                      className="btn btn-secondary"
                      id="categoryAdd"
                      style={{ float: "right", margin: "0 2px" }}
                      onClick={this.newCatModalShow}
                    >
                      <i className="fa fa-plus fa-4" aria-hidden="true"></i>
                    </button>
                    <span className="display-3">
                      <b>Categories</b>
                      {this.state.projectSelected
                        ? ` (P-${this.state.projectSelected})`
                        : ""}
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
                                parseInt(this.state.categorySelected)
                                  ? "Wrapper border border-danger"
                                  : "Wrapper"
                              }
                              name={category.catName}
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
                              // onDoubleClick={this.taskModalShow}
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
