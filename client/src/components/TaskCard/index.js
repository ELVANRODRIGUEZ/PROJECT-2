// ================================== Packages Dependencies
import React from "react";

const TaskCard = function(props) {
  return (
    // +++++++++++++++++ TASK CARD +++++++++++++++++  
    <div 
    className='card bg-secondary text-white task' 
    style={{margin:'5px'}}>
    <div className='card-body'>

         {/* +++++++++++++++++ Erase Task Button +++++++++++++++++ */}
        <button 
            className='btn btn-secondary' 
            data-toggle='collapse' 
            href={`#eraseTask${props.taskId}`} 
            task={`${props.taskId}`} 
            aria-expanded='false' 
            aria-controls={`eraseTask${props.taskId}`} 
            style={{float: 'right', margin:'0 2px'}}
        >
            <i 
                className='fa fa-trash-o fa-4' 
                aria-hidden='true'
            ></i>
        </button>

        {/* Erase Task Modal */}
        <div className='collapse' id={`eraseTask${props.taskId}`}>
            <div 
                className='card card-title bg-secondary h4' 
                style={{border: "0px"}}
            >
                {`Confirm to delete Task ${props.taskId}?`}
            </div>
            <div className='card-body bg-dark' style={{textAlign: "right"}}>
                <button 
                    className='btn btn-outline-success eraseOneTask'  
                    task={props.taskId}
                >
                    Erase Task and all it's relationships
                </button>
            </div>
        </div>

        {/* Edit Task Button */}
        <button 
            className='btn btn-secondary editTaskButton' 
            data-toggle='collapse' 
            href={`#editTask${props.taskId}`}
            task={props.taskId} 
            aria-expanded='false' 
            aria-controls={`editTask${props.taskId}`} 
            style={{float: "right", margin:"0 2px"}}
            >
            <i 
                className='fa fa-pencil fa-4' 
                aria-hidden='true'
                >
            </i>
        </button>
                

        {/* Edit Task Modal */}
        <div className='collapse editTaskCollapse' 
            id={`editTask${props.taskId}`} 
            task={props.taskId}
            >
            <div 
                className='card card-body bg-dark' 
                style={{clear:"both", padding:"0px"}}
            >
            {/* Edited Task Header */}
            <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            </div><br/>
                <form>
                    {/* Edited Task Description */}
                    <div className='form-group col-md-12'>
                        <label 
                            for={`editTask${props.taskId}Description`}
                        >
                            Change Description
                        </label>
                        <textarea 
                            type='text' 
                            className='form-control' 
                            id={`editTask${props.taskId}Description`} 
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
                            id={`editTask${props.taskId}Deadline`} 
                        />
                    </div>
                    {/* Edited Task Users addition */}
                    <div className='form-group col-md-8'>
                        <label 
                            for={`task${props.taskId}Users`}
                        >
                            Add Users
                        </label>
                        <div className='row noMargin'>
                            <select 
                                className='form-control col-md-8 usersAvailables' 
                                id={`task${props.taskId}Users`} 
                                type='list'>
                            </select>
                            <button 
                            className='btn taskAddTskUserAdd btn-outline-success' 
                            task={props.taskId}
                            >
                            Add
                            </button>
                            <button 
                            className='btn taskAddTskUserDel btn-outline-danger' 
                            task={props.taskId}
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
                        id={`task${props.taskId}UserList`} 
                        className='list-group taskUsersAddList'
                        task={props.taskId}
                    >
                        {/* to be filled */}
                    </ul>
                    </div>
                    {/* Delete Task Users */}
                    <div className='form-group col-md-8'>
                        <label 
                            for={`task${props.TaskId}UsersDel`}
                        >
                            Delete Users
                        </label>
                        <div className='row noMargin'>
                            <select 
                                className='form-control col-md-8 usersAvailables' 
                                id={`task${props.TaskId}UsersDel`} 
                                type='list'>
                            </select>
                            <button 
                                className='btn taskDelTskUserAdd btn-outline-success' 
                                task={props.TaskId}
                            >
                                Add
                            </button>
                            <button 
                                className='btn taskDelTskUserDel btn-outline-danger' 
                                task={props.TaskId}
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
                            id={`task${props.TaskId}UserListDel`}
                            className='list-group taskUsersDelList'
                            task={props.TaskId}
                        >
                        {/* to be filled */}
                        </ul>
                    </div>
                </form>

                <div className='modal-footer'>
                    <button 
                        className='btn btn-outline-success acceptEdition' 
                        task={props.TaskId}
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
            {`Task: ${props.taskId}`}
        </h5>
        <h6 className='d-inline p-2 bg-danger rounded text-white'
        >
            {`Deadline: ${props.taskDeadline}`} 
        </h6>
        <h6 
            id='modal-task-description' 
            className='card-subtitle mb-2 text-white' 
            style={{marginTop:"15px"}}
        >
            {props.taskDescription}
        </h6>
        <h6>Progress:</h6>
        <div className='progress'>
            <div 
                className='progress-bar' 
                role='progressbar' 
                style={{width:`${parseFloat(props.taskAccomplished)*100}%`}}
                aria-valuenow={parseFloat(props.taskAccomplished)*100} 
                aria-valuemin='0'
                aria-valuemax='100'
            >
            </div>
        </div>
        <label for='numberof-input'>% of progress</label>
        <div className='row' style={{margin:"auto"}}>
            <button className='btn btn-success pplus'><i className='fa fa-minus-circle' aria-hidden='true'></i></button>
            <input 
                type='text' 
                value={parseFloat(props.taskAccomplished)*100} 
                id='total' 
                className='field left form-control col-sm-1 text-dark' 
                readonly=''
                style={{margin:"5px"}} 
            />
            <button className='btn btn-success pminus'><i className='fa fa-plus-circle' aria-hidden='true'></i></button>
        </div>
        <div className='card bg-dark text-white task' style={{margin:"5px"}}>
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
                    <div className='card card-body bg-dark'>
                        <div className='mesgs overflow-auto'>
                            <div className='msg_history'>
                                <div className='incoming_msg'>
                                    <div className='incoming_msg_img'> 
                                        <img
                                        src='https://dummyimage.com/250/4aaaa5/000000&text=IG' 
                                        alt='sunil'/> 
                                    </div>
                                    <div className='received_msg'>
                                        <div className='received_withd_msg'>
                                            <p>Test which is a new approach to have all
                                                solutions</p>
                                            <span className='time_date'> 11:01 AM | June 9</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='outgoing_msg'>
                                    <div className='sent_msg'>
                                        <p>Test which is a new approach to have all
                                            solutions</p>
                                        <span className='time_date'> 11:01 AM | June 9</span>
                                    </div>
                                </div>
                                <div className='incoming_msg'>
                                    <div className='incoming_msg_img'> <img
                                            src='https://dummyimage.com/250/4aaaa5/000000&text=EG' alt='sunil' /> </div>
                                    <div className='received_msg'>
                                        <div className='received_withd_msg'>
                                            <p>Test, which is a new approach to have</p>
                                            <span className='time_date'> 11:01 AM | Yesterday</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='outgoing_msg'>
                                    <div className='sent_msg'>
                                        <p>Apollo University, Delhi, India Test</p>
                                        <span className='time_date'> 11:01 AM | Today</span>
                                    </div>
                                </div>
                                <div className='incoming_msg'>
                                    <div className='incoming_msg_img'> 
                                        <img
                                            src='https://dummyimage.com/250/4aaaa5/000000&text=MC' 
                                            alt='sunil'
                                        /> 
                                    </div>
                                    <div className='received_msg'>
                                        <div className='received_withd_msg'>
                                            <p>We work directly with our designers and suppliers,
                                                and sell direct to you, which means quality, exclusive
                                                products, at a price anyone can afford.</p>
                                            <span className='time_date'> 11:01 AM | Today</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='type_msg'>
                            <div className='input_msg_write'>
                                <input type='text' className='write_msg' placeholder='Type a message' />
                                <button className='msg_send_btn' type='button'><i className='fa fa-paper-plane-o'
                                        aria-hidden='true'></i></button>
                            </div>
                        </div>
                    </div>
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
};

export default TaskCard;
