// ========================= Declare Global Variables

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
