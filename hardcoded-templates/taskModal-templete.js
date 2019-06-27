// =================================== Task Modal Window templete.

function taskModal (taksId, taskDescription, taskDeadLine, taskAccomplished) {

 var taskHtml =   
    "<div class='card bg-secondary text-white task' style='margin:5px'>" +
        "<div class='card-body'>" +
            "<button class='btn btn-secondary' style='float: right;margin:0 2px' data-toggle='collapse'" +
                "href='#collapseExample6' role='button' aria-expanded='false' aria-controls='collapseExample6'><i" +
                    "class='fa fa-trash-o fa-4' aria-hidden='true'></i></button>" +
            "<button class='btn btn-secondary' data-toggle='collapse' href='#collapseExample5' role='button'" +
                "aria-expanded='false' aria-controls='collapseExample5' style='float: right; margin:0 2px'><i" +
                    "class='fa fa-pencil fa-4' aria-hidden='true'></i></button>" +
            "<div class='collapse' id='collapseExample5'>" +
                "<div class='card card-title bg-secondary h4'>Edit Task</div>" +
                "<div class='card card-body bg-dark'>" +
                    "<form>" +
                        "<div class='form-group col-md-4'>" +
                            "<label for='formGroupExampleInput'>New Name</label>" +
                            "<input type='text' class='form-control' id='formGroupExampleInput' placeholder='Example input'" +
                                "value='Task 1'>" +
                        "</div>" +
                        "<div class='form-group col-md-4'>" +
                            "<label for='formGroupExampleInput2'>Add Users</label>" +
                            "<select type='list' id='inputState' class='form-control'>" +
                            "</select></div>" +
                        "<div class='form-group col-md-4'>" +
                            "<label for='inputState'>Delete User</label>" +
                            "<select type='list' id='inputState' class='form-control'>" +
                                "<option>Elvan López</option>" +
                                "<option> Ignacio Gaxiola</option>" +
                                "<option> Manuel Castillo</option>" +
                            "</select>" +
                        "</div>" +
                    "</form>" +
                "</div>" +
            "</div>" +
            "<div class='collapse' id='collapseExample6'>" +
                "<div class='card card-title bg-secondary h4'>Are you sure you want to delete</div>" +
                "<div class='card-body bg-dark' style='text-align: right'>" +
                    "<button class='btn btn-outline-danger'>Cancel</button>" +
                    "<button class='btn btn-outline-success'>Yes</button>" +
                "</div>" +
            "</div>" +
            "<h5 id='modal-task-id' class='card-title'>Task " + taksId + "</h5>" +
            "<h6 class='text-danger font-weight-bold'>Deadline " + taskDeadLine + "</h6>" +
            "<h6 id='modal-task-description' class='card-subtitle mb-2 text-white'>" + taskDescription + "</h6>" +
            "<h6>Progress:</h6>" +
            "<div class='progress'>" +
                "<div class='progress-bar' role='progressbar' style='width: " + parseFloat(taskAccomplished)*100 + "%' " +
                "aria-valuenow='" + parseFloat(taskAccomplished)*100 + "' aria-valuemin='0'" +
                    "aria-valuemax='100'></div>" +
            "</div>" +
            "<label for='numberof-input'>% of progress</label>" +
            "<div class='row' style='margin:auto'>" +
                "<button class='btn btn-success pplus'><i class='fa fa-minus-circle' aria-hidden='true'></i></button>" +
                "<input type='text' value='" + parseFloat(taskAccomplished)*100 + "' id='total' class='field left form-control col-sm-1 text-dark' readonly=''" +
                    "style='margin:5px'>" +
                "<button class='btn btn-success pminus'><i class='fa fa-plus-circle' aria-hidden='true'></i></button>" +
            "</div>" +
            "<div class='card bg-dark text-white task' style='margin:5px'>" +
                "<div class='card-body'>" +
                    "<ul class='nav nav-tabs nav-pills card-title'>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' data-toggle='collapse' href='#multiCollapseExample1' role='button'" +
                                "aria-expanded='false' aria-controls='multiCollapseExample1'>Users</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' data-toggle='collapse' href='#multiCollapseExample2' role='button'" +
                                "aria-expanded='false' aria-controls='multiCollapseExample2'>Chat</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' data-toggle='collapse' href='#multiCollapseExample3' role='button'" +
                                "aria-expanded='false' aria-controls='multiCollapseExample3'>New Email</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' data-toggle='collapse' href='#multiCollapseExample4' role='button'" +
                                "aria-expanded='false' aria-controls='multiCollapseExample4'>Email History</a>" +
                        "</li>" +
                    "</ul>" +
                    "<!--  BODY USERS-->" +
                    "<div class='collapse' id='multiCollapseExample1'>" +
                        "<div class='card card-body bg-dark'>" +
                            "<h6>Users: </h6>" +
                            "<ul>" +
                                "<li>Nacho</li>" +
                                "<li>Manu</li>" +
                                "<li>Elvan</li>" +
                            "</ul>" +
                        "</div>" +
                    "</div>" +
                    "<div class='collapse' id='multiCollapseExample2'>" +
                        "<div class='card card-body bg-dark'>" +
                            "<div class='mesgs overflow-auto'>" +
                                "<div class='msg_history'>" +
                                    "<div class='incoming_msg'>" +
                                        "<div class='incoming_msg_img'> <img" +
                                                "src='https://dummyimage.com/250/4aaaa5/000000&text=IG' alt='sunil'> </div>" +
                                        "<div class='received_msg'>" +
                                            "<div class='received_withd_msg'>" +
                                                "<p>Test which is a new approach to have all" +
                                                    "solutions</p>" +
                                                "<span class='time_date'> 11:01 AM | June 9</span>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class='outgoing_msg'>" +
                                        "<div class='sent_msg'>" +
                                            "<p>Test which is a new approach to have all" +
                                                "solutions</p>" +
                                            "<span class='time_date'> 11:01 AM | June 9</span>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class='incoming_msg'>" +
                                        "<div class='incoming_msg_img'> <img" +
                                                "src='https://dummyimage.com/250/4aaaa5/000000&text=EG' alt='sunil'> </div>" +
                                        "<div class='received_msg'>" +
                                            "<div class='received_withd_msg'>" +
                                                "<p>Test, which is a new approach to have</p>" +
                                                "<span class='time_date'> 11:01 AM | Yesterday</span>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class='outgoing_msg'>" +
                                        "<div class='sent_msg'>" +
                                            "<p>Apollo University, Delhi, India Test</p>" +
                                            "<span class='time_date'> 11:01 AM | Today</span>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class='incoming_msg'>" +
                                        "<div class='incoming_msg_img'> <img" +
                                                "src='https://dummyimage.com/250/4aaaa5/000000&text=MC' alt='sunil'> </div>" +
                                        "<div class='received_msg'>" +
                                            "<div class='received_withd_msg'>" +
                                                "<p>We work directly with our designers and suppliers," +
                                                    "and sell direct to you, which means quality, exclusive" +
                                                    "products, at a price anyone can afford.</p>" +
                                                "<span class='time_date'> 11:01 AM | Today</span>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                            "<div class='type_msg'>" +
                                "<div class='input_msg_write'>" +
                                    "<input type='text' class='write_msg' placeholder='Type a message'>" +
                                    "<button class='msg_send_btn' type='button'><i class='fa fa-paper-plane-o'" +
                                            "aria-hidden='true'></i></button>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                    "<div class='collapse' id='multiCollapseExample3'>" +
                        "<div class='card card-body bg-dark'>" +
                            "<div class='container'>" +
                                "<form>" +
                                    "<div class='form-group'>" +
                                        "<label for='exampleFormControlInput1'>Email address</label>" +
                                        "<input type='email' class='form-control' id='exampleFormControlInput1'" +
                                            "placeholder='name@example.com'>" +
                                    "</div>" +
                                    "<div class='form-group'>" +
                                        "<label for='exampleFormControlInput1'>Subject</label>" +
                                        "<input type='text' class='form-control' id='exampleFormControlInput1'" +
                                            "placeholder='Subject'>" +
                                    "</div>" +
                                    "<div class='form-group'>" +
                                        "<label for='exampleFormControlTextarea1'>Example textarea</label>" +
                                        "<textarea type='text' class='form-control' id='exampleFormControlTextarea1'" +
                                            "rows='3'></textarea>" +
                                    "</div>" +
                                "</form>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                    "<div class='collapse' id='multiCollapseExample4'>" +
                        "<div class='card card-body bg-dark'>" +
                            "<div class='container'>" +
                                "<div class='list-group'>" +
                                    "<a href='#' class='list-group-item list-group-item-action'>" +
                                        "<div class='d-flex w-100 justify-content-between'>" +
                                            "<h5 class='mb-1'>List group item heading</h5>" +
                                            "<small>3 days ago</small>" +
                                        "</div>" +
                                        "<p class='mb-1'>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam" +
                                            "eget risus" +
                                            "varius blandit.</p>" +
                                        "<small>Donec id elit non mi porta.</small>" +
                                    "</a>" +
                                    "<a href='#' class='list-group-item list-group-item-action'>" +
                                        "<div class='d-flex w-100 justify-content-between'>" +
                                            "<h5 class='mb-1'>List group item heading</h5>" +
                                            "<small class='text-muted'>3 days ago</small>" +
                                        "</div>" +
                                        "<p class='mb-1'>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam" +
                                            "eget risus" +
                                            "varius blandit.</p>" +
                                        "<small class='text-muted'>Donec id elit non mi porta.</small>" +
                                    "</a>" +
                                    "<a href='#' class='list-group-item list-group-item-action'>" +
                                        "<div class='d-flex w-100 justify-content-between'>" +
                                            "<h5 class='mb-1'>List group item heading</h5>" +
                                            "<small class='text-muted'>3 days ago</small>" +
                                        "</div>" +
                                        "<p class='mb-1'>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam" +
                                            "eget risus" +
                                            "varius blandit.</p>" +
                                        "<small class='text-muted'>Donec id elit non mi porta.</small>" +
                                    "</a>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>" +
    "</div>" +
    " ";
    
    return taskHtml;
    
}

module.exports = taskModal;