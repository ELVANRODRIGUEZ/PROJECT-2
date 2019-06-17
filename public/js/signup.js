$(document).ready(function() {
  // Getting references to our form and input


  var signUpForm = $("form.signup");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");
  var nameInput = $("#name-input");
  var phoneInput= $("#phone-input");
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(phoneInput.val().trim().match(phoneno))
        {
          var userData = {
            userName: nameInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim(),
            phone: phoneInput.val().trim()
          };
      
          if (!userData.email || !userData.password || !userData.userName || !userData.phone) {
            $("#alert .msg").text("please complete all fields");
            $("#alert").fadeIn(100);
            
            return;
            
          }
          // If we have an email and password, run the signUpUser function
          signUpUser(userData.email, userData.password, userData.userName, userData.phone);
          
        }
      else
        {
          $("#alert .msg").text("Invalid phone number, use +12 123 123 1234");
          $("#alert").fadeIn(100);
        return false;
        }
    
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, userName, phone) {
    $.post("/api/signup", {
      userName: userName,
      email: email,
      password: password,
      phone: phone,
    }).then(function(data){
     console.log(data);
      if(data!=="/members"){
        if(data.parent.code=="ER_DUP_ENTRY"){ 
          $("#alert .msg").text("email already exists");
          $("#alert").fadeIn(100);
        }
               
      }else{
        nameInput.val("");
        emailInput.val("");
        passwordInput.val("");
        phoneInput.val("");
        window.location.replace(data);
      }
      
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
        
    }

  function handleLoginErr(err) {
    
     if(err.parent.code=="ER_DUP_ENTRY"){
        
          $("#alert .msg").text("email already exists");
      $("#alert").fadeIn(500);
        }
  }
});
