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

      console.log(data);

    });

});