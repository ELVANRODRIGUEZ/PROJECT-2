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



// ========================= Ajax Calls Button Events


// ----------------- Project

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
