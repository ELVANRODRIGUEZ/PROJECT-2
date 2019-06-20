
$('.projectCard').on('click',function(){
  $('.card').removeClass('border border-primary');
  $(this).addClass('border border-primary');
})

$('.categoryCard').on('click',function(){
    $('.card').removeClass('border border-danger');
    $(this).addClass('border border-danger');
  })

$('.projectAdd').on('click',function(){
  $("#projectModal").modal({
                show: true,
                backdrop: 'static',
                keyboard: false
        });
})

$('.categoryAdd').on('click',function(){
  $("#categoryModalAdd").modal({
                show: true,
                backdrop: 'static',
                keyboard: false
        });
})

$('.projectDel').on('click',function(){
    var all = $('.border-primary').map(function() {
        return this;
    }).get();
    
    var id = $(all[0]).data('id');
    $("#deleteProject").attr('data-id',id);
    if(typeof id == 'undefined'){alert('no item selected')}
    else{
  $("#deleteProjectModal").modal({
                show: true,
                backdrop: 'static',
                keyboard: false
        });}
})

$('.categoryDel').on('click',function(){
    var all = $('.border-danger').map(function() {
        return this;
    }).get();
    var id = $(all[0]).data('id');
    $("#deleteCategory").attr('data-id',id);
    if(typeof id == 'undefined'){alert('no item selected')}
    else{
        $("#deleteCategoryModal").modal({
            show: true,
            backdrop: 'static',
            keyboard: false
    });
    }

})

$('.categoryCard').on('click',function(){
  $("#categoryModal").modal({
                show: true,
                backdrop: 'static',
                keyboard: false
        });
})



/*
///--------New Project--------///
	$("#projectModalAdd").on("submit", function (event) {
		// Make sure to preventDefault on a submit event.
		event.preventDefault();

		var newProject = {
			project_name: $("#projectName").val().trim(),
            description: $("#projectDesc").val(),
        };
        
		
		// Send the POST request.
		$.ajax("/api/projects", {
			type: "POST",
			data: newProject
		}).then(
			function () {
				location.reload();
			}
		);
	});

//---------Delete project------------------//
$("#deleteProject").on('click',function () {
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
$("#deleteCategory").on('click',function () {
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

//----------Add a task------------------//
	$("#addTask").on("submit", function (event) {
		// Make sure to preventDefault on a submit event.
		event.preventDefault();

		var newTask = {
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

*/