// $(document).ready(function() {
//   // Getting references to our form and inputs
//   var loginForm = $("form.login");
//   var emailInput = $("input#email-input");
//   var passwordInput = $("input#password-input");

  // // When the form is submitted, we validate there's an email and password entered
  // loginForm.on("submit", function(event) {
  //   event.preventDefault();
  //   var userData = {
  //     email: emailInput.val().trim(),
  //     password: passwordInput.val().trim()
  //   };
    
    // if (!userData.email || !userData.password) {
    //   $("#alert .msg").text("Please complete all fields");
    //   $("#alert").fadeIn(100);
    //   setTimeout(function(){
    //     $("#alert").fadeOut(100);
    //   }, 3000);
    //   return false;
    // }
    
    // // console.log(`Email: ${userData.email} \nPassword: ${userData.password}`);
    // // If we have an email and password we run the loginUser function and clear the form
    // loginUser(userData.email, userData.password);
    // emailInput.val("");
    // passwordInput.val("");
    // // test();
  // });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  // function loginUser(email, password) {
  //   $.post("/api/login", {
  //     email: email,
  //     password: password
  //   }).then(function(data) {
      
  //     // Test console.
  //     // console.log(data);

  //     if (data = "Successful") {

  //       window.location = "/members";
  //     }
      
  //     // If there's an error, log the error
//     }).catch(function(err) {
//      console.log(err);
//       $("#alert .msg").text("Your Data is incorrect");
//       $("#alert").fadeIn(100);
//       setTimeout(function(){
//         $("#alert").fadeOut(100);
//       }, 3000);
      
//     });
//   }

// });