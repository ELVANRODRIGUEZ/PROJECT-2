$(document).ready(function () {
  // Getting references to our form and input


  var signUpForm = $("form.signup");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");
  var nameInput = $("#name-input");
  var phoneInput = $("#phone-input");
  ValidatePassword();
  // When the signup button is clicked, we validate the email and password are not blank

  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var phoneMask = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var emailMask = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var userData = {
      userName: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      phone: phoneInput.val().trim()
    };
    if (!userData.email || !userData.password || !userData.userName || !userData.phone) {

      $("#alert .msg").text("Please complete all fields");
      $("#alert").fadeIn(100);
      setTimeout(function () {
        $("#alert").fadeOut(100);
      }, 3000);
      return false;

    } else if (!userData.phone.match(phoneMask)) {

      $("#alert .msg").text("Invalid phone number, use +12 123 123 1234");
      $("#alert").fadeIn(100);
      setTimeout(function () {
        $("#alert").fadeOut(100);
      }, 3000);
      return false;

    } else if (!userData.email.match(emailMask)) {

      $("#alert .msg").text("Invalid email address");
      $("#alert").fadeIn(100);
      setTimeout(function () {
        $("#alert").fadeOut(100);
      }, 3000);
      return false;

    }

    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.userName, userData.phone);


  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, userName, phone) {
    $.post("/api/signup", {
      userName: userName,
      email: email,
      password: password,
      phone: phone,
    }).then(function (data) {

      // console.log(data.errors[0].message);
      //console.log(data);
      if (data !== "/members") {
        if (data.errors[0].message == "email must be unique") {
          $("#alert .msg").text("email already exists");
          $("#alert").fadeIn(100);
          setTimeout(function () {
            $("#alert").fadeOut(100);
          }, 3000);
        } else if (data.errors[0].message == "Validation len on user_name failed") {
          $("#alert .msg").text("The Name is too short");
          $("#alert").fadeIn(100);
          setTimeout(function () {
            $("#alert").fadeOut(100);
          }, 3000);
        }

      } else {
        nameInput.val("");
        emailInput.val("");
        passwordInput.val("");
        phoneInput.val("");
        window.location.replace(data);
      }

      // If there's an error, handle it by throwing up a bootstrap alert
    })
    // .catch(handleLoginErr);

  }

  // function handleLoginErr(err) {

  //   //if (err.parent.code == "ER_DUP_ENTRY") {

  //     $("#alert .msg").text("email already exists");
  //     $("#alert").fadeIn(500);
  //   //}
  // }
});



function ValidatePassword() {
  var length;
  var letter;
  var capital;
  var digit;
  $(document).ready(function () {

    $('input[type=password]').keyup(function () {
      // keyup code here
      if (letter == true && length == true && capital == true && digit == true) {
        $('#pswd_info').hide();

      }


      var pswd = $(this).val();

      // console.log(letter);
      // console.log(capital);
      // console.log(digit);
      // console.log(length);
      if (letter == true && length == true && capital == true && digit == true) {
        $('#pswd_info').hide();

      }

      //validate the length
      if (pswd.length <= 7) {
        $('#length').removeClass('valid').addClass('invalid');
        length = false;
      } else {
        $('#length').removeClass('invalid').addClass('valid');
        length = true;
      }
      //validate letter
      if (pswd.match(/[A-z]/)) {
        $('#letter').removeClass('invalid').addClass('valid');
        letter = true;
      } else {
        $('#letter').removeClass('valid').addClass('invalid');
        letter = false;
      }

      //validate capital letter
      if (pswd.match(/[A-Z]/)) {
        $('#capital').removeClass('invalid').addClass('valid');
        capital = true;
      } else {
        $('#capital').removeClass('valid').addClass('invalid');
        capital = false;
      }

      //validate number
      if (pswd.match(/\d/)) {
        $('#number').removeClass('invalid').addClass('valid');
        digit = true;
      } else {
        $('#number').removeClass('valid').addClass('invalid');
        digit = false;
      }

    }).focus(function () {

      $('#pswd_info').show();
    }).blur(function () {
      $('#pswd_info').hide();
    });


  });

}