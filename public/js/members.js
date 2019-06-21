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

      Object.keys(data).forEach(function (item) {
        // console.log(data[item].projects);

        // ====================================== Elvan 

        var $projectDiv = $("#projectDiv");
        var $userNameBanner = $("#userNameBanner");

        var user = data[0].user;
        var projectCard;


        // " +  + "

        projectCard =
          "<div class='card bg-dark text-white projectCard' " +
          "style=' margin:5px; min-width: 120px' " +
          "data-id='" + data[item].projects_id + "'>" +
          "<div class='card-header'>Project #" + data[item].projects_id +
          "</div> " +
          "<div class='card-body'> " +
          "<h6 class='card-title'> " +
          data[item].projects +
          "</h6> " +
          "<p class='card-text'> " +
          "<small class='text-muted'> " +
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

      })

      // ====================================== Elvan 

      // ====================================== Manu 


      // ====================================== Manu 



      // ====================================== Nacho 


      // ====================================== Nacho 




    });

});