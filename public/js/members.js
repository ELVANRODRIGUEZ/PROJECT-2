$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/members").then(function (data) {
  //   console.log("From 'members.js': " + data);
  // });


  $.ajax({
      url: "/members/info",
      method: "GET"
    })
    .then(function (data) {

      // console.log(data);

      console.log(data);

      var project = "first";

      Object.keys(data).forEach(function (item) {
        // console.log(data[item].projects);

        if (project !== item.projects_id) {
          console.log(item);

          var $projectDiv = $("#projectDiv");
          var $userNameBanner = $("#userNameBanner");

          var user = data[0].user;
          var projectCard;

          projectCard =
            // Manuel CSS a las cards
            "<div class='card  bg-secondary projectCard col-md-5 overflow-auto' " +
            // "style=' margin:5px; min-width: 120px' " +
            "data-id='" + data[item].projects_id + "'>" +
            "<div class='card-header'>P id: " +
            data[item].projects_id +
            " - " + data[item].projects +
            "</div> " +
            "<div class='card-body'> " +
            "<h6 class='card-title'> " +
            data[item].project_description +
            "</h6> " +
            "<p class='card-text'> " +
            "<small class='text-dark'> " +
            "Last updated 3 mins ago" +
            "</small> " +
            "</p> " +
            "</div> " +
            "</div>";

          $userNameBanner.html(
            "<b>Team Organizer™</b>" +
            "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
            "Welcome: " + user);
          $projectDiv.append(projectCard);

        } else {

          project = item.projects_id;


        }

      });

      $('.projectCard').on('click', function () {
        $('.card').removeClass('border border-primary');
        $(this).addClass('border border-primary');

        var all = $('.border-primary').map(function () {
          return this;
        }).get();

        var categoryId = $(all[0]).data('id');

        // $('#forProject').text(id);
        $.ajax({
            url: "/members/info/" + categoryId,
            method: "GET"
          })
          .then(function (data) {

            console.log(data);

          });

      })

    });

});