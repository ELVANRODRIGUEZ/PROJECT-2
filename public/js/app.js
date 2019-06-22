
$('.projectCard').on('click', function () {
    $('.card').removeClass('border border-primary');
    $(this).addClass('border border-primary');
})

$('.categoryCard').on('click', function () {
    $('.card').removeClass('border border-danger');
    $(this).addClass('border border-danger');
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
    $("#categoryModalAdd").modal({
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

$('.categoryCard').on('click', function () {
    $("#categoryModal").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
})

var usersArr = [];

$('#addUser').on('click', function () {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var $userList = $("#userList");
    var userId = $("#projectUsers option:selected").attr("userId");
    var userName = $("#projectUsers option:selected").val();

    var newUser =
        "<li class='projectUser' userId=" + userId + ">" + userName + "</li>";

    $userList.append(newUser);

    usersArr.push(userId);

})


///----------------Events with Ajax calls----------------///

///--------Get all users in Add Project Modal--------///
$("#projectAddButton").on("click", function (event) {

    // Empty the list for Project related users.
    $("#userList").html("");

    // Empty the list for Project related users.
    usersArr = [];

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

///--------New Project--------///
$("#projectModalAdd").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newProject = {
        other_users: JSON.stringify(usersArr),
        project_name: $("#projectName").val().trim(),
        description: $("#projectDesc").val()
    };

   
    // Send the POST request.
    $.ajax("/api/projects/add", {
        type: "PUT",
        data: newProject
    }).then(function (data) {

        // console.log(data);

        var project = data.description;
        var id = data.id;
        var $projectDiv = $("#projectDiv");
        var projectCard;

        // " +  + "

        projectCard =
            "<div class='card bg-dark text-white projectCard' " +
            "style=' margin:5px; min-width: 120px' " +
            "data-id='" + id + "'>" +
            "<div class='card-header'>Project #" + id +
            "</div> " +
            "<div class='card-body'> " +
            "<h6 class='card-title'> " +
            project +
            "</h6> " +
            "<p class='card-text'> " +
            "<small class='text-muted'> " +
            "Last updated 3 mins ago" +
            "</small> " +
            "</p> " +
            "</div> " +
            "</div>";

        $projectDiv.append(projectCard);

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
$("#categoryModalAdd").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newCategory = {
        category_name: $("#categoryName").val().trim(),
        description: $("#categoryDesc").val(),
    };


    // Send the POST request.
    $.ajax("/api/categories", {
        type: "POST",
        data: newCategory
    }).then(
        function () {
            location.reload();
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

// $.get("/members", function (data) {
//     console.log(data);
// })

// $.ajax("/members", {
//     type: "GET"
// }).then(function (data) {

//     console.log(data);

// })

//----------Add a task------------------//
// $("#addTask").on("submit", function (event) {
// 	// Make sure to preventDefault on a submit event.
// 	event.preventDefault();

// 	var newTask = {
// 		category_name: $("#categoryName").val().trim(),
//         description: $("#categoryDesc").val(),
//     };


// 	// Send the POST request.
// 	$.ajax("/api/categories", {
// 		type: "POST",
// 		data: newCategory
// 	}).then(
// 		function () {
// 			location.reload();
// 		}
// 	);
// });