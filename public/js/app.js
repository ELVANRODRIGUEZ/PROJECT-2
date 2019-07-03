// ========================= Declare Global Variables

var x = 0;

var userSelections = {
    project: "",
    category: "",
    description: ""
}

var generalUsersArr = [];
var projectUsersArr = [];
var taskUsersToAdd = [];
var taskUsersToDel = [];

// ========================= Simple Button Events

// ----------------- Project

// ---------- Click on Project Add Button
$('.projectAdd').on('click', function () {
    $("#projectName").val("");
    $("#projectDesc").val("");
    $("#projectModal").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
})

// ---------- Click on Project Delete Button
$('.projectDel').on('click', function () {

    var all = $('.border-primary').map(function () {
        return this;
    }).get();

    var id = $(all[0]).data('id');

    $("#deleteProject").attr('data-id', id);

    if (typeof id == 'undefined') {

        $("#eraseProjModalTitle").text(
            "No Project was selected."
        );

        $("#deleteProject").css("visibility", "hidden");

        $("#deleteProjectModal").modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });

    } else {

        $("#eraseProjModalTitle").text(
            "This will erase all Tasks in Project " +
            id
        );

        $("#deleteProject").css("visibility", "visible");

        $("#deleteProjectModal").modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });

    }

})

// ---------- Click on Add User inside Project Add Modal
$('#addUser').on('click', function () {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var $userList = $("#userList");
    var userId = $("#projectUsers option:selected").attr("userId");
    var userName = $("#projectUsers option:selected").val();

    var newUser =
        "<li class='projectUser list-group-item text-dark col-md-8' userId=" + userId + ">" + userName + "</li>";

    $userList.append(newUser);

    generalUsersArr.push(userId);

    $('#delUser').on('click', function () {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        $('#userList').empty();

        generalUsersArr = [];

    })

})



// ----------------- Category

// ---------- Click on Category Add Button
$('#categoryAdd').on('click', function () {
    $("#categoryModal").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
})

// ---------- Click on Category Delete Button
$('#categoryDel').on('click', function () {

    var all = $('.border-danger').map(function () {
        return this;
    }).get();

    var id = $(all[0]).data('id');

    $("#deleteCategory").attr('data-id', id);

    if (typeof id == 'undefined') {

        $("#eraseCatModalTitle").text(
            "No Category was selected."
        );

        $("#deleteCategory").css("visibility", "hidden");

        $("#deleteCategoryModal").modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });

    } else {

        $("#eraseCatModalTitle").text(
            "This will erase all Tasks in Category " +
            id
        );

        $("#deleteCategory").css("visibility", "visible");

        $("#deleteCategoryModal").modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });

    }

})



// ----------------- Task

// ---------- Click on Add User inside New Task Modal
$(document).on('click', '#addTaskUser', function () {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var $taskUserList = $("#taskUserList");
    var userId = $("#taskUsers option:selected").attr("userId");
    var userName = $("#taskUsers option:selected").val();

    var newUser =
        "<li class='taskUser list-group-item text-dark col-md-8' userId=" + userId + ">" + userName + "</li>";

    $taskUserList.append(newUser);

    // console.log(userId);

    projectUsersArr.push(userId);

    $('#delTaskUser').on('click', function () {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        $('#taskUserList').empty();

        projectUsersArr = [];

    })

    // Test console.
    // console.log(projectUsersArr);

})

// ---------- Click on Add User for Adding inside Task Edit Modal
$(document).on('click', '.taskAddTskUserAdd', function () {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var taskForEdit = $(this).attr("task");

    var $taskUserList =
        $("#" + "task" + taskForEdit + "UserList");
    var userId =
        $("#" + "task" + taskForEdit +
            "Users option:selected").attr("userId");
    var userName =
        $("#" + "task" + taskForEdit +
            "Users option:selected").val();

    var newUser =
        "<li class='taskUser list-group-item text-dark col-md-8' userId=" + userId + ">" + userName + "</li>";

    $taskUserList.append(newUser);

    taskUsersToAdd.push(userId);

    $(document).on('click', '.taskAddTskUserDel', function () {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        if ($(this).attr("task") == taskForEdit) {

            $taskUserList.empty();

            taskUsersToAdd = [];
        };

    });

    // Test console.
    // console.log(taskUsersToAdd);

})

// ---------- Click on Add User for Deleting inside Task Add Modal
$(document).on('click', '.taskDelTskUserAdd', function () {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var taskForEdit = $(this).attr("task");

    var $taskUserList =
        $("#" + "task" + taskForEdit + "UserListDel");
    var userId =
        $("#" + "task" + taskForEdit +
            "UsersDel option:selected").attr("userId");
    var userName =
        $("#" + "task" + taskForEdit +
            "UsersDel option:selected").val();

    var newUser =
        "<li class='taskUser list-group-item text-dark col-md-8' userId=" + userId + ">" + userName + "</li>";

    $taskUserList.append(newUser);

    taskUsersToDel.push(userId);

    $(document).on('click', '.taskDelTskUserDel', function () {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        if ($(this).attr("task") == taskForEdit) {

            $taskUserList.empty();

            taskUsersToDel = [];
        };

    });

    // Test console.
    // console.log(taskUsersToDel);

})

// ---------- Click on Task Increase Accomplishment Button
$('.pminus').on('click', function () {
    x += 25;
    if (x > 100) {
        x = 100
    } else {
        $('.progress-bar').width(x + "%");
        $('#total').attr('value', x);
        $('.progress-bar').attr('aria-valuenow', x);
    }
})

// ---------- Click on Task Decrease Accomplishment Button
$('.pplus').on('click', function () {
    x -= 25;
    if (x < 0) {
        x = 0
    } else {
        $('.progress-bar').width(x + "%");
        $('.progress-bar').attr('aria-valuenow', x);
        $('#total').attr('value', x);
    }
})


// ========================= Ajax Calls Button Events

// ----------------- Project

// ---------- Click on Project Card
$(document).on('click', '.projectCard', function () {
    $('.card').removeClass('border border-primary');
    $(this).addClass('border border-primary');

    var all = $('.border-primary').map(function () {
        return this;
    }).get();

    var projectId = $(all[0]).data('id');
    var $categoryDiv = $("#categoryDiv");
    var $forProject = $("#forProject");

    $categoryDiv.empty();
    $forProject.empty();

    // $('#forProject').text(id);
    $.ajax({
            url: "/members/info/" + projectId,
            method: "GET"
        })
        .then(function (data) {

            // Test response:
            // console.log(data.categories);

            userSelections.project = projectId;

            // We use this call to keep track of the chosen Project in the server and not in the client. Nothing is done here with the response.
            $.ajax({
                url: "/api/users-selections",
                method: "POST",
                data: {
                    project: projectId
                }
            }).then(function (Selections) {

                // console.log(Selections);

            });

            $categoryDiv.html(data.categories);

        })

})

// ---------- Get all Users in Add Project Modal
$("#projectAddButton").on("click", function (event) {

    // Empty the list for general users.
    $("#userList").html("");

    // Empty the list array for general users.
    generalUsersArr = [];

    // Send the GET request.
    $.get("/api/all_users", function (data) {

        console.log(data);

        // var project = data.description;
        // var id = data.id;
        var $projectUsers = $("#projectUsers");
        var users = "<option selected>Select User</option>";

        // " +  + "

        data.forEach(function (item) {

            users += "<option class='usersArr' userId=" +
                item.id +
                ">" + item.user_name + "</option>";

        })

        $projectUsers.html(users);

    });

});

// ---------- Add Project
$("#projectModalAdd").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log(generalUsersArr);
    var newProject = {
        other_users: JSON.stringify(generalUsersArr),
        project_name: $("#projectName").val().trim(),
        description: $("#projectDesc").val()
    };


    // Send the POST request.
    $.ajax("/api/projects/add", {
        type: "POST",
        data: newProject
    }).then(function (data) {

        // console.log(data);

        var project = data.description;
        var name = data.project_name;
        var id = data.id;
        var $projectDiv = $("#projectDiv");
        var projectCard;

        // " +  + "

        projectCard =
            // Manuel CSS a las cards
            "<div class='card  bg-secondary projectCard col-md-5 overflow-auto' " +
            // "style=' margin:5px; min-width: 120px' " +
            "data-id='" + id + "'>" +
            "<div class='card-header'>P id: " + id +
            " -" + name +
            "</div> " +
            "<div class='card-body'> " +
            "<h6 class='card-title'> " +
            project +
            "</h6> " +
            "<p class='card-text'> " +
            "<small class='text-dark'> " +
            "Last updated 3 mins ago" +
            "</small> " +
            "</p> " +
            "</div> " +
            "</div>";

        $projectDiv.append(projectCard);

        location.reload();

    });

});

// ---------- Delete project
$("#deleteProject").on('click', function () {
    
    // Test console.
    console.log(userSelections.project);

    $.ajax({
        url: "/members/info/project/delete_all_tasks",
        type: "DELETE"
    }).then(
        function (data) {

            // Test console.
            console.log(data);

            if (data == "Reload Page") {

                location.reload();

            }

        });

});



// ----------------- Category

// ---------- Click on Category Card
$(document).on('click', '.categoryCard', function () {

    $('.card').removeClass('border border-danger');
    $(this).addClass('border border-danger');

    var all = $('.border-danger').map(function () {
        return this;
    }).get();

    userSelections.category =
        $(all[0]).data('id').toString();

    // Test console.
    // console.log(categoryId);

    // $('#forProject').text(id);
    $.ajax({
            url: "/members/info/" +
                userSelections.project +
                "/category/" +
                userSelections.category + "/all_tasks",
            method: "GET"
        })
        .then(function (data) {

            console.log(data);

        });

})

// ---------- Double Click on Category Card
$(document).on('dblclick', '.categoryCard', function () {

    // Collapse Add Task window.
    $("#addTaskCollapsWindow").collapse("hide");

    // Show Task Modal window.
    $("#taskModal").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    var all = $('.border-danger').map(function () {
        return this;
    }).get();

    var categoryId = $(all[0]).data('id').toString();

    // Test console.
    // console.log(categoryId);

    // $('#forProject').text(id);
    $.ajax({
            url: "/members/info/" +
                userSelections.project +
                "/category/" + categoryId,
            method: "GET"
        })
        .then(function (data) {

            userSelections.category = categoryId;

            $.ajax({
                url: "/api/users-selections",
                method: "POST",
                data: {
                    category: categoryId
                }
            }).then(function (Selections) {

                // console.log(Selections);

            });

            // console.log(data.tasks);

            $("#modal-container").html(data.tasks);

        });

})

// ---------- Add a category
$("#categoryModalAdd").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newCategory = {
        category_name: $("#categoryName").val().trim(),
        description: $("#categoryDesc").val(),
    };


    // Send the POST request.
    $.ajax("/api/category/add", {
        type: "POST",
        data: newCategory
    }).then(
        function (data) {

            // console.log(data);
            // location.reload();

            $("#categoryAddMessage").text(data);

            $("#categorySuccessModal").modal({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

            category_name: $("#categoryName").val("");
            description: $("#categoryDesc").val("");

            // Populate Categories div with newly created Category by making a nested Ajax call to retrieve the bulk of Categories.

            var $categoryDiv = $("#categoryDiv");

            // Test if there is a Project selected.

            if (userSelections.project != "") {

                var projectId = userSelections.project;

                $.ajax({
                        url: "/members/info/" + projectId,
                        method: "GET"
                    })
                    .then(function (data) {

                        // Test response:
                        // console.log(data.categories);

                        $categoryDiv.html(data.categories);

                    })

            }

        }
    );
});

// ---------- Delete category
$("#deleteCategory").on('click', function () {

    // Test console.
    console.log(userSelections.category);

    $.ajax({
        url: "/members/info/category/delete_all_tasks",
        type: "DELETE"
    }).then(
        function (data) {

            // Test console.
            console.log(data);

            if (data == "Reload Page") {

                location.reload();

            }

        });

});



// ----------------- Task

// ---------- Get all Users in Add Task Modal 
$(document).on("click", "#addTaskModal", function (event) {

    // Empty the list for Project related users.
    $("#taskUsers").html("");

    // Empty the list array for Project related users.
    projectUsersArr = [];

    // Send the GET request.
    $.get("/api/project_users", function (data) {

        // console.log(data);

        var $taskUsers = $("#taskUsers");
        var users = "<option selected>Select User</option>";

        // " +  + "

        data.forEach(function (item) {

            // console.log(item.user_id);
            // console.log(item.user.user_name);

            users += "<option class='taksUsersArr' userId=" +
                item.user_id +
                ">" + item["user.user_name"] + "</option>";

        })

        $taskUsers.html(users);

    });

});

// ---------- Add a New Task
$(document).on("click", "#addTask", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // console.log(projectUsersArr);

    var newTask = {
        description: $("#taskDesc").val(),
        deadline: $("#taskDeadline").val(),
        other_users: JSON.stringify(projectUsersArr)
    };

    // Send the POST request.
    $.ajax("/api/task/add", {
        type: "POST",
        data: newTask
    }).then(
        function (data) {

            // console.log(data.task);

            // Collapse Add Task window.
            $("#addTaskCollapsWindow").collapse("hide");

            // Empty values for Task creation.
            $("#taskDesc").val("");
            $("#taskDeadline").val("");
            $('#taskUserList').empty();
            projectUsersArr = [];

            // Prepend new Task.
            $("#modal-container").prepend(data.task);

        });

});

// ---------- Click on Edit Task button inside the Task Card
$(document).on("click", ".editTaskButton", function (event) {

    var taskSelected = $(this).attr("task");

    // Test console.
    // console.log(taskSelected);

    // Close all "editTask" collapse windows.

    // Select all "editTask" buttons which "task" attribute does not match the clicked one and set "aria-expanded" attribute to "false" and add the "collapsed" class.
    $(".editTaskButton[task != " + taskSelected + "]")
        .attr("aria-expanded", "false")
        .addClass("collapsed");

    // Select all "editTask" collapse window which "task" attribute does not match the clicked one and remove the "shwo" class to collapse it.
    $(".editTaskCollapse[task != " + taskSelected + "]")
        .removeClass("show");

    // Remove probable content in the "AddUsers" and "DeleteUsers" lists.
    $(".taskUsersAddList[task != " + taskSelected + "]")
        .html("");
    $(".taskUsersDelList[task != " + taskSelected + "]")
        .html("");

    // Remove probable content in the "AddUsers" and "DeleteUsers" arrays.
    taskUsersToAdd = [];
    taskUsersToDel = [];

    // Create selectors for Add and Delete Dropdown Lists.
    var $taskUsers =
        $("#" + "task" + taskSelected + "Users");
    var $taskUsersDel =
        $("#" + "task" + taskSelected + "UsersDel");

    // Empty Description and Deadline fields.
    $("#" + "editTask" + taskSelected + "Description").val("");
    $("#" + "editTask" + taskSelected + "Deadline").val("");

    // Empty the select list for Project related users.
    $("#" + "task" + taskSelected + "Users").html("");
    $("#" + "task" + taskSelected + "UsersDel").html("");

    // Empty the list array for Project related users.
    projectUsersArr = [];

    // Send the GET request.
    $.get("/api/project_users", function (data) {

        // console.log(data);

        // Create the HTML containers for the lists.
        var usersToAdd = "<option selected>Select User</option> ";
        var usersToDelete = "<option selected>Select User</option> ";

        $.ajax({
            url: "/api/users-selections",
            method: "POST",
            data: {
                task: taskSelected
            }
        }).then(function (Selections) {

            // Test console.
            // console.log(Selections);

            $.get("/api/project/task/users", function (users) {

                // Test console.
                // console.log(users.usersToAdd);
                // console.log(users.usersToDelete);

                // Add the data response to the HTML containers.
                usersToAdd += users.usersToAdd;
                usersToDelete += users.usersToDelete;

                // Add the complete HTML code to the Users lists.
                $taskUsers.html(usersToAdd);
                $taskUsersDel.html(usersToDelete);

            });

        });



    });

});

// ---------- Click on Accept Edition button inside the Task Card Edit Modal
$(document).on("click", ".acceptEdition", function (event) {

    // Test console.
    // console.log(taskUsersToAdd);
    // console.log(taskUsersToDel);

    var taskId = $(this).attr("task");

    var taskDescription =
        $("#" + "editTask" + taskId + "Description").val();
    var taskDeadline =
        $("#" + "editTask" + taskId + "Deadline").val();


    // Test data.
    // taskDescription = "Have trucks to extract excavation soil.";
    // taskDeadline = "2019-07-30";
    // -------------------
    // taskDescription = "Task decription changes test.";
    // taskDeadline = "2019-01-01";

    var taskEdit = {
        description: taskDescription,
        deadline: taskDeadline
    };

    // Send the PUT request.
    $.ajax("/api/project/task/" + taskId, {
        type: "PUT",
        data: taskEdit
    }).then(
        function (data) {

            // Test console.
            // console.log(data);

            if (taskUsersToAdd.length > 0) {

                var taskResp = [];

                taskUsersToAdd.forEach(function (item) {

                    taskResp.push({
                        task_id: taskId.toString(),
                        responsible: item.toString()
                    });

                });

                var sentData = JSON.stringify(taskResp)

                // Test console.
                // console.log(taskResp);

                // Send the POST request.
                $.ajax({
                    url: "/api/project/task/responsible/" + taskId,
                    type: "POST",
                    data: {
                        data: sentData
                    }
                }).then(
                    function (data) {

                        // Test console.
                        // console.log(data);


                    });

            }

            if (taskUsersToDel.length > 0) {

                // var taskRespDel = [];

                // taskUsersToDel.forEach(function (item) {

                //     taskRespDel.push(item);

                // });

                var sentData2 = JSON.stringify(taskUsersToDel)

                // Test console.
                // console.log(taskUsersToDel);

                // Send the DELETE request.
                $.ajax({
                    url: "/api/project/task/responsible/delete/" + taskId,
                    type: "DELETE",
                    data: {
                        data: sentData2
                    }
                }).then(
                    function (data) {

                        // Test console.
                        // console.log(data);

                        if (data == "Reload Page") {

                            location.reload();

                        }

                    });

            }


        });

});

// ---------- Click on Accept Taks Deletion
$(document).on("click", ".eraseOneTask", function (event) {

    var taskId = $(this).attr("task");

    $.ajax({
        url: "/api/task/" + taskId + "/delete_all",
        type: "DELETE"
    }).then(
        function (data) {

            // Test console.
            // console.log(data);

            if (data == "Reload Page") {

                location.reload();

            }

        });

});