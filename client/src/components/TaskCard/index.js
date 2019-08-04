// ================================== Packages Dependencies
import React, { Component } from "react";
import Moment from "react-moment";
import Chat from "../Chat";
class TaskCard extends Component {
    constructor(props) {
        super(props);
        
        // This is how we define an attribute inside a class:
        this.timeRemaing = 
        new Date(this.props.taskDeadline) - new Date();
    }


    render() {
        return (
            // +++++++++++++++++ TASK CARD +++++++++++++++++  
            <div
                className='card bg-secondary text-white task'
                style={{ margin: '5px' }}>
                <div className='card-body'>

                    {/* +++++++++++++++++ Erase Task Button +++++++++++++++++ */}
                    <button
                        className='btn btn-secondary'
                        data-toggle='collapse'
                        href={`#eraseTask${this.props.taskId}`}
                        task={`${this.props.taskId}`}
                        aria-expanded='false'
                        aria-controls={`eraseTask${this.props.taskId}`}
                        style={{ float: 'right', margin: '0 2px' }}
                    >
                        <i
                            className='fa fa-trash-o fa-4'
                            aria-hidden='true'
                        ></i>
                    </button>

                    {/* Erase Task Modal */}
                    <div className='collapse' id={`eraseTask${this.props.taskId}`}>
                        <div
                            className='card card-title bg-secondary h4'
                            style={{ border: "0px" }}
                        >
                            {`Confirm to delete Task ${this.props.taskId}?`}
                        </div>
                        <div className='card-body bg-dark' style={{ textAlign: "right" }}>
                            <button
                                className='btn btn-outline-success eraseOneTask'
                                task={this.props.taskId}
                            >
                                Erase Task and all it's relationships
                </button>
                        </div>
                    </div>

                    {/* Edit Task Button */}
                    <button
                        className='btn btn-secondary editTaskButton'
                        data-toggle='collapse'
                        href={`#editTask${this.props.taskId}`}
                        task={this.props.taskId}
                        aria-expanded='false'
                        aria-controls={`editTask${this.props.taskId}`}
                        style={{ float: "right", margin: "0 2px" }}
                    >
                        <i
                            className='fa fa-pencil fa-4'
                            aria-hidden='true'
                        >
                        </i>
                    </button>


                    {/* Edit Task Modal */}
                    <div className='collapse editTaskCollapse'
                        id={`editTask${this.props.taskId}`}
                        task={this.props.taskId}
                    >
                        <div
                            className='card card-body bg-dark'
                            style={{ clear: "both", padding: "0px" }}
                        >
                            {/* Edited Task Header */}
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Task</h5>
                            </div><br />
                            <form>
                                {/* Edited Task Description */}
                                <div className='form-group col-md-12'>
                                    <label
                                        for={`editTask${this.props.taskId}Description`}
                                    >
                                        Change Description
                        </label>
                                    <textarea
                                        type='text'
                                        className='form-control'
                                        id={`editTask${this.props.taskId}Description`}
                                        rows='2'
                                    >
                                    </textarea>
                                </div>
                                <div className='form-group col-md-12'>
                                    <label for='editTaskdeadline'>Deadline</label>
                                    <input
                                        className='form-control'
                                        type='date'
                                        name='editTaskdeadline'
                                        id={`editTask${this.props.taskId}Deadline`}
                                    />
                                </div>
                                {/* Edited Task Users addition */}
                                <div className='form-group col-md-8'>
                                    <label
                                        for={`task${this.props.taskId}Users`}
                                    >
                                        Add Users
                        </label>
                                    <div className='row noMargin'>
                                        <select
                                            className='form-control col-md-8 usersAvailables'
                                            id={`task${this.props.taskId}Users`}
                                            type='list'>
                                        </select>
                                        <button
                                            className='btn taskAddTskUserAdd btn-outline-success'
                                            task={this.props.taskId}
                                        >
                                            Add
                            </button>
                                        <button
                                            className='btn taskAddTskUserDel btn-outline-danger'
                                            task={this.props.taskId}
                                        >
                                            Delete
                            </button>
                                    </div>
                                </div>
                                {/* Edited Task Users added */}
                                <div className='form-group col-md-8'>
                                    <h5 className='modal-title'>
                                        "Users Added: </h5>
                                    <ul
                                        id={`task${this.props.taskId}UserList`}
                                        className='list-group taskUsersAddList'
                                        task={this.props.taskId}
                                    >
                                        {/* to be filled */}
                                    </ul>
                                </div>
                                {/* Delete Task Users */}
                                <div className='form-group col-md-8'>
                                    <label
                                        for={`task${this.props.TaskId}UsersDel`}
                                    >
                                        Delete Users
                        </label>
                                    <div className='row noMargin'>
                                        <select
                                            className='form-control col-md-8 usersAvailables'
                                            id={`task${this.props.TaskId}UsersDel`}
                                            type='list'>
                                        </select>
                                        <button
                                            className='btn taskDelTskUserAdd btn-outline-success'
                                            task={this.props.TaskId}
                                        >
                                            Add
                            </button>
                                        <button
                                            className='btn taskDelTskUserDel btn-outline-danger'
                                            task={this.props.TaskId}
                                        >
                                            Delete
                            </button>
                                    </div>
                                </div>
                                {/* Edited Task Users deleted */}
                                <div className='form-group col-md-8'>
                                    <h5
                                        className='modal-title'
                                    >
                                        Users Added for Deletion:
                        </h5>
                                    <ul
                                        id={`task${this.props.TaskId}UserListDel`}
                                        className='list-group taskUsersDelList'
                                        task={this.props.TaskId}
                                    >
                                        {/* to be filled */}
                                    </ul>
                                </div>
                            </form>

                            <div className='modal-footer'>
                                <button
                                    className='btn btn-outline-success acceptEdition'
                                    task={this.props.TaskId}
                                >
                                    Accept Edition
                    </button>
                            </div>
                        </div>
                    </div>

                    {/* +++++++++++++++++ TASK CARD +++++++++++++++++ */}
                    <h5
                        id='modal-task-id'
                        className='card-title'
                    >
                        {`Task: ${this.props.taskId}`}
                    </h5>
                    <div
                        style={{ marginTop: "1rem" }}>
                        {this.timeRemaing < 0 ?
                            <h6 className='d-inline p-2 bg-danger rounded text-white'
                            >
                                Deadline: <Moment
                                    format="DD, MMMM. YYYY">
                                    {this.props.taskDeadline}
                                </Moment><br />
                            </h6> :
                            <h6 className='d-inline p-2 bg-success rounded text-white'
                            >
                                Deadline: <Moment
                                    format="DD, MMMM. YYYY">
                                    {this.props.taskDeadline}
                                </Moment><br />
                            </h6>
                        }
                    </div>
                    <h6
                        id='modal-task-description'
                        className='card-subtitle mb-2 text-white'
                        style={{ marginTop: "15px" }}
                    >
                        {this.props.taskDescription}
                    </h6>
                    <h6>Progress (%):</h6>
                    <div
                        className='progress'
                        style={{ marginBottom: ".5rem" }}>
                        <div
                            className='progress-bar'
                            role='progressbar'
                            style={{ width: `${parseFloat(this.props.taskAccomplished) * 100}%` }}
                            aria-valuenow={parseFloat(this.props.taskAccomplished) * 100}
                            aria-valuemin='0'
                            aria-valuemax='100'
                        >
                        </div>
                    </div>
                    <div
                        className='row'
                        style={{ margin: "auto", marginBottom: ".5rem" }}>
                        <button
                            className='btn btn-dark pplus'
                            style={{ marginLeft: 0 }}>
                            <i
                                className='fa fa-minus-circle'
                                aria-hidden='true'>
                            </i>
                        </button>
                        <input
                            type='text'
                            value={`${parseFloat(this.props.taskAccomplished) * 100}%`}
                            id='total'
                            className='field left form-control col-sm-1 text-dark'
                            readonly=''
                            style={{ margin: "5px" }}
                        />
                        <button className='btn btn-dark pminus'><i className='fa fa-plus-circle' aria-hidden='true'></i></button>
                    </div>
                    <div className='card bg-dark text-white task'>
                        <div className='card-body'>
                            <ul className='nav nav-tabs nav-pills card-title'>
                                <li className='nav-item'>
                                    <a className='nav-link' data-toggle='collapse' href='#multiCollapseExample1' role='button'
                                        aria-expanded='false' aria-controls='multiCollapseExample1'>Users</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' data-toggle='collapse' href='#multiCollapseExample2' role='button'
                                        aria-expanded='false' aria-controls='multiCollapseExample2'>Chat</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' data-toggle='collapse' href='#multiCollapseExample3' role='button'
                                        aria-expanded='false' aria-controls='multiCollapseExample3'>New Email</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' data-toggle='collapse' href='#multiCollapseExample4' role='button'
                                        aria-expanded='false' aria-controls='multiCollapseExample4'>Email History</a>
                                </li>
                            </ul>
                            {/* +++++++++++++++++ BODY USERS +++++++++++++++++ */}
                            <div className='collapse' id='multiCollapseExample1'>
                                <div className='card card-body bg-dark'>
                                    <h6>Users: </h6>
                                    <ul>
                                        <li>Nacho</li>
                                        <li>Manu</li>
                                        <li>Elvan</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='collapse' id='multiCollapseExample2'>
                               <Chat/>
                            </div>
                            <div className='collapse' id='multiCollapseExample3'>
                                <div className='card card-body bg-dark'>
                                    <div className='container'>
                                        <form>
                                            <div className='form-group'>
                                                <label for='exampleFormControlInput1'>Email address</label>
                                                <input type='email' className='form-control' id='exampleFormControlInput1'
                                                    placeholder='name@example.com' />
                                            </div>
                                            <div className='form-group'>
                                                <label for='exampleFormControlInput1'>Subject</label>
                                                <input type='text' className='form-control' id='exampleFormControlInput1'
                                                    placeholder='Subject' />
                                            </div>
                                            <div className='form-group'>
                                                <label for='exampleFormControlTextarea1'>Example textarea</label>
                                                <textarea type='text' className='form-control' id='exampleFormControlTextarea1'
                                                    rows='3'></textarea>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className='collapse' id='multiCollapseExample4'>
                                <div className='card card-body bg-dark'>
                                    <div className='container'>
                                        <div className='list-group'>
                                            <a href='#' className='list-group-item list-group-item-action'>
                                                <div className='d-flex w-100 justify-content-between'>
                                                    <h5 className='mb-1'>List group item heading</h5>
                                                    <small>3 days ago</small>
                                                </div>
                                                <p className='mb-1'>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam
                                                    eget risus
                                        varius blandit.</p>
                                                <small>Donec id elit non mi porta.</small>
                                            </a>
                                            <a href='#' className='list-group-item list-group-item-action'>
                                                <div className='d-flex w-100 justify-content-between'>
                                                    <h5 className='mb-1'>List group item heading</h5>
                                                    <small className='text-muted'>3 days ago</small>
                                                </div>
                                                <p className='mb-1'>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam
                                                    eget risus
                                        varius blandit.</p>
                                                <small className='text-muted'>Donec id elit non mi porta.</small>
                                            </a>
                                            <a href='#' className='list-group-item list-group-item-action'>
                                                <div className='d-flex w-100 justify-content-between'>
                                                    <h5 className='mb-1'>List group item heading</h5>
                                                    <small className='text-muted'>3 days ago</small>
                                                </div>
                                                <p className='mb-1'>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam
                                                    eget risus
                                        varius blandit.</p>
                                                <small className='text-muted'>Donec id elit non mi porta.</small>
                                            </a>
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
};

export default TaskCard;
