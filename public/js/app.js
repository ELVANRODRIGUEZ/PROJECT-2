
var x = 0;

var userSelections = {
    project: "",
    category: "",
    description: ""                    
}

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

            userSelections.project = projectId;

            $.ajax({
                url: "/api/users-selections",
                method: "POST",
                data: {project: projectId}
            }).then(function (Selections) {

                // console.log(Selections);

            });

            // console.log(data);

            // console.log(data);

            Object.keys(data).forEach(function (item) {

                // console.log(item);


                var categoryInfo;
                var projectId = data[item].projects;

                $forProject.text(projectId);

                categoryInfo =
                    "<div class='card bg-secondary text-white categoryCard'" +
                    "style='margin:5px' data-id='" + data[item].category_id + "' >" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>" +
                    data[item].category_name + "</h5>" +
                    "<h6 class='card-subtitle mb-2 text-white'>" + data[item].category_description + "</h6>" +
                    "</div>" +
                    "</div>";

                $categoryDiv.append(categoryInfo);

            });

        })

})

$('.projectAdd').on('click', function () {
    $("#projectName").val("");
    $("#projectDesc").val("");
    $("#projectModal").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
})

$('.categoryAdd').on('click', function () {
    $("#categoryModal").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
})

$('.projectDel').on('click', function () {
    var all = $('.border-primary').map(function () {
        return this;
    }).get();

    var id = $(all[0]).data('id');
    $("#deleteProject").attr('data-id', id);
    if (typeof id == 'undefined') {
        alert('no item selected')
    } else {
        $("#deleteProjectModal").modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });
    }
})

$('.categoryDel').on('click', function () {
    var all = $('.border-danger').map(function () {
        return this;
    }).get();
    var id = $(all[0]).data('id');
    $("#deleteCategory").attr('data-id', id);
    if (typeof id == 'undefined') {
        alert('no item selected')
    } else {
        $("#deleteCategoryModal").modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });
    }

})

$(document).on('click', '.categoryCard', function () {
    
    // Collapse Add Task window.
    $("#addTaskCollapsWindow").collapse("hide");

    // Show Task Modal window.
    $("#taskModal").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('.card').removeClass('border border-danger');
    $(this).addClass('border border-danger');

    var all = $('.border-danger').map(function () {
        return this;
    }).get();

    var categoryId = $(all[0]).data('id').toString();
    // console.log(categoryId);

    // $('#forProject').text(id);
    $.ajax({
            url: "/members/info/category/" + categoryId,
            method: "GET"
        })
        .then(function (data) {

            userSelections.category = categoryId;

            $.ajax({
                url: "/api/users-selections",
                method: "POST",
                data: {category: categoryId}
            }).then(function (Selections) {

                // console.log(Selections);

            });

            // console.log(data.tasks);

            $("#modal-container").html(data.tasks);

        });

})

$(document).on('click', '#testbutton', function () {

    $.ajax({
            url: "/members/info/category/" + 6,
            method: "GET"
        })
        .then(function (data) {

            // console.log(data);
            $('body').replaceWith(data);
            // location.reload();

            // $.get("/memebers")

        });

})

var generalUsersArr = [];
var projectUsersArr = [];

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

$('#addTaskUser').on('click', function () {
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

    // console.log(projectUsersArr);

})


///----------------Events with Ajax calls----------------///

///--------Get all users in Add Project Modal--------///
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

///--------Get all users in Add Task Modal--------///
$(document).on("click","#addTaskModal", function (event) {

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
                ">" + item.user.user_name + "</option>";

        })

        $taskUsers.html(users);

    });

});

///--------New Project--------///
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

//---------Delete project------------------//
$("#deleteProject").on('click', function () {
    var id = $(this).data("id");
    console.log(id);
    // Send the DELETE request.
    $.ajax("/api/projects" + id, {
        type: "DELETE"
    }).then(
        function () {
            console.log("deleted ", id);
            // Reload the page to get the updated list
            location.reload();
        }
    );
});
//----------Add a category------------------//
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

        }
    );
});

//---------Delete category------------------//
$("#deleteCategory").on('click', function () {
    var id = $(this).data("id");
    console.log(id);
    // Send the DELETE request.
    $.ajax("/api/categories" + id, {
        type: "DELETE"
    }).then(
        function () {
            console.log("deleted ", id);
            // Reload the page to get the updated list
            location.reload();
        }
    );
});

// ----------Add a task------------------//
$(document).on("click", "#addTask",function (event) {
	// Make sure to preventDefault on a submit event.
	event.preventDefault();

    console.log(projectUsersArr);

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
		function (task) {
            console.log(task);
			// location.reload();
		}
	);
});